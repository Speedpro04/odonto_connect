import { NextResponse } from "next/server";
import { askSolaraOdontoWithRAG } from "@/lib/gemini-rag";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ response: "O que você deseja saber?" }, { status: 400 });
    }

    // Utilize o motor RAG já implementado para dar inteligência real baseada no banco de dados
    const text = await askSolaraOdontoWithRAG(message);

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ response: "Desculpe, tive um problema ao processar sua solicitação neural." }, { status: 500 });
  }
}
