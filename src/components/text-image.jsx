/* global document */

import React from 'react'

const size = 30

const createImage = (text, fillColor) => {
  const family = 'sans-serif'
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.font = `${size}pt ${family}`
  canvas.width = ctx.measureText(text).width
  canvas.height = size * 1.5
  ctx.font = `${size}pt ${family}`
  ctx.textBaseline = 'top'
  ctx.fillStyle = fillColor
  ctx.fillText(text, 0, 0)
  return {
    href: canvas.toDataURL('image/png'),
    width: canvas.width,
    height: canvas.height,
  }
}

class TextImage extends React.Component {
  render () {
    const {text, fontSize, fill} = this.props
    const img = createImage(text, fill)
    const height = img.height * fontSize / size
    const width = img.width * fontSize / size
    return (
    <image
      xlinkHref={img.href}
      x={-width / 2}
      y={-height / 2}
      width={width}
      height={height}
      {...this.props}/>
    )
  }
}

export default TextImage
