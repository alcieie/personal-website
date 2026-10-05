import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { site } from "@/data/content";
import "./globals.css";

const sans = Instrument_Sans({ variable: "--font-body", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif-face", subsets: ["latin"], weight: "400", style: "italic" });

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
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans text-[17px] leading-relaxed">{children}</body>
    </html>
  );
}
