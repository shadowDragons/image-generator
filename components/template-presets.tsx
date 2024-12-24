import { Card, CardContent } from '@/components/ui/card'
import type { Template } from '../types/editor'

interface TemplatePresetsProps {
  templates: Template[]
  onSelect: (template: Template) => void
}

export function TemplatePresets({ templates, onSelect }: TemplatePresetsProps) {
  return (
    <div className='grid grid-cols-2 gap-2'>
      {templates.map(template => (
        <Card key={template.id} className='cursor-pointer hover:opacity-80 transition-opacity' onClick={() => onSelect(template)}>
          <CardContent className='p-2'>
            <div className='aspect-[4/3] w-full rounded-md overflow-hidden bg-cover bg-center' style={{ backgroundImage: `url(${template.preview})` }} />
            <p className='text-xs mt-2 text-center'>{template.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
