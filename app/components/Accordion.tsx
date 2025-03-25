import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface AccordionItemProps {
  title: string
  content: string
  isOpen: boolean
  onClick: () => void
}

function AccordionItem({ title, content, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="text-lg font-medium text-gray-900">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-600">{content}</p>
        </div>
      )}
    </div>
  )
}

interface AccordionProps {
  items: Array<{
    title: string
    content: string
  }>
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
} 