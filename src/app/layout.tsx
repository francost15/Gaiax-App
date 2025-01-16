import type { Metadata } from "next";
import "./globals.css";
import { Provider, ThemeProvider } from "@/providers";



export const metadata: Metadata = {
  title: {
    template: "%s - Gaiax | Learning Platform",
    default: "Home - Gaiax | Learning Platform",
  },
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
            <Provider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          {children}
          </ThemeProvider>
            </Provider>
      </body>
    </html>
  );
}
