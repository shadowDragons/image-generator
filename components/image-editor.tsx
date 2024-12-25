'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { templates } from '@/config/templates'
import html2canvas from 'html2canvas'
import * as Icons from 'lucide-react'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { CanvasElement, CanvasSizePreset, CodeElement, EditorState, GradientTemplate, IconElement, IconPreset, ShapeElement, Template } from '../types/editor'
import { Canvas } from './canvas'
import { CanvasSizePresets } from './canvas-size-presets'
import { ElementProperties } from './element-properties'
import { GradientTemplates } from './gradient-templates'
import { IconPresets } from './icon-presets'
import { TemplatePresets } from './template-presets'

export function ImageEditor() {
  const [editorState, setEditorState] = useState<EditorState>({
    elements: [],
    background: {
      type: 'gradient',
      value: 'linear-gradient(to bottom right, #1f1f1f, #4a1d96)',
    },
    canvasSize: {
      aspectRatio: 4 / 3,
      width: 800,
    },
  })
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
    )
  }, [])

  const addText = () => {
    const newText: CanvasElement = {
      id: nanoid(),
      type: 'text',
      content: 'Double tap to edit',
      x: 50,
      y: 50,
      fontSize: 24,
      color: '#ffffff',
      fontFamily: 'Inter',
    }
    setEditorState(prev => ({
      ...prev,
      elements: [...prev.elements, newText],
    }))
  }

  const addImage = async (file: File) => {
    const reader = new FileReader()
    reader.onload = e => {
      const newImage: CanvasElement = {
        id: nanoid(),
        type: 'image',
        src: e.target?.result as string,
        x: 50,
        y: 50,
        width: 200,
        height: 200,
      }
      setEditorState(prev => ({
        ...prev,
        elements: [...prev.elements, newImage],
      }))
    }
    reader.readAsDataURL(file)
  }

  const addIcon = (name: string) => {
    const newIcon: IconElement = {
      id: nanoid(),
      type: 'icon',
      name,
      x: 50,
      y: 50,
      size: 32,
      color: '#ffffff',
    }
    setEditorState(prev => ({
      ...prev,
      elements: [...prev.elements, newIcon],
    }))
  }

  const addShape = (shape: 'rectangle' | 'circle' | 'triangle') => {
    const newShape: ShapeElement = {
      id: nanoid(),
      type: 'shape',
      shape,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      strokeColor: '#ffffff',
      fillColor: '#000000',
      strokeWidth: 2,
      borderRadius: shape === 'rectangle' ? 0 : undefined,
    }
    setEditorState(prev => ({
      ...prev,
      elements: [...prev.elements, newShape],
    }))
  }

  const addCode = () => {
    const newCode: CodeElement = {
      id: nanoid(),
      type: 'code',
      content: 'const DATA = [\n  { id: 1, name: "test1" },\n  { id: 2, name: "test2" },\n  { id: 3, name: "test3" },\n  { id: 4, name: "test4" },\n]',
      language: 'javascript',
      x: 50,
      y: 50,
      width: 400,
      height: 300,
    }
    setEditorState(prev => ({
      ...prev,
      elements: [...prev.elements, newCode],
    }))
  }

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setEditorState(prev => ({
      ...prev,
      elements: prev.elements.map(el => (el.id === id ? ({ ...el, ...updates } as CanvasElement) : el)),
    }))
  }

  const debouncedUpdateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    requestAnimationFrame(() => {
      updateElement(id, updates)
    })
  }, [])

  const updateBackground = (type: 'color' | 'gradient' | 'image', value: string) => {
    setEditorState(prev => ({
      ...prev,
      background: { type, value },
    }))
  }

  const exportImage = async () => {
    if (!canvasRef.current) return

    // Add a small delay before export
    await new Promise(resolve => setTimeout(resolve, 500))

    // Wait for all images to load completely
    const images = canvasRef.current.getElementsByTagName('img')
    await Promise.all(
      Array.from(images).map(
        img =>
          new Promise(resolve => {
            if (img.complete) {
              resolve(undefined)
            } else {
              img.onload = () => resolve(undefined)
              img.onerror = () => resolve(undefined)
            }
          })
      )
    )

    const canvas = await html2canvas(canvasRef.current, {
      allowTaint: true,
      useCORS: true,
      backgroundColor: null,
      scale: 2,
      logging: false,
      imageTimeout: 0, // Remove timeout for image loading
      onclone: document => {
        // Ensure images are fully loaded in cloned document
        const clonedImages = document.getElementsByTagName('img')
        return Promise.all(
          Array.from(clonedImages).map(
            img =>
              new Promise(resolve => {
                if (img.complete) {
                  resolve(undefined)
                } else {
                  img.onload = () => resolve(undefined)
                  img.onerror = () => resolve(undefined)
                }
              })
          )
        )
      },
    })

    const link = document.createElement('a')
    link.download = 'my-design.png'
    link.href = canvas.toDataURL('image/png', 1.0)
    link.click()
  }

  const gradientTemplates: GradientTemplate[] = [
    { name: 'Purple to Blue', value: 'linear-gradient(to right, #4a1d96, #1e40af)' },
    { name: 'Green to Teal', value: 'linear-gradient(to right, #059669, #0d9488)' },
    { name: 'Orange to Red', value: 'linear-gradient(to right, #ea580c, #dc2626)' },
    { name: 'Pink to Purple', value: 'linear-gradient(to right, #db2777, #7c3aed)' },
    { name: 'Blue to Cyan', value: 'linear-gradient(to right, #2563eb, #06b6d4)' },
    { name: 'Yellow to Green', value: 'linear-gradient(to right, #ca8a04, #16a34a)' },
  ]

  const iconPresets: IconPreset[] = [
    { name: 'Heart', icon: Icons.Heart },
    { name: 'Star', icon: Icons.Star },
    { name: 'Sun', icon: Icons.Sun },
    { name: 'Moon', icon: Icons.Moon },
    { name: 'Cloud', icon: Icons.Cloud },
    { name: 'Lightning', icon: Icons.Zap },
    { name: 'Camera', icon: Icons.Camera },
    { name: 'Music', icon: Icons.Music },
  ]

  const applyTemplate = (template: Template) => {
    setEditorState({
      elements: template.elements,
      background: template.background,
      canvasSize: template.canvasSize,
    })
  }

  const canvasSizePresets: CanvasSizePreset[] = [
    {
      id: 'instagram-square',
      name: 'Square Post',
      platform: 'Instagram',
      aspectRatio: 1,
      icon: 'Instagram',
    },
    {
      id: 'instagram-story',
      name: 'Story',
      platform: 'Instagram',
      aspectRatio: 1,
      icon: 'Instagram',
    },
    {
      id: 'twitter-post',
      name: 'Post',
      platform: 'Twitter',
      aspectRatio: 1.777,
      icon: 'Twitter',
    },
    {
      id: 'bluesky-post',
      name: 'Post',
      platform: 'Bluesky',
      aspectRatio: 1.777,
      icon: 'Cloud',
    },
    {
      id: 'xiaohongshu-post',
      name: 'Post',
      platform: 'Xiaohongshu',
      aspectRatio: 0.75,
      icon: 'Image',
    },
    {
      id: 'reddit-post',
      name: 'Post',
      platform: 'Reddit',
      aspectRatio: 1.777,
      icon: 'Share2',
    },
  ]

  const updateCanvasSize = (aspectRatio: number) => {
    setEditorState(prev => ({
      ...prev,
      canvasSize: {
        aspectRatio,
        width: prev.canvasSize.width,
      },
    }))
  }

  const duplicateElement = (newElement: CanvasElement) => {
    setEditorState(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }))
  }

  const deleteElement = (id: string) => {
    setEditorState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id),
    }))
    setSelectedElement(null)
  }

  return (
    <DndProvider backend={isTouch ? TouchBackend : HTML5Backend}>
      <div className='min-h-screen bg-gray-900 text-white p-4 md:p-6'>
        <div className='mx-auto'>
          <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
            <div className='w-full space-y-4 md:space-y-6'>
              <Tabs defaultValue='add' className='w-full'>
                <TabsList className='w-full grid grid-cols-4 gap-1 p-1'>
                  <TabsTrigger value='add'>Add</TabsTrigger>
                  <TabsTrigger value='templates'>Templates</TabsTrigger>
                  <TabsTrigger value='background'>Background</TabsTrigger>
                  <TabsTrigger value='canvas'>Canvas</TabsTrigger>
                </TabsList>
                <TabsContent value='add' className='space-y-4'>
                  <Button onClick={addText} className='w-full'>
                    Add Text
                  </Button>
                  <Button onClick={addCode} className='w-full'>
                    Add Code Block
                  </Button>
                  <div>
                    <Label htmlFor='image-upload'>Upload Image</Label>
                    <Input
                      id='image-upload'
                      type='file'
                      accept='image/*'
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) addImage(file)
                      }}
                      className='mt-2'
                    />
                  </div>
                  <div>
                    <Label>Add Icon</Label>
                    <IconPresets presets={iconPresets} onSelect={addIcon} />
                  </div>
                  <div>
                    <Label>Add Shape</Label>
                    <div className='grid grid-cols-3 gap-2 mt-2'>
                      <Button onClick={() => addShape('rectangle')}>Rectangle</Button>
                      <Button onClick={() => addShape('circle')}>Circle</Button>
                      <Button onClick={() => addShape('triangle')}>Triangle</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value='templates' className='space-y-4'>
                  <div>
                    <Label>Templates</Label>
                    <TemplatePresets templates={templates} onSelect={applyTemplate} />
                  </div>
                </TabsContent>
                <TabsContent value='background' className='space-y-4'>
                  <div>
                    <Label>Background Color</Label>
                    <Input type='color' onChange={e => updateBackground('color', e.target.value)} className='w-full mt-2' />
                  </div>
                  <div>
                    <Label>Background Gradient</Label>
                    <GradientTemplates templates={gradientTemplates} onSelect={value => updateBackground('gradient', value)} />
                  </div>
                  <div>
                    <Label>Background Image</Label>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = e => {
                            updateBackground('image', e.target?.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className='mt-2'
                    />
                  </div>
                </TabsContent>
                <TabsContent value='canvas' className='space-y-4'>
                  <div>
                    <Label>Canvas Size</Label>
                    <CanvasSizePresets presets={canvasSizePresets} currentAspectRatio={editorState.canvasSize.aspectRatio} onSelect={updateCanvasSize} />
                  </div>
                  <div className='space-y-4'>
                    <div>
                      <Label>Custom Aspect Ratio</Label>
                      <div className='flex items-center gap-2'>
                        <Input
                          type='number'
                          value={editorState.canvasSize.aspectRatio}
                          onChange={e => {
                            const ratio = parseFloat(e.target.value)
                            if (ratio > 0) {
                              updateCanvasSize(ratio)
                            }
                          }}
                          step={0.1}
                          min={0.1}
                          className='mt-2'
                        />
                        <span className='mt-2'>(width/height)</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              {selectedElement && (
                <ElementProperties
                  element={editorState.elements.find(el => el.id === selectedElement) || null}
                  onUpdate={updates => {
                    if (selectedElement) {
                      updateElement(selectedElement, updates)
                    }
                  }}
                />
              )}
            </div>
            <div className='flex-1'>
              <div className='bg-gray-800 p-4 md:p-8 rounded-lg overflow-auto'>
                <Canvas
                  ref={canvasRef}
                  state={editorState}
                  onElementSelect={setSelectedElement}
                  onElementUpdate={debouncedUpdateElement}
                  onElementDuplicate={duplicateElement}
                  onElementDelete={deleteElement}
                />
              </div>
              <div className='mt-4 flex justify-end'>
                <Button onClick={exportImage}>Export as PNG</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
