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
            <div
              className='aspect-[4/3] w-full rounded-md overflow-hidden bg-cover bg-center bg-gray-100'
              style={{
                backgroundImage: template.preview ? `url(${template.preview})` : 'none',
              }}
            >
              {!template.preview && <div className='w-full h-full flex items-center justify-center text-gray-400'>No preview</div>}
            </div>
            <p className='text-xs mt-2 text-center'>{template.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
