// ... (previous types remain unchanged)

export type ElementAlignment = 'left' | 'center' | 'right' | 'custom'
export type VerticalAlignment = 'top' | 'middle' | 'bottom' | 'custom'

export interface Template {
  id: string
  name: string
  preview: string
  elements: CanvasElement[]
  background: EditorState['background']
  canvasSize: {
    aspectRatio: number
    width: number
  }
}

export interface EditorState {
  elements: CanvasElement[]
  background: {
    type: 'color' | 'gradient' | 'image'
    value: string
  }
  canvasSize: {
    aspectRatio: number
    width: number
  }
}

export interface GradientTemplate {
  name: string
  value: string
}

export interface IconPreset {
  name: string
  icon: React.ElementType
}

export interface CanvasSizePreset {
  id: string
  name: string
  platform: string
  aspectRatio: number
  icon: keyof typeof import('lucide-react')
}

// Update all element interfaces to include alignment
export interface BaseElement {
  id: string
  x: number
  y: number
  alignment?: ElementAlignment
  verticalAlignment?: VerticalAlignment
}

export interface TextElement extends BaseElement {
  type: 'text'
  content: string
  fontSize: number
  color: string
  fontFamily: string
  backgroundColor?: string
}

export interface ImageElement extends BaseElement {
  type: 'image'
  src: string
  width: number
  height: number
}

export interface IconElement extends BaseElement {
  type: 'icon'
  name: string
  size: number
  color: string
}

export interface ShapeElement extends BaseElement {
  type: 'shape'
  shape: 'rectangle' | 'circle' | 'triangle'
  width: number
  height: number
  fillColor: string
  strokeColor: string
  strokeWidth: number
  borderRadius?: number
}

export interface CodeElement extends BaseElement {
  type: 'code'
  content: string
  language: string
  width: number
  height: number
}

// Update CanvasElement type to include CodeElement
export type CanvasElement = TextElement | ImageElement | IconElement | ShapeElement | CodeElement
