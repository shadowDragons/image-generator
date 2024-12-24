import { Button } from '@/components/ui/button'
import { AlignCenterHorizontalIcon, AlignEndHorizontalIcon, AlignStartHorizontalIcon, CopyIcon, Trash2Icon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { CanvasElement } from '../types/editor'

interface QuickActionsProps {
  element: CanvasElement
  canvasWidth: number
  canvasHeight: number
  scale: number
  onUpdate: (updates: Partial<CanvasElement>) => void
  onDuplicate: () => void
  onDelete: () => void
}

export function QuickActions({ element, canvasWidth, canvasHeight, scale, onUpdate, onDuplicate, onDelete }: QuickActionsProps) {
  const lastAlignment = useRef<'left' | 'center' | 'right' | null>(null)

  const getElementWidth = () => {
    let elementWidth = 0
    if (element.type === 'text') {
      const tempDiv = document.createElement('div')
      tempDiv.style.position = 'absolute'
      tempDiv.style.visibility = 'hidden'
      tempDiv.style.fontSize = `${element.fontSize}px`
      tempDiv.style.fontFamily = element.fontFamily
      tempDiv.innerText = element.content
      document.body.appendChild(tempDiv)
      elementWidth = tempDiv.offsetWidth
      document.body.removeChild(tempDiv)
    } else if (element.type === 'image' || element.type === 'code' || element.type === 'shape') {
      elementWidth = element.width
    } else if (element.type === 'icon') {
      elementWidth = element.size
    }
    return elementWidth
  }

  const handleAlign = (position: 'left' | 'center' | 'right') => {
    lastAlignment.current = position
    const elementWidth = getElementWidth()
    const actualCanvasWidth = canvasWidth / scale
    let newX = element.x

    switch (position) {
      case 'left':
        newX = 0
        break
      case 'center':
        newX = (actualCanvasWidth - elementWidth) / 2
        break
      case 'right':
        newX = actualCanvasWidth - elementWidth
        break
    }

    onUpdate({ x: newX })
  }

  // 监听画布尺寸变化，如果元素之前是居中或右对齐，则重新计算位置
  useEffect(() => {
    if (lastAlignment.current === 'center' || lastAlignment.current === 'right') {
      handleAlign(lastAlignment.current)
    }
  }, [canvasWidth, scale])

  return (
    <div className='absolute -top-10 left-0 flex items-center gap-1 rounded-md bg-background/80 backdrop-blur p-1 shadow-sm border'>
      <div className='flex items-center gap-1 border-r pr-1'>
        <Button size='icon' variant={lastAlignment.current === 'left' ? 'default' : 'ghost'} className='h-8 w-8' onClick={() => handleAlign('left')}>
          <AlignStartHorizontalIcon className='h-4 w-4' />
        </Button>
        <Button size='icon' variant={lastAlignment.current === 'center' ? 'default' : 'ghost'} className='h-8 w-8' onClick={() => handleAlign('center')}>
          <AlignCenterHorizontalIcon className='h-4 w-4' />
        </Button>
        <Button size='icon' variant={lastAlignment.current === 'right' ? 'default' : 'ghost'} className='h-8 w-8' onClick={() => handleAlign('right')}>
          <AlignEndHorizontalIcon className='h-4 w-4' />
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
