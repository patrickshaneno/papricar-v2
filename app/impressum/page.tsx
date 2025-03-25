import StaticPageLayout from '@/components/StaticPageLayout'

export default function ImpressumPage() {
  return (
    <StaticPageLayout
      title="Impressum"
      lastUpdated="15. März 2024"
    >
      <div className="prose prose-purple max-w-none">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          PAPRICAR UG (haftungsbeschränkt)<br />
          Musterstraße 123<br />
          10115 Berlin
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: +49 (0) 30 123456789<br />
          E-Mail: info@papricar.de
        </p>

        <h2>Vertreten durch</h2>
        <p>
          Geschäftsführer: Max Mustermann
        </p>

        <h2>Registereintrag</h2>
        <p>
          Eintragung im Handelsregister<br />
          Registergericht: Amtsgericht Berlin<br />
          Registernummer: HRB 123456
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
          DE 123456789
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          Max Mustermann<br />
          PAPRICAR UG (haftungsbeschränkt)<br />
          Musterstraße 123<br />
          10115 Berlin
        </p>

        <h2>Haftungsausschluss</h2>
        <h3>Haftung für Inhalte</h3>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
          keine Gewähr übernehmen.
        </p>

        <h3>Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
          Inhalte auch keine Gewähr übernehmen.
        </p>

        <h3>Urheberrecht</h3>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht.
        </p>
      </div>
    </StaticPageLayout>
  )
} 