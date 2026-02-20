import type { ReactNode } from "react";

type Props = {
  title: string;
  intro: string;
  children: ReactNode;
};

export function LegalPageShell({ title, intro, children }: Props) {
  return (
    <main className="container page-flow legal-page">
      <section className="hero-panel">
        <p className="eyebrow">Legal</p>
        <h1>{title}</h1>
        <p className="lede">{intro}</p>
      </section>
      <section className="legal-card">{children}</section>
    </main>
  );
}
