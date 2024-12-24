import { Button } from '@/components/ui/button'
import {
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStartIcon,
  AlignVerticalJustifyCenterIcon,
  AlignVerticalJustifyEndIcon,
  AlignVerticalJustifyStartIcon,
  CopyIcon,
  Trash2Icon,
} from 'lucide-react'
import type { CanvasElement, ElementAlignment, VerticalAlignment } from '../types/editor'

interface QuickActionsProps {
  element: CanvasElement
  canvasWidth: number
  canvasHeight: number
  onUpdate: (updates: Partial<CanvasElement>) => void
  onDuplicate: () => void
  onDelete: () => void
}

export function QuickActions({ element, canvasWidth, canvasHeight, onUpdate, onDuplicate, onDelete }: QuickActionsProps) {
  const updateAlignment = (alignment: ElementAlignment) => {
    let x = element.x

    if (alignment === 'left') {
      x = 20
    } else if (alignment === 'center') {
      let elementWidth = 0
      if ('width' in element) {
        elementWidth = element.width
      } else if (element.type === 'text') {
        // Approximate text width based on content length and font size
        elementWidth = element.content.length * (element.fontSize * 0.6)
      } else if (element.type === 'icon') {
        elementWidth = element.size
      }
      x = (canvasWidth - elementWidth) / 2
    } else if (alignment === 'right') {
      let elementWidth = 0
      if ('width' in element) {
        elementWidth = element.width
      } else if (element.type === 'text') {
        elementWidth = element.content.length * (element.fontSize * 0.6)
      } else if (element.type === 'icon') {
        elementWidth = element.size
      }
      x = canvasWidth - elementWidth - 20
    }

    onUpdate({ alignment, x })
  }

  const updateVerticalAlignment = (verticalAlignment: VerticalAlignment) => {
    let y = element.y

    if (verticalAlignment === 'top') {
      y = 20
    } else if (verticalAlignment === 'middle') {
      let elementHeight = 0
      if ('height' in element) {
        elementHeight = element.height
      } else if (element.type === 'text') {
        elementHeight = element.fontSize
      } else if (element.type === 'icon') {
        elementHeight = element.size
      }
      y = (canvasHeight - elementHeight) / 2
    } else if (verticalAlignment === 'bottom') {
      let elementHeight = 0
      if ('height' in element) {
        elementHeight = element.height
      } else if (element.type === 'text') {
        elementHeight = element.fontSize
      } else if (element.type === 'icon') {
        elementHeight = element.size
      }
      y = canvasHeight - elementHeight - 20
    }

    onUpdate({ verticalAlignment, y })
  }

  return (
    <div className='absolute -top-12 left-0 bg-gray-800 rounded-md shadow-lg flex items-center gap-1 p-1'>
      <div className='flex items-center gap-1 border-r border-gray-700 pr-1'>
        <Button size='icon' variant={element.alignment === 'left' ? 'default' : 'ghost'} className='h-8 w-8' onClick={() => updateAlignment('left')}>
          <AlignHorizontalJustifyStartIcon className='h-4 w-4' />
        </Button>
        <Button size='icon' variant={element.alignment === 'center' ? 'default' : 'ghost'} className='h-8 w-8' onClick={() => updateAlignment('center')}>
          <AlignHorizontalJustifyCenterIcon className='h-4 w-4' />
        </Button>
        <Button size='icon' variant={element.alignment === 'right' ? 'default' : 'ghost'} className='h-8 w-8' onClick={() => updateAlignment('right')}>
          <AlignHorizontalJustifyEndIcon className='h-4 w-4' />
        </Button>
      </div>
      <div className='flex items-center gap-1 border-r border-gray-700 pr-1'>
        <Button
          size='icon'
          variant={element.verticalAlignment === 'top' ? 'default' : 'ghost'}
          className='h-8 w-8'
          onClick={() => updateVerticalAlignment('top')}
        >
          <AlignVerticalJustifyStartIcon className='h-4 w-4' />
        </Button>
        <Button
          size='icon'
          variant={element.verticalAlignment === 'middle' ? 'default' : 'ghost'}
          className='h-8 w-8'
          onClick={() => updateVerticalAlignment('middle')}
        >
          <AlignVerticalJustifyCenterIcon className='h-4 w-4' />
        </Button>
        <Button
          size='icon'
          variant={element.verticalAlignment === 'bottom' ? 'default' : 'ghost'}
          className='h-8 w-8'
          onClick={() => updateVerticalAlignment('bottom')}
        >
          <AlignVerticalJustifyEndIcon className='h-4 w-4' />
        </Button>
      </div>
      <div className='flex items-center gap-1'>
        <Button size='icon' variant='ghost' className='h-8 w-8' onClick={onDuplicate}>
          <CopyIcon className='h-4 w-4' />
        </Button>
        <Button size='icon' variant='ghost' className='h-8 w-8 text-red-500 hover:text-red-400' onClick={onDelete}>
          <Trash2Icon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
