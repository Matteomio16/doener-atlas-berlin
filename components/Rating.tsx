import { getDict, type Lang } from "@/i18n";
import type { Place } from "@/lib/taxonomy";
import { formatNumber } from "@/lib/format";

// Shows Matteo's grade exactly as given (plus its label), or the label alone when there is no number.
export default function Grade({ place, lang }: { place: Place; lang: Lang }) {
  const d = getDict(lang).places;
  if (place.status === "planned") return <span className="grade grade--planned">{d.planned}</span>;
  const label = place.grade_label?.[lang];
  return (
    <span className="grade">
      {place.grade != null && <b>{d.gradeValue(formatNumber(place.grade, lang))}</b>}
      {label && <span className="grade__label">{label}</span>}
    </span>
  );
}
