import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// =============================================
// PROMPT MASTER DA SOLARA - ATENDIMENTO SPIN
// =============================================
function buildSolaraPrompt(leadInfo: {
  isNewLead: boolean;
  nome: string | null;
  temperatura: string;
  ultimaConsulta: string | null;
  clinicName: string;
  captureStep?: string;
}) {
  const { isNewLead, nome, temperatura, ultimaConsulta, clinicName, captureStep } = leadInfo;

  // --- FLUXO DE CAPTAÇÃO (lead novo sem cadastro) ---
  if (isNewLead && captureStep === 'ask_name') {
    return `Você é a Solara, assistente virtual inteligente da clínica "${clinicName}".

SITUAÇÃO ATUAL: Um novo contato acabou de enviar uma mensagem. Ele NÃO possui cadastro no sistema.

SUA ÚNICA MISSÃO AGORA: Captar o nome completo desta pessoa de forma natural e acolhedora.

REGRAS:
- Cumprimente de forma calorosa e profissional
- Diga que é a assistente virtual da ${clinicName}
- Peça o nome completo da pessoa para poder ajudá-la melhor
- NÃO tente agendar consulta ainda
- NÃO fale sobre preços
- NÃO faça perguntas além do nome
- Seja BREVE (máximo 3 frases)
- Responda APENAS em português do Brasil

Exemplo de resposta ideal:
"Olá! 😊 Seja bem-vindo(a) à ${clinicName}! Sou a Solara, sua assistente virtual. Para que eu possa te ajudar da melhor forma, pode me dizer seu nome completo?"`;
  }

  // --- FLUXO DE CAPTAÇÃO (esperando o nome) ---
  if (isNewLead && captureStep === 'waiting_name') {
    return `Você é a Solara, assistente virtual da clínica "${clinicName}".

SITUAÇÃO: O contato respondeu sua pergunta sobre o nome. Analise a mensagem dele e:
1. Se a resposta contiver um nome (ex: "João", "Maria Silva", "sou o Carlos"), EXTRAIA o nome e confirme
2. Se NÃO for um nome (ex: "quero marcar consulta", "oi", "quanto custa"), peça novamente o nome educadamente

REGRAS:
- Se identificou o nome, agradeça e pergunte como pode ajudar
- Seja BREVE (máximo 3 frases)
- NÃO fale sobre preços NUNCA
- Responda APENAS em português do Brasil

IMPORTANTE: Se você identificar o nome na mensagem, comece sua resposta com [NOME_CAPTADO:NomeAqui] seguido da sua mensagem normal.
Exemplo: [NOME_CAPTADO:João Silva] Prazer, João! 😊 Como posso te ajudar hoje?`;
  }

  // --- FLUXO NORMAL (lead já cadastrado) ---
  const saudacao = nome ? `Chame o paciente pelo primeiro nome: "${nome.split(' ')[0]}"` : 'O paciente não informou o nome ainda.';
  
  let contextoTemperatura = '';
  switch (temperatura) {
    case 'novo':
      contextoTemperatura = 'Este é um lead NOVO. Seja acolhedor e descubra o que ele precisa.';
      break;
    case 'morno':
      contextoTemperatura = 'Lead MORNO (60-90 dias sem consulta). Aborde com cuidado preventivo.';
      break;
    case 'frio':
      contextoTemperatura = 'Lead FRIO (90-180 dias). Use urgência leve, sugira check-up.';
      break;
    case 'perdido':
      contextoTemperatura = 'Lead PERDIDO (180+ dias). Reativação com oferta de avaliação.';
      break;
    case 'convertido':
      contextoTemperatura = 'Paciente ATIVO. Atenda normalmente com excelência.';
      break;
  }

  const ultimaConsultaInfo = ultimaConsulta 
    ? `Última consulta: ${ultimaConsulta}` 
    : 'Sem registro de consulta anterior.';

  return `Você é a SOLARA, assistente virtual inteligente da clínica odontológica "${clinicName}".

═══════════════════════════════════════
DADOS DO PACIENTE (DO BANCO DE DADOS):
═══════════════════════════════════════
- Nome: ${nome || 'Não informado'}
- Temperatura: ${temperatura}
- ${ultimaConsultaInfo}
- ${saudacao}

═══════════════════════════════════════
CONTEXTO DE ABORDAGEM:
═══════════════════════════════════════
${contextoTemperatura}

═══════════════════════════════════════
MÉTODO SPIN (Siga nesta ordem):
═══════════════════════════════════════
1. SITUAÇÃO — Entenda o contexto: "Faz quanto tempo desde sua última consulta?"
2. PROBLEMA — Identifique a dor: "Está sentindo algum desconforto?"
3. IMPLICAÇÃO — Aprofunde: "Isso tem impactado sua alimentação?"
4. NECESSIDADE — Crie desejo: "Quer agendar uma avaliação?"

═══════════════════════════════════════
REGRAS ABSOLUTAS (NUNCA QUEBRE):
═══════════════════════════════════════
❌ NUNCA revele preços ou valores
❌ NUNCA faça promessas de tratamento
❌ NUNCA emita diagnósticos
❌ NUNCA fale sobre concorrentes
❌ NUNCA saia do escopo odontológico
❌ NUNCA responda perguntas sobre política, religião ou temas não relacionados

✅ SEMPRE redirecione preço para: "Após avaliação com o especialista, você terá um plano personalizado"
✅ SEMPRE seja educada, profissional e empática
✅ SEMPRE use emojis moderadamente (1-2 por mensagem)
✅ SEMPRE responda em português do Brasil
✅ SEMPRE seja BREVE (máximo 4 frases por resposta)
✅ SEMPRE trate o paciente pelo primeiro nome quando disponível`;
}

