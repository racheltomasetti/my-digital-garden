import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ModalProvider } from "./contexts/ModalContext";
import { perpetua, merriweather, poppins, bebasNeue } from "./fonts";

export const metadata: Metadata = {
  title: "Rachel Tomasetti",
  description: "ray builds ki",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const manualOverride = localStorage.getItem('themeManualOverride');
                const savedTheme = localStorage.getItem('theme');
                const theme = (manualOverride === 'true' && savedTheme)
                  ? savedTheme
                  : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${perpetua.className} ${merriweather.variable} ${poppins.variable} ${bebasNeue.variable} antialiased`}>
        <ThemeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
