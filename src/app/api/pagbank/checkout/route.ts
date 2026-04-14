import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PAGBANK_TOKEN = process.env.PAGBANK_TOKEN!;
const PAGBANK_API_URL = 'https://api.pagseguro.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan_slug, clinic_name, email, phone } = body;

    // 1. Buscar o plano no banco
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('slug', plan_slug)
      .eq('ativo', true)
      .single();

    if (planError || !plan) {
      return NextResponse.json(
        { error: 'Plano não encontrado.' },
        { status: 404 }
      );
    }

    // 2. Criar checkout no PagBank
    const pagbankPayload = {
      reference_id: `solara-${Date.now()}`,
      customer: {
        name: clinic_name,
        email: email,
        tax_id: '', // CPF/CNPJ - será preenchido pelo checkout
        phones: [
          {
            country: '55',
            area: phone.substring(0, 2),
            number: phone.substring(2),
            type: 'MOBILE',
          },
        ],
      },
      items: [
        {
          reference_id: plan.slug,
          name: `Solara Odonto - ${plan.nome}`,
          quantity: 1,
          unit_amount: plan.preco_centavos,
        },
      ],
      notification_urls: [
        `${process.env.NEXT_PUBLIC_APP_URL}/api/pagbank/webhook`,
      ],
      redirect_urls: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/login?payment=success`,
      },
    };

    // 3. Criar ordem no PagBank
    const pagbankResponse = await fetch(`${PAGBANK_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAGBANK_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(pagbankPayload),
    });

    const pagbankData = await pagbankResponse.json();

    if (!pagbankResponse.ok) {
      console.error('PagBank Error:', pagbankData);
      return NextResponse.json(
        { error: 'Erro ao criar pagamento no PagBank.', details: pagbankData },
        { status: 500 }
      );
    }

    // 4. Criar a clínica no Supabase
    const { data: clinic, error: clinicError } = await supabase
      .from('clinics')
      .insert({
        nome_clinica: clinic_name,
      })
      .select()
      .single();

    if (clinicError) {
      console.error('Supabase Clinic Error:', clinicError);
      return NextResponse.json(
        { error: 'Erro ao criar clínica.' },
        { status: 500 }
      );
    }

    // 5. Criar a assinatura (pendente até confirmação do PagBank)
    const { error: subError } = await supabase
      .from('subscriptions')
      .insert({
        clinic_id: clinic.id,
        plan_id: plan.id,
        status: 'pending',
        pagbank_charge_id: pagbankData.id,
      });

    if (subError) {
      console.error('Supabase Subscription Error:', subError);
    }

    // 6. Retornar dados para redirecionar o cliente
    return NextResponse.json({
      success: true,
      clinic_id: clinic.id,
      plan: plan.nome,
      max_especialistas: plan.max_especialistas,
      pagbank_order_id: pagbankData.id,
      payment_url: pagbankData.links?.find(
        (l: { rel: string }) => l.rel === 'PAY'
      )?.href,
    });
  } catch (error) {
    console.error('Checkout Error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
