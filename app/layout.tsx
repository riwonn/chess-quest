import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

/* ─── Font loading ───────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

/* ─── Metadata ───────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Seoul Chess Club Quest",
  description: "Draw a quest card that opens a conversation at your next chess meetup.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
