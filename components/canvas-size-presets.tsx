import { Card, CardContent } from '@/components/ui/card'
import * as Icons from 'lucide-react'
import type { CanvasSizePreset } from '../types/editor'

interface CanvasSizePresetsProps {
  presets: CanvasSizePreset[]
  currentAspectRatio: number
  onSelect: (aspectRatio: number) => void
}

export function CanvasSizePresets({ presets, currentAspectRatio, onSelect }: CanvasSizePresetsProps) {
  return (
    <div className='grid grid-cols-2 gap-2'>
      {presets.map(preset => {
        const Icon = Icons[preset.icon] as React.ComponentType<any>
        const isSelected = Math.abs(currentAspectRatio - preset.aspectRatio) < 0.01

        return (
          <Card
            key={preset.id}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : 'hover:bg-accent'}`}
            onClick={() => onSelect(preset.aspectRatio)}
          >
            <CardContent className='p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Icon className='w-4 h-4' />
                <span className='text-sm font-medium'>{preset.platform}</span>
              </div>
              <p className='text-xs text-muted-foreground'>{preset.name}</p>
              <p className='text-xs text-muted-foreground mt-1'>Aspect Ratio: {preset.aspectRatio.toFixed(2)}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
