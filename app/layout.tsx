import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/data/content";
import "./globals.css";

const body = Hanken_Grotesk({ variable: "--font-body", subsets: ["latin"] });
const display = Schibsted_Grotesk({ variable: "--font-display-face", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--font-mono-face", subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

// Runs before the page paints so night mode never flashes white.
const themeScript = `
try {
  var t = localStorage.getItem('theme');
  if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = t;
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${body.variable} ${display.variable} ${mono.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans text-[17px] leading-relaxed">{children}</body>
    </html>
  );
}
