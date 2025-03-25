import StaticPageLayout from '@/components/StaticPageLayout'

export default function DatenschutzPage() {
  return (
    <StaticPageLayout
      title="Datenschutzerklärung"
      lastUpdated="15. März 2024"
    >
      <div className="prose prose-purple max-w-none">
        <h2>1. Verantwortliche Stelle</h2>
        <p>
          PAPRICAR UG (haftungsbeschränkt)<br />
          Musterstraße 123<br />
          10115 Berlin<br />
          E-Mail: datenschutz@papricar.de
        </p>

        <h2>2. Art und Umfang der Datenerhebung</h2>
        <p>
          Wir erheben und verarbeiten personenbezogene Daten nur im notwendigen Umfang
          für die Bereitstellung unserer Dienste. Dies umfasst:
        </p>
        <ul>
          <li>Registrierungsdaten (Name, E-Mail, Telefon)</li>
          <li>Fahrzeugdaten bei Händlern</li>
          <li>Kommunikationsdaten zwischen Händlern und Käufern</li>
          <li>Nutzungsdaten der Plattform</li>
        </ul>

        <h2>3. Verwendung von Supabase</h2>
        <p>
          Wir nutzen Supabase als Datenbank- und Authentifizierungsdienst. Supabase
          verarbeitet Daten in der EU und unterliegt den europäischen Datenschutzgesetzen.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Wir verwenden Cookies für die technische Funktionalität und Analyse.
          Sie können die Cookie-Einstellungen in Ihrem Browser anpassen.
        </p>

        <h2>5. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf:
        </p>
        <ul>
          <li>Auskunft über Ihre gespeicherten Daten</li>
          <li>Berichtigung oder Löschung Ihrer Daten</li>
          <li>Einschränkung der Verarbeitung</li>
          <li>Datenübertragbarkeit</li>
          <li>Widerspruch gegen die Verarbeitung</li>
        </ul>

        <h2>6. Kontakt</h2>
        <p>
          Für Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
        </p>
        <p>
          E-Mail: datenschutz@papricar.de<br />
          Telefon: +49 (0) 30 123456789
        </p>
      </div>
    </StaticPageLayout>
  )
} 