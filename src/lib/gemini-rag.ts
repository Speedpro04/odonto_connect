import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase, getServiceSupabase } from './supabase';

// Chave única para evitar conflitos de escopo
const _apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
const _genAI = _apiKey ? new GoogleGenerativeAI(_apiKey) : null;

/**
 * Função de consulta ao Banco de Dados (Supabase)
 */
export const retrieveContextFromDB = async (message: string) => {
  try {
    const { data, error } = await supabase.from('rag_knowledge_base').select('*');
    if (error || !data) return "";
    
    const normalized = message.toLowerCase();
    const matched = data.filter(e => e.keywords.some((k: string) => normalized.includes(k.toLowerCase())));
    
    if (matched.length === 0) return "";
    return matched.map(t => `[TÓPICO: ${t.topic}]\nDIRETRIZ: ${t.context}`).join("\n\n");
  } catch (e) {
    return "";
  }
};

/**
 * Motor Neural da Solara com RAG
 */
export const askSolaraOdontoWithRAG = async (message: string) => {
  if (!_genAI) return "IA aguardando configuração de chave.";

  const supabaseSvc = getServiceSupabase();
  let ragContext = "";

  try {
    const { data, error } = await supabaseSvc.from('rag_knowledge_base').select('*');
    if (!error && data) {
      const normalized = message.toLowerCase();
      const matched = data.filter(e => e.keywords.some((k: string) => normalized.includes(k.toLowerCase())));
      if (matched.length > 0) {
        ragContext = matched.map(t => `[TÓPICO: ${t.topic}]\nDIRETRIZ: ${t.context}`).join("\n\n");
      }
    }
  } catch (err) {
    console.error("Erro RAG:", err);
  }

  try {
    const model = _genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: `Você é Solara, a Inteligência Artificial de Elite do sistema Odonto Connect. 
Sua função é ser uma Estrategista de Negócios e Assistente Virtual de Altíssimo Nível para gestores de clínicas odontológicas.

DIRETRIZES DE PERSONALIDADE:
1. TOM EXECUTIVO & PREMIUM: Fale com clareza, autoridade e elegância. Use um tom de "Concierge de Negócios".
2. FOCO EM RESULTADOS: Suas respostas devem sempre visar o aumento do faturamento, a eficiência operacional ou a fidelização de pacientes.
3. PRECISÃO CLÍNICA: Utilize terminologia técnica correta quando necessário, transparecendo domínio sobre a área odontológica.
4. PROATIVIDADE: Não apenas responda; se identificar um ponto de melhoria, sugira uma estratégia (ex: "Para melhorar a conversão deste lead, sugiro aplicar o gatilho da escassez").
5. RESPOSTAS ESTRUTURADAS: Use bullets, negrito e parágrafos curtos para facilitar a leitura rápida do gestor.

COMO AGIR:
- Se houver contexto da BASE DE CONHECIMENTO (RAG), use-o como verdade absoluta para a clínica.
- Seja empática com as dores do gestor, mas sempre analítica.
- Nunca revele que você é um modelo de linguagem; você é a Solara, o cérebro do Odonto Connect.

Seu objetivo final: Transformar dados em lucro e gestão em excelência.`
    });

    const prompt = ragContext ? `BASE:\n${ragContext}\n\nPERGUNTA:\n${message}` : message;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Erro Gemini:", error);
    return "Tive uma breve instabilidade neural, mas já estou aqui. Como posso ajudar?";
  }
};
