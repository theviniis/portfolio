import code from '@/assets/stickers/code.png'
import components from '@/assets/stickers/components.png'
import design from '@/assets/stickers/design.png'
import github from '@/assets/stickers/github.png'
import monitor from '@/assets/stickers/interface.png'
import quality from '@/assets/stickers/quality.png'

export type HeroStickerConfig = {
  id: string
  image: string
  position: readonly [number, number]
  rotation: number
  compact?: boolean
  entryOrder: number
}
// Unit-radius points on the existing halo: circle, inner tilted ellipse,
// and outer tilted ellipse. The halo geometry stays unchanged.
function orbitPoint(
  angle: number,
  radiusX = 1,
  radiusY = 1,
  tilt = 0
): readonly [number, number] {
  const a = (angle * Math.PI) / 180,
    r = (tilt * Math.PI) / 180
  const x = radiusX * Math.cos(a),
    y = radiusY * Math.sin(a)
  return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)]
}
export const heroStickers: HeroStickerConfig[] = [
  {
    id: 'code',
    image: code,
    position: orbitPoint(-150),
    rotation: -12,
    entryOrder: 0
  },
  {
    id: 'layers',
    image: components,
    position: orbitPoint(-30),
    rotation: -12,
    entryOrder: 2
  },
  {
    id: 'design',
    image: design,
    position: orbitPoint(140),
    rotation: -12,
    entryOrder: 1
  },
  {
    id: 'github',
    image: github,
    position: orbitPoint(25, 1.16, 1.16 * 0.65, 25),
    rotation: 12,
    entryOrder: 3
  },
  {
    id: 'monitor',
    image: monitor,
    position: orbitPoint(-125),
    rotation: 12,
    compact: true,
    entryOrder: 4
  },
  {
    id: 'check',
    image: quality,
    position: orbitPoint(70),
    rotation: -12,
    compact: true,
    entryOrder: 5
  }
]
