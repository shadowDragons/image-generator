interface ShapeElementProps {
  shape: 'rectangle' | 'circle' | 'triangle'
  width: number
  height: number
  fillColor: string
  strokeColor: string
  strokeWidth: number
  borderRadius?: number
}

export function ShapeElement({ shape, width, height, fillColor, strokeColor, strokeWidth, borderRadius = 0 }: ShapeElementProps) {
  // Ensure all dimensions are positive
  const safeWidth = Math.max(1, width)
  const safeHeight = Math.max(1, height)
  const safeStrokeWidth = Math.max(0, Math.min(strokeWidth, Math.min(safeWidth, safeHeight) / 2))
  const safeBorderRadius = Math.max(0, borderRadius)

  if (shape === 'circle') {
    const diameter = Math.min(safeWidth, safeHeight)
    const radius = Math.max(0, (diameter - safeStrokeWidth) / 2)
    return (
      <svg width={safeWidth} height={safeHeight}>
        <ellipse
          cx={safeWidth / 2}
          cy={safeHeight / 2}
          rx={radius}
          ry={radius}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={safeStrokeWidth.toString()}
        />
      </svg>
    )
  }

  if (shape === 'triangle') {
    const offset = safeStrokeWidth / 2
    const points = `${safeWidth / 2},${offset} ${safeWidth - offset},${safeHeight - offset} ${offset},${safeHeight - offset}`
    return (
      <svg width={safeWidth} height={safeHeight}>
        <polygon points={points} fill={fillColor} stroke={strokeColor} strokeWidth={safeStrokeWidth.toString()} />
      </svg>
    )
  }

  // Rectangle
  const rectWidth = Math.max(0, safeWidth - safeStrokeWidth)
  const rectHeight = Math.max(0, safeHeight - safeStrokeWidth)
  return (
    <svg width={safeWidth} height={safeHeight}>
      <rect
        x={safeStrokeWidth / 2}
        y={safeStrokeWidth / 2}
        width={rectWidth}
        height={rectHeight}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={safeStrokeWidth.toString()}
        rx={safeBorderRadius}
        ry={safeBorderRadius}
      />
    </svg>
  )
}
