import { Card, CardContent } from '@/components/ui/card'
import * as Icons from 'lucide-react'
import type { CanvasSizePreset } from '../types/editor'

interface CanvasSizePresetsProps {
  presets: CanvasSizePreset[]
  currentSize: { width: number; height: number }
  onSelect: (size: { width: number; height: number }) => void
}

export function CanvasSizePresets({ presets, currentSize, onSelect }: CanvasSizePresetsProps) {
  return (
    <div className='grid grid-cols-2 gap-2'>
      {presets.map(preset => {
        const Icon = Icons[preset.icon] as React.ComponentType<any>
        const isSelected = currentSize.width === preset.width && currentSize.height === preset.height

        return (
          <Card
            key={preset.id}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : 'hover:bg-accent'}`}
            onClick={() => onSelect({ width: preset.width, height: preset.height })}
          >
            <CardContent className='p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Icon className='w-4 h-4' />
                <span className='text-sm font-medium'>{preset.platform}</span>
              </div>
              <p className='text-xs text-muted-foreground'>{preset.name}</p>
              <p className='text-xs text-muted-foreground mt-1'>
                {preset.width} x {preset.height}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
