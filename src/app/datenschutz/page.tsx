import { LegalPageShell } from "@/components/legal-page-shell";

export default function DatenschutzPage() {
  return (
    <LegalPageShell
      title="Datenschutzerklärung"
      intro="Diese Übersicht beschreibt, welche Daten auf dieser Website typischerweise verarbeitet werden und wie Betroffene ihre Rechte ausüben können."
    >
      <h2>Verantwortliche Stelle</h2>
      <p>peaq GmbH, Neugutstrasse 12, 8304 Wallisellen, Switzerland</p>
      <p>
        Kontakt: <a href="mailto:info@peaq.ch">info@peaq.ch</a>
      </p>

      <h2>Verarbeitete Daten</h2>
      <ul>
        <li>Server-Logs (IP-Adresse, Zeitpunkt, aufgerufene URL, User Agent)</li>
        <li>Kontaktanfragen per E-Mail</li>
        <li>Nutzungsdaten zur technischen Bereitstellung und Sicherheit</li>
      </ul>

      <h2>Zwecke</h2>
      <ul>
        <li>Bereitstellung und Stabilität der Website</li>
        <li>Bearbeitung von Anfragen</li>
        <li>Missbrauchs- und Sicherheitsabwehr</li>
      </ul>

      <h2>Betroffenenrechte</h2>
      <p>Sie können jederzeit Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung anfragen.</p>

      <h2>Speicherdauer</h2>
      <p>Daten werden nur so lange gespeichert, wie es für die genannten Zwecke oder gesetzliche Pflichten erforderlich ist.</p>

      <p className="legal-note">
        Hinweis: Diese Seite ist als strukturierte Vorlage umgesetzt und sollte durch juristisch geprüfte Endfassungen
        ergänzt werden.
      </p>
    </LegalPageShell>
  );
}
