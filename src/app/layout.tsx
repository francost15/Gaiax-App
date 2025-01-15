import type { Metadata } from "next";
import "./globals.css";
import { Provider, ThemeProvider } from "@/providers";



export const metadata: Metadata = {
  title: "Gaiax",
  description: "Plataforma de aprendizaje adaptativo basada en IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            <Provider>
          {children}
            </Provider>
          </ThemeProvider>
      </body>
    </html>
  );
}
