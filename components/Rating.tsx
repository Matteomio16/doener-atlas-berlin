import { getDict, type Lang } from "@/i18n";

export default function Rating({ value, lang }: { value: number; lang: Lang }) {
  const label = getDict(lang).places.ratingValue(value);
  return (
    <span className="rating" role="img" aria-label={label} title={label}>
      {"●".repeat(value)}
      <span style={{ opacity: 0.3 }}>{"●".repeat(5 - value)}</span>
    </span>
  );
}
