import { LegalPageShell } from "@/components/legal-page-shell";

export default function AgbPage() {
  return (
    <LegalPageShell
      title="Allgemeine Geschäftsbedingungen (AGB)"
      intro="Diese Seite stellt eine strukturierte AGB-Basis dar. Für den produktiven Einsatz sollten branchenspezifische Vertragsklauseln ergänzt werden."
    >
      <h2>Geltungsbereich</h2>
      <p>Diese Bedingungen gelten für Leistungen der peaq GmbH gegenüber Geschäftskunden, soweit nichts anderes schriftlich vereinbart wurde.</p>

      <h2>Leistungsumfang</h2>
      <p>Der konkrete Leistungsumfang ergibt sich aus Angebot, Auftragsbestätigung und gegebenenfalls Servicebeschreibung.</p>

      <h2>Vergütung und Zahlungsbedingungen</h2>
      <p>Rechnungen sind, sofern nicht anders vereinbart, innerhalb der vereinbarten Frist netto zahlbar.</p>

      <h2>Haftung</h2>
      <p>Die Haftung richtet sich nach den zwingenden gesetzlichen Vorschriften und den individuell vereinbarten Vertragsbedingungen.</p>

      <h2>Gerichtsstand</h2>
      <p>Sofern gesetzlich zulässig, ist der Sitz der peaq GmbH Gerichtsstand.</p>

      <p className="legal-note">
        Hinweis: Bitte AGB vor Live-Betrieb juristisch finalisieren und auf die tatsächlichen Vertragsprozesse abstimmen.
      </p>
    </LegalPageShell>
  );
}
