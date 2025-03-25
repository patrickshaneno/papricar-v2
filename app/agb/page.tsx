import StaticPageLayout from '@/components/StaticPageLayout'

export default function AGBPage() {
  return (
    <StaticPageLayout
      title="Allgemeine Geschäftsbedingungen"
      lastUpdated="15. März 2024"
    >
      <div className="prose prose-purple max-w-none">
        <h2>§1 Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Nutzer der Plattform PAPRICAR.
          Mit der Nutzung der Plattform erkennen Sie diese AGB an.
        </p>

        <h2>§2 Nutzung der Plattform</h2>
        <p>
          PAPRICAR ist eine Plattform zur Vermittlung von Fahrzeugen zwischen Händlern und Käufern.
          Die Nutzung der Plattform ist nur im Rahmen der geltenden Gesetze und dieser AGB gestattet.
        </p>

        <h2>§3 Pflichten der Nutzer</h2>
        <ul>
          <li>Angaben müssen wahrheitsgemäß und vollständig sein</li>
          <li>Fahrzeugbeschreibungen müssen den tatsächlichen Zustand widerspiegeln</li>
          <li>Preise und Rabatte müssen korrekt angegeben werden</li>
          <li>Die Plattform darf nicht für illegale Zwecke genutzt werden</li>
        </ul>

        <h2>§4 Haftung</h2>
        <p>
          PAPRICAR haftet nicht für die Richtigkeit der von Nutzern eingestellten Inhalte.
          Die Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt.
        </p>

        <h2>§5 Datenschutz</h2>
        <p>
          Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemäß unserer
          Datenschutzerklärung und den geltenden Datenschutzgesetzen.
        </p>

        <h2>§6 Schlussbestimmungen</h2>
        <p>
          Es gilt deutsches Recht. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz
          von PAPRICAR.
        </p>
      </div>
    </StaticPageLayout>
  )
} 