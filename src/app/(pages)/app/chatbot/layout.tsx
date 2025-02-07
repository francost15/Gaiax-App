import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ExpertAI",
  description: "Chatbot de Gaiax.",
};

export default function Chatbot({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
