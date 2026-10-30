import Link from "next/link";
import { getDict, type Lang } from "@/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <footer className="site-footer">
      <p className="site-footer__by">{d.footer.by}</p>
      <p>{d.footer.school}</p>
      <p>
        {d.footer.ai} <Link href={`/${lang}/methode/`}>{d.nav.method}</Link>
      </p>
    </footer>
  );
}
