import type { Metadata } from "next";
import { getDict, type Lang } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  return { title: getDict((await params).lang).about.title };
}

// TODO Matteo: write this page yourself (both languages). Replace the placeholder paragraph below.
export default async function AboutPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const d = getDict(lang).about;
  return (
    <>
      <header className="page-head">
        <h1>{d.title}</h1>
        <p>Matteo Mio · Forward College Berlin</p>
      </header>
      <div className="empty">
        <strong>{getDict(lang).empty.title}</strong>
        {d.placeholder}
      </div>
    </>
  );
}
