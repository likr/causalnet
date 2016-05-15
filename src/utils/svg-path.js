const startFrom = (x, y) => {
  return `M${x} ${y}`
}

const lineTo = (x, y) => {
  return ` L${x} ${y}`
}

const curveTo = (x1, y1, x2, y2) => {
  const dx = x2 - x1,
    dy = y2 - y1,
    dx2 = dx / 2,
    dy2 = dy / 2,
    dx4 = dx / 4
  return ` q${dx4} 0,${dx2} ${dy2} q${dx4} ${dy2},${dx2} ${dy2}`
}

const svgPath = (points) => {
  const x0 = points[0][0],
    y0 = points[0][1],
    x1 = points[1][0],
    y1 = points[1][1]
  let d = startFrom(x0, y0) + lineTo(x1, y1)
  for (let i = 2; i < points.length; i += 2) {
    const [xi1, yi1] = points[i - 1], [xi2, yi2] = points[i], [xi3, yi3] = points[i + 1]
    d += curveTo(xi1, yi1, xi2, yi2) + lineTo(xi3, yi3)
  }
  return d
}

export default svgPath
