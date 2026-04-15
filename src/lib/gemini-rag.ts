import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from './supabase';

// Instância do Gemini
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Função de mapeamento e recuperação vetorial baseada no Banco de Dados (Supabase)
 * Recupera os contextos que dão match com as palavras-chave do paciente.
 */
export const retrieveContextFromDB = async (message: string) => {
  const normalizedMessage = message.toLowerCase();
  
  // No mundo real buscaríamos via Embeddings (pgvector),
  // Aqui pegamos o dicionário da tabela que recém populamos para encontrar a palavra exata.
  const { data, error } = await supabase
    .from('rag_knowledge_base')
    .select('*');

  if (error || !data) {
    console.error("Erro ao buscar Knowledge Base no Supabase", error);
    return "";
  }

  const matchedTopics = data.filter(entry => 
    entry.keywords.some((kw: string) => normalizedMessage.includes(kw.toLowerCase()))
  );

  if (matchedTopics.length === 0) {
    return "O paciente não usou termos técnicos odontológicos claros. Continue com um atendimento cordial e tente descobrir a necessidade exata.";
  }

  // Verifica se há alguma urgência na busca (priority_level == 3)
  const isUrgent = matchedTopics.some(t => t.priority_level === 3);

  const ragText = matchedTopics.map(t => 
    `[TÓPICO: ${t.topic}]\nDIRETRIZ DA CLÍNICA: ${t.context}`
  ).join("\n\n");

  return { ragText, isUrgent };
};

/**
 * Motor LLM + RAG para uso pelo Odonto Connect utilizando persistência real.
 */
export const askSolaraOdontoWithRAG = async (message: string) => {
  if (!genAI) {
    console.warn("Sem chave do Gemini. RAG indisponível.");
    return "A IA Solara está aguardando ativação de credenciais (API Key).";
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: `
Você é Solara, a IA Gestora e Consultora Clínica do sistema Odonto Connect.
Seu papel não é apenas responder, mas fechar agendamentos e maximizar a lucratividade via Cross-sell/Upsell de forma ética.
Sempre demonstre autoridade técnica. Baseie-se ESTRITAMENTE na Base de Conhecimento RAG extraída do Database.`
    });

    // Pega o dado direto do PostegreSQL da Clínica MHP 
    const dbResult = await retrieveContextFromDB(message);
    const ragContext = typeof dbResult === 'string' ? dbResult : dbResult.ragText;
    const urgencyFlag = (typeof dbResult !== 'string' && dbResult.isUrgent) ? 
      "\n!!! ALERTA DO BANCO DE DADOS: Grau de urgência 3 (Dor Aguda ou Perda Iminente). Direcionar para agendamento SOS !!!" : "";

    const prompt = `
=== DADOS EXTRAÍDOS DO SUPABASE DATABASE (RAG) ===
${ragContext}
==================================================

MENSAGEM DO PACIENTE / LEAD:
"${message}"
${urgencyFlag}

INSTRUÇÃO: Analise o caso e formule a resposta ideal que a recepcionista deve enviar. Não responda mecanicamente, mas seja prático e voltado à conversão.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Falha no Motor RAG", error);
    return "Houve uma instabilidade na conexão neural com nossos datacenters (Supabase / Gemini). Tente novamente.";
  }
};
