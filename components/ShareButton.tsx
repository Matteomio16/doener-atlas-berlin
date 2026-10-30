"use client";

import { useState } from "react";
import { getDict, type Lang } from "@/i18n";

export default function ShareButton({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ url, title: document.title });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  return (
    <button type="button" className="button button--ghost" onClick={share} aria-live="polite">
      {copied ? d.places.copied : d.places.share}
    </button>
  );
}
