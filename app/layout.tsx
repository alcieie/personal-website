import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { site } from "@/data/content";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display-face", subsets: ["latin"] });
const body = Plus_Jakarta_Sans({ variable: "--font-body", subsets: ["latin"] });
const hand = Caveat({ variable: "--font-hand-face", subsets: ["latin"], weight: "500" });

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${hand.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans text-[17px] leading-relaxed">{children}</body>
    </html>
  );
}
