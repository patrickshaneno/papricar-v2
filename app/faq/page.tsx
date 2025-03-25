import StaticPageLayout from '@/components/StaticPageLayout'
import Accordion from '@/components/Accordion'

const faqItems = [
  {
    title: 'Wie funktioniert PAPRICAR?',
    content: 'PAPRICAR ist eine Plattform, die Händler und Käufer von Fahrzeugen verbindet. Händler können ihre Fahrzeuge einstellen und verschiedene Rabattoptionen anbieten. Käufer können Fahrzeuge suchen und Rabattanfragen stellen.'
  },
  {
    title: 'Wer kann Fahrzeuge einstellen?',
    content: 'Nur registrierte Händler können Fahrzeuge auf PAPRICAR einstellen. Dafür müssen Sie sich als Händler registrieren und Ihre Identität verifizieren lassen.'
  },
  {
    title: 'Wie funktioniert die Rabatt-Anfrage?',
    content: 'Käufer können für jedes Fahrzeug eine Rabattanfrage stellen. Sie wählen zwischen Barkauf, Leasing oder Finanzierung und geben ihre gewünschten Konditionen an. Der Händler erhält die Anfrage und kann direkt mit dem Interessenten in Kontakt treten.'
  },
  {
    title: 'Ist die Nutzung kostenlos?',
    content: 'Die Grundnutzung von PAPRICAR ist für Käufer kostenlos. Händler zahlen eine monatliche Gebühr für die Nutzung der Plattform, die sich nach der Anzahl der eingestellten Fahrzeuge richtet.'
  },
  {
    title: 'Wie werden meine Daten verwendet?',
    content: 'Wir verwenden Ihre Daten nur für die Bereitstellung unserer Dienste und die Kommunikation zwischen Händlern und Käufern. Alle Daten werden sicher in unserer Supabase-Datenbank gespeichert und nicht an Dritte weitergegeben.'
  },
  {
    title: 'Wie kann ich mein Konto löschen?',
    content: 'Sie können Ihr Konto jederzeit in den Einstellungen löschen. Alle Ihre Daten werden dann innerhalb von 30 Tagen gelöscht. Bitte beachten Sie, dass bereits abgeschlossene Geschäfte aus rechtlichen Gründen archiviert bleiben.'
  }
]

export default function FAQPage() {
  return (
    <StaticPageLayout
      title="Häufig gestellte Fragen"
      lastUpdated="15. März 2024"
    >
      <div className="space-y-6">
        <p className="text-gray-600">
          Hier finden Sie Antworten auf die häufigsten Fragen rund um PAPRICAR. Falls Sie weitere Fragen haben, kontaktieren Sie uns gerne.
        </p>
        
        <Accordion items={faqItems} />
      </div>
    </StaticPageLayout>
  )
} 