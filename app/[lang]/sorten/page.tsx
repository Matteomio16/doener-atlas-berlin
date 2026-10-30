import type { Metadata } from "next";
import { getDict, type Lang } from "@/i18n";
import SortenExplorer from "@/components/SortenExplorer";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  return { title: getDict((await params).lang).sorten.title };
}

export default async function SortenPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const d = getDict(lang).sorten;
  return (
    <>
      <header className="page-head">
        <h1>{d.title}</h1>
        <p>{d.lead}</p>
      </header>
      <SortenExplorer lang={lang} />
    </>
  );
}
