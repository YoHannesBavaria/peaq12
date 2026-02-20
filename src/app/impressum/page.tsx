import { LegalPageShell } from "@/components/legal-page-shell";

export default function ImpressumPage() {
  return (
    <LegalPageShell
      title="Impressum"
      intro="Anbieterkennzeichnung und Unternehmensinformationen entsprechend den in der Schweiz und EU üblichen Transparenzanforderungen."
    >
      <h2>Unternehmen</h2>
      <p>peaq GmbH</p>
      <p>Neugutstrasse 12</p>
      <p>8304 Wallisellen</p>
      <p>Switzerland</p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:info@peaq.ch">info@peaq.ch</a>
      </p>

      <h2>Registereintrag</h2>
      <p>
        Handelsregisteramt: <strong>Bitte ergänzen</strong>
      </p>
      <p>
        Handelsregisternummer: <strong>Bitte ergänzen</strong>
      </p>
      <p>
        UID / VAT: <strong>Bitte ergänzen</strong>
      </p>

      <h2>Vertretungsberechtigte Person</h2>
      <p>
        <strong>Bitte ergänzen</strong>
      </p>

      <p className="legal-note">
        Hinweis: Die Registerangaben wurden im verfügbaren Legacy-Snapshot nicht gefunden und sollten vor
        Produktionsfreigabe ergänzt werden.
      </p>
    </LegalPageShell>
  );
}
