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
      systemInstruction: "Você é Solara, a gestora inteligente do sistema Odonto Connect. Ajude a clínica de forma profissional e eficiente."
    });

    const prompt = ragContext ? `BASE:\n${ragContext}\n\nPERGUNTA:\n${message}` : message;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Erro Gemini:", error);
    return "Tive uma breve instabilidade neural, mas já estou aqui. Como posso ajudar?";
  }
};
