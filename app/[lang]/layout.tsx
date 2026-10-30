import "../globals.css";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { display, body } from "@/lib/fonts";
import { LANGS, getDict, isLang } from "@/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return { title: { default: d.meta.title, template: `%s · ${d.meta.title}` }, description: d.meta.description, icons: "/favicon.svg" };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);
  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          {d.nav.skip}
        </a>
        <Header lang={lang} />
        <main id="main" className="main">
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