// =============================================
// WEBHOOK - RECEBE MENSAGENS DA EVOLUTION API
// =============================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Evolution API envia diferentes tipos de evento
    const event = body.event;
    if (event !== 'messages.upsert') {
      return NextResponse.json({ received: true });
    }

    const messageData = body.data;
    if (!messageData || messageData.key?.fromMe) {
      return NextResponse.json({ received: true }); // Ignora msgs enviadas por nós
    }

    const instanceName = body.instance;
    const phone = messageData.key?.remoteJid?.replace('@s.whatsapp.net', '') || '';
    const incomingMessage = messageData.message?.conversation 
      || messageData.message?.extendedTextMessage?.text 
      || '';

    if (!phone || !incomingMessage) {
      return NextResponse.json({ received: true });
    }

    // 1. Identificar a clínica pelo nome da instância Evolution
    const { data: clinic } = await supabase
      .from('clinics')
      .select('id, nome_clinica')
      .eq('evolution_instance_name', instanceName)
      .single();

    if (!clinic) {
      console.error(`[Solara] Clínica não encontrada para instância: ${instanceName}`);
      return NextResponse.json({ error: 'Clínica não encontrada' }, { status: 404 });
    }

    // 2. Buscar o lead/paciente pelo telefone NESTA clínica
    const { data: patient } = await supabase
      .from('patients')
      .select('id, nome_completo, temperatura_lead, ultima_consulta')
      .eq('clinic_id', clinic.id)
      .eq('telefone', phone)
      .single();

    // 3. Buscar histórico de conversa recente (últimas 10 mensagens)
    const { data: history } = await supabase
      .from('ai_conversations')
      .select('role, content, etapa_spin')
      .eq('clinic_id', clinic.id)
      .eq('telefone_remetente', phone)
      .order('created_at', { ascending: false })
      .limit(10);

    const conversationHistory = (history || []).reverse();

    // 4. Determinar o fluxo correto
    let isNewLead = !patient;
    let captureStep: string | undefined;

    if (isNewLead) {
      // Verificar se já estávamos no fluxo de captação
      const lastAssistantMsg = conversationHistory.find(m => m.role === 'assistant');
      if (!lastAssistantMsg) {
        captureStep = 'ask_name'; // Primeira interação
      } else {
        captureStep = 'waiting_name'; // Já perguntamos o nome, esperando resposta
      }
    }

    // 5. Montar o prompt da Solara
    const prompt = buildSolaraPrompt({
      isNewLead,
      nome: patient?.nome_completo || null,
      temperatura: patient?.temperatura_lead || 'novo',
      ultimaConsulta: patient?.ultima_consulta || null,
      clinicName: clinic.nome_clinica,
      captureStep,
    });

    // 6. Montar contexto de conversa para o Gemini
    let fullPrompt = prompt + '\n\n';
    fullPrompt += '═══════════════════════════════════════\n';
    fullPrompt += 'HISTÓRICO DA CONVERSA:\n';
    fullPrompt += '═══════════════════════════════════════\n';

    for (const msg of conversationHistory) {
      if (msg.role === 'user') {
        fullPrompt += `PACIENTE: ${msg.content}\n`;
      } else {
        fullPrompt += `SOLARA: ${msg.content}\n`;
      }
    }

    fullPrompt += `\nPACIENTE (AGORA): ${incomingMessage}\n\n`;
    fullPrompt += 'SOLARA (responda agora):';

    // 7. Chamar Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(fullPrompt);
    let aiResponse = result.response.text();

    // 8. Se estávamos captando o nome, verificar se captou
    if (isNewLead && captureStep === 'waiting_name') {
      const nameMatch = aiResponse.match(/\[NOME_CAPTADO:(.+?)\]/);
      if (nameMatch) {
        const capturedName = nameMatch[1].trim();
        aiResponse = aiResponse.replace(/\[NOME_CAPTADO:.+?\]\s*/, ''); // Remove a tag

        // Criar o paciente no banco
        await supabase.from('patients').insert({
          clinic_id: clinic.id,
          nome_completo: capturedName,
          telefone: phone,
          temperatura_lead: 'novo',
          origem: 'whatsapp',
        });
      }
    } else if (isNewLead && captureStep === 'ask_name') {
      // Primeira interação — ainda não temos o paciente, mas salvar o telefone como referência
      // O paciente será criado quando captarmos o nome
    }

    // 9. Salvar mensagem do paciente no histórico
    await supabase.from('ai_conversations').insert({
      clinic_id: clinic.id,
      patient_id: patient?.id || null,
      telefone_remetente: phone,
      role: 'user',
      content: incomingMessage,
    });

    // 10. Salvar resposta da Solara no histórico
    await supabase.from('ai_conversations').insert({
      clinic_id: clinic.id,
      patient_id: patient?.id || null,
      telefone_remetente: phone,
      role: 'assistant',
      content: aiResponse,
    });

    // 11. Enviar resposta via Evolution API
    const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || '';
    const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || '';

    await fetch(`${EVOLUTION_API_URL}/message/sendText/${instanceName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY,
      },
      body: JSON.stringify({
        number: phone,
        options: {
          delay: 1200,
          presence: 'composing',
        },
        textMessage: {
          text: aiResponse,
        },
      }),
    });

    return NextResponse.json({ success: true, response: aiResponse });
  } catch (error) {
    console.error('[Solara Webhook] Erro:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
