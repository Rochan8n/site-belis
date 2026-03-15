import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato - Belis Agency",
  description: "Vamos construir o seu império digital. Aplique para ser um cliente Belis Agency.",
};

export default function ContatoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
