import type { Metadata } from "next";
import { getDict, type Lang } from "@/i18n";
import ImbissTrainer from "@/components/ImbissTrainer";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  return { title: getDict((await params).lang).imbiss.title };
}

export default async function ImbissPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const d = getDict(lang).imbiss;
  return (
    <>
      <header className="page-head">
        <h1>{d.title}</h1>
        <p>{d.lead}</p>
      </header>
      <ImbissTrainer lang={lang} />
      <aside className="callout">
        <h2>{d.mitAlles.title}</h2>
        <p>{d.mitAlles.body}</p>
      </aside>
    </>
  );
}
