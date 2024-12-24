import { Button } from '@/components/ui/button'
import type { GradientTemplate } from '../types/editor'

interface GradientTemplatesProps {
  templates: GradientTemplate[]
  onSelect: (value: string) => void
}

export function GradientTemplates({ templates, onSelect }: GradientTemplatesProps) {
  return (
    <div className='grid grid-cols-3 gap-2'>
      {templates.map(template => (
        <Button key={template.name} className='w-full h-12 p-0' style={{ background: template.value }} onClick={() => onSelect(template.value)} />
      ))}
    </div>
  )
}
