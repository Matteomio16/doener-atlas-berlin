"use client";

import { useEffect, useState } from "react";
import { getDict, type Lang } from "@/i18n";
import { dialog, vocab, type DialogOption } from "@/data/vocab";

type Mode = "cards" | "quiz" | "dialog";
const MODES: Mode[] = ["cards", "quiz", "dialog"];
const QUIZ_LENGTH = 8;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ImbissTrainer({ lang }: { lang: Lang }) {
  const d = getDict(lang).imbiss;
  const [mode, setMode] = useState<Mode>("cards");

  return (
    <>
      <div className="tabs" role="tablist" aria-label={d.title}>
        {MODES.map((m) => (
          <button
            key={m}
            role="tab"
            id={`tab-${m}`}
            aria-selected={mode === m}
            aria-controls={`panel-${m}`}
            onClick={() => setMode(m)}
          >
            {d.modes[m]}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${mode}`} aria-labelledby={`tab-${mode}`}>
        {mode === "cards" && <Cards lang={lang} />}
        {mode === "quiz" && <Quiz lang={lang} />}
        {mode === "dialog" && <Dialog lang={lang} />}
      </div>
    </>
  );
}

function Cards({ lang }: { lang: Lang }) {
  const d = getDict(lang).imbiss;
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  return (
    <>
      <p className="place-card__meta">{d.flipHint}</p>
      <div className="flashcards">
        {vocab.map((v, i) => {
          const isFlipped = flipped.has(i);
          return (
            <button
              key={v.term}
              type="button"
              className="flashcard"
              aria-pressed={isFlipped}
              aria-label={isFlipped ? `${v.term}: ${v.meaning}. ${v.example.de}` : `${v.term}. ${d.flip}`}
              onClick={() => {
                const next = new Set(flipped);
                isFlipped ? next.delete(i) : next.add(i);
                setFlipped(next);
              }}
            >
              <span className="flashcard__inner">
                <span className="flashcard__face flashcard__face--front" aria-hidden={isFlipped}>
                  <span className="display" lang="de">
                    {v.term}
                  </span>
                  <small>{d.flip} ↻</small>
                </span>
                <span className="flashcard__face flashcard__face--back" aria-hidden={!isFlipped}>
                  <strong lang="en">{v.meaning}</strong>
                  <span lang="de">„{v.example.de}“</span>
                  <small lang="en">{v.example.en}</small>
                  {v.note && <small className="flashcard__note">{v.note[lang]}</small>}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function Quiz({ lang }: { lang: Lang }) {
  const d = getDict(lang).imbiss;
  const [questions, setQuestions] = useState<{ term: string; answer: string; options: string[] }[]>([]);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const start = () => {
    setQuestions(
      shuffle(vocab)
        .slice(0, QUIZ_LENGTH)
        .map((v) => ({
          term: v.term,
          answer: v.meaning,
          options: shuffle([v.meaning, ...shuffle(vocab.filter((o) => o !== v)).slice(0, 3).map((o) => o.meaning)]),
        })),
    );
    setIndex(0);
    setChosen(null);
    setScore(0);
  };

  useEffect(start, []);

  if (!questions.length) return null;

  if (index >= questions.length) {
    return (
      <div className="quiz">
        <p className="display" style={{ fontSize: "2.4rem" }}>
          {d.score(score, questions.length)}
        </p>
        <button type="button" className="button" onClick={start}>
          {d.restart}
        </button>
      </div>
    );
  }

  const q = questions[index];
  const choose = (o: string) => {
    if (chosen) return;
    setChosen(o);
    if (o === q.answer) setScore((s) => s + 1);
  };

  return (
    <div className="quiz">
      <p className="place-card__meta">
        {index + 1} / {questions.length}
      </p>
      <h2>{d.quizQuestion(q.term)}</h2>
      <div className="quiz__options">
        {q.options.map((o) => (
          <button
            key={o}
            type="button"
            className="quiz__option"
            lang="en"
            disabled={!!chosen}
            data-state={chosen ? (o === q.answer ? "right" : o === chosen ? "wrong" : undefined) : undefined}
            onClick={() => choose(o)}
          >
            {o}
          </button>
        ))}
      </div>
      <p className="quiz__feedback" aria-live="polite">
        {chosen && (chosen === q.answer ? d.correct : d.wrong(q.answer))}
      </p>
      {chosen && (
        <button
          type="button"
          className="button"
          onClick={() => {
            setIndex((i) => i + 1);
            setChosen(null);
          }}
        >
          {d.next}
        </button>
      )}
    </div>
  );
}

function Dialog({ lang }: { lang: Lang }) {
  const d = getDict(lang).imbiss;
  const [answers, setAnswers] = useState<DialogOption[]>([]);
  const [showEn, setShowEn] = useState(lang === "en");
  const step = answers.length;
  const done = step >= dialog.length;
  const order = answers.map((a) => a.order).filter(Boolean).join(" ");

  return (
    <>
      <p>{d.dialogLead}</p>
      <button type="button" className="chip" aria-pressed={showEn} onClick={() => setShowEn((s) => !s)} style={{ marginBottom: 18 }}>
        {showEn ? d.hideTranslation : d.showTranslation}
      </button>
      <div className="chat" aria-live="polite">
        {dialog.slice(0, Math.min(step + 1, dialog.length)).map((s, i) => (
          <div key={i} style={{ display: "contents" }}>
            <div className="bubble bubble--seller">
              <small>{d.seller}</small>
              <span lang="de">{s.seller.de}</span>
              {showEn && <em lang="en">{s.seller.en}</em>}
            </div>
            {answers[i] && (
              <>
                <div className="bubble bubble--you">
                  <small>{d.you}</small>
                  <span lang="de">{answers[i].say.de}</span>
                  {showEn && <em lang="en">{answers[i].say.en}</em>}
                </div>
                {answers[i].tip && <p className="bubble__tip">{answers[i].tip![lang]}</p>}
              </>
            )}
          </div>
        ))}
        {!done && (
          <div className="chat__choices">
            {dialog[step].options.map((o) => (
              <button key={o.say.de} type="button" className="quiz__option" onClick={() => setAnswers([...answers, o])}>
                <span lang="de">{o.say.de}</span>
                {showEn && (
                  <span lang="en" className="place-card__meta" style={{ display: "block" }}>
                    {o.say.en}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {done && (
        <>
          <div className="order-ticket">
            <span>{d.yourOrder}</span>
            <span lang="de" style={{ fontSize: "1.1rem", opacity: 1, textTransform: "none", letterSpacing: 0 }}>
              „{order}, bitte.“
            </span>
          </div>
          <p className="place-card__meta" style={{ marginTop: 10 }}>
            {d.pricesNote}
          </p>
          <button type="button" className="button" onClick={() => setAnswers([])}>
            {d.again}
          </button>
        </>
      )}
    </>
  );
}
