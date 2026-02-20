import { LegalPageShell } from "@/components/legal-page-shell";

export default function CookiePage() {
  return (
    <LegalPageShell
      title="Cookie-Hinweise"
      intro="Übersicht über den Einsatz technisch notwendiger und optionaler Cookies bzw. vergleichbarer Speichertechnologien."
    >
      <h2>Technisch notwendige Cookies</h2>
      <p>Diese Cookies sind für den sicheren und stabilen Betrieb der Website erforderlich und können nicht deaktiviert werden.</p>

      <h2>Optionale Cookies</h2>
      <p>Optionale Cookies für Analyse oder Komfortfunktionen werden nur auf Basis einer entsprechenden Einwilligung gesetzt.</p>

      <h2>Verwaltung Ihrer Einstellungen</h2>
      <p>
        Für ein produktives Consent-Management sollte ein dediziertes CMP integriert werden (z. B. mit granularen
        Opt-In/Opt-Out Optionen).
      </p>

      <h2>Kontakt</h2>
      <p>
        Fragen zum Datenschutz und zu Cookies: <a href="mailto:info@peaq.ch">info@peaq.ch</a>
      </p>

      <p className="legal-note">
        Hinweis: Diese Seite enthält eine technische Basisdarstellung und ersetzt keine juristische Prüfung.
      </p>
    </LegalPageShell>
  );
}
