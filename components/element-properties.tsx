'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import type { CanvasElement } from '../types/editor'

interface ElementPropertiesProps {
  element: CanvasElement | null
  onUpdate: (updates: Partial<CanvasElement>) => void
}

export function ElementProperties({ element, onUpdate }: ElementPropertiesProps) {
  if (!element) {
    return null
  }

  if (element.type === 'text') {
    return (
      <div className='space-y-4'>
        <div>
          <Label>Text Color</Label>
          <Input type='color' value={element.color} onChange={e => onUpdate({ color: e.target.value })} className='w-full mt-2' />
        </div>
        <div>
          <Label>Background Color</Label>
          <Input
            type='color'
            value={element.backgroundColor || '#ffffff'}
            onChange={e => onUpdate({ backgroundColor: e.target.value })}
            className='w-full mt-2'
          />
        </div>
        <div>
          <Label>Font Size</Label>
          <Slider value={[element.fontSize]} min={8} max={72} step={1} onValueChange={([value]) => onUpdate({ fontSize: value })} className='mt-2' />
        </div>
        <div>
          <Label>Font Family</Label>
          <select
            value={element.fontFamily}
            onChange={e => onUpdate({ fontFamily: e.target.value })}
            className='w-full mt-2 bg-gray-800 border border-gray-700 rounded-md p-2'
          >
            <option value='Inter'>Inter</option>
            <option value='Arial'>Arial</option>
            <option value='Times New Roman'>Times New Roman</option>
          </select>
        </div>
        <div>
          <Label>Font Weight</Label>
          <select
            value={element.fontWeight || 'normal'}
            onChange={e => onUpdate({ fontWeight: e.target.value })}
            className='w-full mt-2 bg-gray-800 border border-gray-700 rounded-md p-2'
          >
            <option value='normal'>Normal</option>
            <option value='bold'>Bold</option>
            <option value='lighter'>Light</option>
            <option value='100'>Thin (100)</option>
            <option value='200'>Extra Light (200)</option>
            <option value='300'>Light (300)</option>
            <option value='400'>Regular (400)</option>
            <option value='500'>Medium (500)</option>
            <option value='600'>Semi Bold (600)</option>
            <option value='700'>Bold (700)</option>
            <option value='800'>Extra Bold (800)</option>
            <option value='900'>Black (900)</option>
          </select>
        </div>
      </div>
    )
  }

  if (element.type === 'image') {
    return (
      <div className='space-y-4'>
        <div>
          <Label>Width</Label>
          <Slider value={[element.width]} min={50} max={800} step={1} onValueChange={([value]) => onUpdate({ width: value })} className='mt-2' />
        </div>
        <div>
          <Label>Height</Label>
          <Slider value={[element.height]} min={50} max={600} step={1} onValueChange={([value]) => onUpdate({ height: value })} className='mt-2' />
        </div>
      </div>
    )
  }

  if (element.type === 'icon') {
    return (
      <div className='space-y-4'>
        <div>
          <Label>Icon Color</Label>
          <Input type='color' value={element.color} onChange={e => onUpdate({ color: e.target.value })} className='w-full mt-2' />
        </div>
        <div>
          <Label>Icon Size</Label>
          <Slider value={[element.size]} min={16} max={128} step={1} onValueChange={([value]) => onUpdate({ size: value })} className='mt-2' />
        </div>
      </div>
    )
  }

  if (element.type === 'shape') {
    return (
      <div className='space-y-4'>
        <div>
          <Label>Shape Type</Label>
          <Select value={element.shape} onValueChange={(value: 'rectangle' | 'circle' | 'triangle') => onUpdate({ shape: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='rectangle'>Rectangle</SelectItem>
              <SelectItem value='circle'>Circle</SelectItem>
              <SelectItem value='triangle'>Triangle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Fill Color</Label>
          <div className='flex gap-2 mt-2'>
            <Input
              type='color'
              value={element.fillColor || '#000000'}
              onChange={e => onUpdate({ fillColor: e.target.value })}
              disabled={!element.fillColor}
              className='w-full'
            />
            <button onClick={() => onUpdate({ fillColor: undefined })} className='px-2 py-1 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700'>
              {element.fillColor ? 'Clear' : 'No Fill'}
            </button>
          </div>
        </div>
        <div>
          <Label>Stroke Color</Label>
          <Input type='color' value={element.strokeColor || '#000000'} onChange={e => onUpdate({ strokeColor: e.target.value })} className='w-full mt-2' />
        </div>
        <div>
          <Label>Stroke Width</Label>
          <Slider value={[element.strokeWidth]} min={1} max={20} step={1} onValueChange={([value]) => onUpdate({ strokeWidth: value })} className='mt-2' />
        </div>
        <div>
          <Label>Width</Label>
          <Slider value={[element.width]} min={20} max={400} step={1} onValueChange={([value]) => onUpdate({ width: value })} className='mt-2' />
        </div>
        <div>
          <Label>Height</Label>
          <Slider value={[element.height]} min={20} max={400} step={1} onValueChange={([value]) => onUpdate({ height: value })} className='mt-2' />
        </div>
        {element.shape === 'rectangle' && (
          <div>
            <Label>Border Radius</Label>
            <Slider
              value={[element.borderRadius || 0]}
              min={0}
              max={50}
              step={1}
              onValueChange={([value]) => onUpdate({ borderRadius: value })}
              className='mt-2'
            />
          </div>
        )}
      </div>
    )
  }

  if (element.type === 'code') {
    return (
      <div className='space-y-4'>
        <div>
          <Label>Code Content</Label>
          <textarea
            value={element.content}
            onChange={e => onUpdate({ content: e.target.value })}
            className='w-full mt-2 min-h-[200px] bg-gray-800 border border-gray-700 rounded-md p-2'
          />
        </div>
        <div>
          <Label>Language</Label>
          <select
            value={element.language}
            onChange={e => onUpdate({ language: e.target.value })}
            className='w-full mt-2 bg-gray-800 border border-gray-700 rounded-md p-2'
          >
            <option value='javascript'>JavaScript</option>
            <option value='typescript'>TypeScript</option>
            <option value='jsx'>JSX</option>
            <option value='tsx'>TSX</option>
          </select>
        </div>
        <div>
          <Label>Width</Label>
          <Slider value={[element.width]} min={200} max={800} step={1} onValueChange={([value]) => onUpdate({ width: value })} className='mt-2' />
        </div>
        <div>
          <Label>Height</Label>
          <Slider value={[element.height]} min={100} max={600} step={1} onValueChange={([value]) => onUpdate({ height: value })} className='mt-2' />
        </div>
      </div>
    )
  }

  return null
}
