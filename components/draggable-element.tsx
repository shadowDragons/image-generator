'use client'

import * as Icons from 'lucide-react'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'
import type { CanvasElement } from '../types/editor'
import { CodeBlock } from './code-block'
import { QuickActions } from './quick-actions'
import { ShapeElement } from './shape-element'

interface DraggableElementProps {
  element: CanvasElement
  onSelect: () => void
  onUpdate: (updates: Partial<CanvasElement>) => void
  onDuplicate: (newElement: CanvasElement) => void
  onDelete: (id: string) => void
  scale: number
  canvasWidth: number
  canvasHeight: number
}

export function DraggableElement({ element, onSelect, onUpdate, onDuplicate, onDelete, scale, canvasWidth, canvasHeight }: DraggableElementProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [touchTimer, setTouchTimer] = useState<NodeJS.Timeout | null>(null)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'canvasElement',
    item: { id: element.id, type: element.type },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  useEffect(() => {
    return () => {
      if (touchTimer) clearTimeout(touchTimer)
    }
  }, [touchTimer])

  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      onSelect()
    }, 500)
    setTouchTimer(timer)
  }

  const handleTouchEnd = () => {
    if (touchTimer) {
      clearTimeout(touchTimer)
      setTouchTimer(null)
    }
  }

  const handleSelect = () => {
    setIsSelected(true)
    onSelect()
  }

  const handleDeselect = () => {
    setIsSelected(false)
  }

  const handleDuplicate = () => {
    const newElement = {
      ...element,
      id: nanoid(),
      x: element.x + 20,
      y: element.y + 20,
    }
    onDuplicate(newElement)
  }

  const handleDelete = () => {
    onDelete(element.id)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest(`[data-element-id="${element.id}"]`)) {
        setIsSelected(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [element.id])

  const commonProps: React.HTMLAttributes<HTMLDivElement> & {
    ref: React.RefObject<HTMLDivElement>
    'data-element-id': string
  } = {
    ref: drag as unknown as React.RefObject<HTMLDivElement>,
    className: `absolute cursor-move ${isSelected ? 'ring-2 ring-primary' : ''}`,
    'data-element-id': element.id,
    style: {
      left: element.x * scale,
      top: element.y * scale,
      opacity: isDragging ? 0.5 : 1,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      position: 'absolute' as const,
      cursor: 'move',
      touchAction: 'none',
    },
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      handleSelect()
    },
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  }

  if (element.type === 'text') {
    return (
      <div {...commonProps} onDoubleClick={() => setIsEditing(true)}>
        {isEditing ? (
          <textarea
            value={element.content}
            onChange={e => onUpdate({ content: e.target.value })}
            onBlur={() => setIsEditing(false)}
            onKeyDown={e => {
              if (e.key === 'Enter' && e.shiftKey) {
                setIsEditing(false)
              }
            }}
            className='bg-transparent border rounded px-2 resize-none'
            style={{
              color: element.color,
              fontSize: `${element.fontSize}px`,
              fontFamily: element.fontFamily,
              backgroundColor: element.backgroundColor,
              fontWeight: element.fontWeight,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              minWidth: '100px',
              minHeight: '1em',
            }}
            autoFocus
          />
        ) : (
          <div
            style={{
              color: element.color,
              fontSize: `${element.fontSize}px`,
              fontFamily: element.fontFamily,
              backgroundColor: element.backgroundColor,
              padding: element.backgroundColor ? '0.25em 0.5em' : undefined,
              fontWeight: element.fontWeight,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              minWidth: '100px',
            }}
          >
            {element.content}
          </div>
        )}
        {isSelected && (
          <QuickActions
            element={element}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            scale={scale}
            onUpdate={onUpdate}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        )}
      </div>
    )
  }

  if (element.type === 'image') {
    return (
      <div {...commonProps}>
        <Image
          src={element.src}
          alt='Uploaded content'
          width={element.width}
          height={element.height}
          className='select-none'
          style={{
            width: element.width,
            height: element.height,
          }}
        />
        {isSelected && (
          <QuickActions
            element={element}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            scale={scale}
            onUpdate={onUpdate}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        )}
      </div>
    )
  }

  if (element.type === 'icon') {
    const IconComponent = Icons[element.name as keyof typeof Icons]
    return (
      <div {...commonProps}>
        {IconComponent && React.createElement(IconComponent as any, { size: element.size, color: element.color })}
        {isSelected && (
          <QuickActions
            element={element}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            scale={scale}
            onUpdate={onUpdate}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        )}
      </div>
    )
  }

  if (element.type === 'shape') {
    return (
      <div {...commonProps}>
        <ShapeElement
          shape={element.shape}
          width={element.width}
          height={element.height}
          fillColor={element.fillColor || 'none'}
          strokeColor={element.strokeColor || '#000000'}
          strokeWidth={element.strokeWidth}
          borderRadius={element.borderRadius}
        />
        {isSelected && (
          <QuickActions
            element={element}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            scale={scale}
            onUpdate={onUpdate}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        )}
      </div>
    )
  }

  if (element.type === 'code') {
    return (
      <div {...commonProps}>
        <CodeBlock code={element.content} language={element.language} width={element.width} height={element.height} />
        {isSelected && (
          <QuickActions
            element={element}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            scale={scale}
            onUpdate={onUpdate}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        )}
      </div>
    )
  }

  return null
}
