import * as THREE from 'three'
import { three } from './core/Three'
import fragmentShader from './shader/points.fs'
import vertexShader from './shader/points.vs'

export class Canvas {
  private points!: THREE.Points<THREE.BufferGeometry, THREE.RawShaderMaterial>

  constructor(canvas: HTMLCanvasElement) {
    this.loadTexture().then((texture) => {
      this.init(canvas)
      this.points = this.createPoints(texture)
      this.addEvents()
      three.animation(this.anime)
    })
  }

  private async loadTexture() {
    const loader = new THREE.TextureLoader()
    loader.setPath(import.meta.env.BASE_URL + 'textures/')
    const texture = await loader.loadAsync('01.jpg')
    return texture
  }

  private init(canvas: HTMLCanvasElement) {
    three.setup(canvas)
    three.scene.background = new THREE.Color('#000')
  }

  private createPoints(texture: THREE.Texture) {
    const geometry = new THREE.BufferGeometry()

    const positions: number[] = []

    const pos = 0.02
    const amount = 100
    const offset = (amount - 1) * pos * 0.5

    for (let x = 0; x < amount; x++) {
      for (let y = 0; y < amount; y++) {
        positions.push(x * pos - offset, y * pos - offset, 0)
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

    const material = new THREE.RawShaderMaterial({
      uniforms: {
        uPointSize: { value: this.calcPointSize() },
        tNum: { value: texture },
        uTime: { value: 0 },
        uDebug: { value: false },
      },
      vertexShader,
      fragmentShader,
    })
    const mesh = new THREE.Points(geometry, material)
    three.scene.add(mesh)

    return mesh
  }

  private calcPointSize() {
    return 25 * (three.size.height / 1000)
  }

  private addEvents() {
    three.addEventListener('resize', () => {
      this.points.material.uniforms.uPointSize.value = this.calcPointSize()
    })
  }

  private anime = () => {
    this.points.material.uniforms.uTime.value += three.time.delta
    three.render()
  }

  dispose() {
    three.dispose()
  }
}
