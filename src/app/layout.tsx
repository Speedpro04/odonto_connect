import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assistente Solara | Gestão Inteligente para Clínicas",
  description: "IA especializada em recuperação de pacientes e gestão de clínicas odontológicas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
