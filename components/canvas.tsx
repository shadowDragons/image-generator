'use client'

import { forwardRef, useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import type { CanvasElement, EditorState } from '../types/editor'
import { DraggableElement } from './draggable-element'

interface CanvasProps {
  state: EditorState
  onElementSelect: (id: string | null) => void
  onElementUpdate: (id: string, updates: Partial<CanvasElement>) => void
  onElementDuplicate: (newElement: CanvasElement) => void
  onElementDelete: (id: string) => void
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(({ state, onElementSelect, onElementUpdate, onElementDuplicate, onElementDelete }, ref) => {
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop(
    () => ({
      accept: 'canvasElement',
      drop: (item: { id: string; type: string }, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset()
        if (delta) {
          const element = state.elements.find(el => el.id === item.id)
          if (element) {
            const x = Math.round((element.x + delta.x) / scale)
            const y = Math.round((element.y + delta.y) / scale)
            onElementUpdate(item.id, { x, y })
          }
        }
      },
    }),
    [state.elements, onElementUpdate, scale]
  )

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight
      const scaleX = containerWidth / state.canvasSize.width
      const scaleY = containerHeight / state.canvasSize.height
      setScale(Math.min(scaleX, scaleY))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [state.canvasSize])

  return (
    <div ref={containerRef} className='w-full h-[calc(100vh-180px)] flex items-center justify-center bg-gray-900 rounded-lg p-0'>
      <div
        ref={node => {
          drop(node)
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className='relative overflow-hidden touch-none'
        style={{
          width: state.canvasSize.width * scale,
          height: state.canvasSize.height * scale,
          maxWidth: '100%',
          maxHeight: '100%',
          background: state.background.value,
          touchAction: 'none',
          transform: `scale(${scale})`,
          transformOrigin: 'center',
        }}
        onClick={e => {
          if (e.target === e.currentTarget) {
            onElementSelect(null)
          }
        }}
      >
        {state.elements.map(element => (
          <DraggableElement
            key={element.id}
            element={element}
            onSelect={() => onElementSelect(element.id)}
            onUpdate={updates => onElementUpdate(element.id, updates)}
            onDuplicate={newElement => onElementDuplicate(newElement)}
            onDelete={() => onElementDelete(element.id)}
            scale={scale}
            canvasWidth={state.canvasSize.width}
            canvasHeight={state.canvasSize.height}
          />
        ))}
      </div>
    </div>
  )
})

Canvas.displayName = 'Canvas'
