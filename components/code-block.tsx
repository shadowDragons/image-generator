'use client'

import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism-tomorrow.css'
import { useEffect, useRef } from 'react'

interface CodeBlockProps {
  code: string
  language: string
  width: number
  height: number
}

export function CodeBlock({ code, language, width, height }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  return (
    <div className='rounded-lg overflow-hidden bg-[#1e1e1e] text-white' style={{ width, height }}>
      {/* Window controls */}
      <div className='h-8 flex items-center gap-2 px-3 bg-[#2d2d2d]'>
        <div className='w-3 h-3 rounded-full bg-[#ff5f56]' />
        <div className='w-3 h-3 rounded-full bg-[#ffbd2e]' />
        <div className='w-3 h-3 rounded-full bg-[#27c93f]' />
      </div>

      {/* Code content */}
      <div className='p-4 overflow-auto' style={{ height: height - 32 }}>
        <pre className='!bg-transparent !p-0 !m-0'>
          <code ref={codeRef} className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
