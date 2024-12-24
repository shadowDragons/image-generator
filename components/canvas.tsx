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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
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
    const updateDimensions = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight

      // Calculate width and height while maintaining aspect ratio
      let width = containerWidth
      let height = width / state.canvasSize.aspectRatio

      // If height exceeds container, scale down
      if (height > containerHeight) {
        height = containerHeight
        width = height * state.canvasSize.aspectRatio
      }

      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [state.canvasSize.aspectRatio])

  return (
    <div ref={containerRef} className='bg-gray-800 p-4 md:p-8 rounded-lg overflow-auto h-[80vh] w-[800px]'>
      <div
        className='relative overflow-hidden'
        style={{
          width: dimensions.width,
          height: dimensions.height,
          background: state.background.value,
        }}
      >
        <div
          ref={node => {
            drop(node)
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          className='relative overflow-hidden touch-none'
          style={{
            width: state.canvasSize.width * scale,
            height: (state.canvasSize.width / state.canvasSize.aspectRatio) * scale,
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
              canvasHeight={state.canvasSize.width / state.canvasSize.aspectRatio}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

Canvas.displayName = 'Canvas'
