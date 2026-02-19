import type { Metadata } from "next";
import { Manrope, Merriweather } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { getSiteContent } from "@/lib/content";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "peaq12 - Structured Enterprise Editorial",
  description: "Relaunch concept with strong content hierarchy, full legacy coverage, and business-focused readability.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getSiteContent();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${merriweather.variable} ${manrope.variable}`}>
        <Navigation menuItems={content.menuItems} />
        {children}
      </body>
    </html>
  );
}
