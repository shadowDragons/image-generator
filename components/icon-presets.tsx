import { Button } from '@/components/ui/button'
import type { IconPreset } from '../types/editor'

interface IconPresetsProps {
  presets: IconPreset[]
  onSelect: (name: string) => void
}

export function IconPresets({ presets, onSelect }: IconPresetsProps) {
  return (
    <div className='grid grid-cols-4 gap-2'>
      {presets.map(preset => (
        <Button key={preset.name} className='w-full h-12 p-0 flex items-center justify-center' onClick={() => onSelect(preset.name)}>
          <preset.icon className='w-6 h-6' />
        </Button>
      ))}
    </div>
  )
}
