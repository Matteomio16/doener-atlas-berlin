"use client";

import { useEffect } from "react";
import { readLang } from "@/lib/langStore";

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(`/${readLang() ?? "de"}/`);
  }, []);

  return (
    <main className="root-choose">
      <p className="wordmark">Döner Atlas Berlin</p>
      <nav aria-label="Sprache wählen / Choose language">
        <a href="/de/">Deutsch</a>
        <a href="/en/">English</a>
      </nav>
    </main>
  );
}
