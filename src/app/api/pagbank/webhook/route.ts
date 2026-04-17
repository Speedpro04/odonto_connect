import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, charges } = body;

    if (!charges || charges.length === 0) {
      return NextResponse.json({ received: true });
    }

    const charge = charges[0];
    const chargeStatus = charge.status;

    // Mapear status do PagBank para nosso status
    let newStatus: string;
    switch (chargeStatus) {
      case 'PAID':
        newStatus = 'active';
        break;
      case 'DECLINED':
      case 'CANCELED':
        newStatus = 'cancelled';
        break;
      case 'WAITING':
      case 'IN_ANALYSIS':
        newStatus = 'pending';
        break;
      default:
        newStatus = 'pending';
    }

    // Atualizar a assinatura no banco
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: newStatus,
        pagbank_charge_id: charge.id,
        started_at: newStatus === 'active' ? new Date().toISOString() : undefined,
        expires_at: newStatus === 'active'
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
      })
      .eq('pagbank_charge_id', id);

    if (error) {
      console.error('Webhook update error:', error);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
