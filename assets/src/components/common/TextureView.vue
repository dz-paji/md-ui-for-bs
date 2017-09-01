<template>
  <div>
    <div
      class="el-center"
      :style="bgStyle"
      ref="previewer"
      @mousewheel="zoomModel"
    ></div>
    <div class="el-center controls">
      <button
        class="primary"
        @click="toggleWalking"
        :title="$trans('general.walk')"
      >
        <i v-if="isPaused">play_arrow</i>
        <i v-else>pause</i>
      </button>
      <button
        class="primary"
        @click="toggleFastWalking"
        :title="$trans('general.fastWalk')"
      ><i>av_timer</i></button>
      <button
        class="primary"
        @click="toggleRunning"
        :title="$trans('general.run')"
      ><i>fast_forward</i></button>
      <button
        class="primary"
        @click="toggleExpandArms"
        :title="$trans('general.expandArms')"
      ><i>accessibility</i></button>
      <button
        class="primary"
        @click="toggleRotation"
        :title="$trans('general.rotation')"
      ><i>replay</i></button>
      <button
        class="primary"
        @click="prevBackground"
        :title="$trans('general.prevBackground')"
      ><i>skip_previous</i></button>
      <button
        class="primary"
        @click="nextBackground"
        :title="$trans('general.nextBackground')"
      ><i>skip_next</i></button>
    </div>
  </div>
</template>

<script>
// Three.js@R49  DO NOT change the version of Three.js
import THREE from 'src/external/three.min'
import defaultSkin from 'assets/steve.png'

import bg0 from 'assets/backgrounds/bg0.png'
import bg1 from 'assets/backgrounds/bg1.png'
import bg2 from 'assets/backgrounds/bg2.png'
import bg3 from 'assets/backgrounds/bg3.png'
import bg4 from 'assets/backgrounds/bg4.png'
import bg5 from 'assets/backgrounds/bg5.png'
import bg6 from 'assets/backgrounds/bg6.png'
import bg7 from 'assets/backgrounds/bg7.png'
import bg8 from 'assets/backgrounds/bg8.png'
import bg9 from 'assets/backgrounds/bg9.png'
import bg10 from 'assets/backgrounds/bg10.png'
import bg11 from 'assets/backgrounds/bg11.png'
import bg12 from 'assets/backgrounds/bg12.png'
import bg13 from 'assets/backgrounds/bg13.png'
import bg14 from 'assets/backgrounds/bg14.png'
import bg15 from 'assets/backgrounds/bg15.png'
import bg16 from 'assets/backgrounds/bg16.png'
import bg17 from 'assets/backgrounds/bg17.png'
import bg18 from 'assets/backgrounds/bg18.png'
import bg19 from 'assets/backgrounds/bg19.png'
import bg20 from 'assets/backgrounds/bg20.png'

const bgs = {
  bg0,
  bg1,
  bg2,
  bg3,
  bg4,
  bg5,
  bg6,
  bg7,
  bg8,
  bg9,
  bg10,
  bg11,
  bg12,
  bg13,
  bg14,
  bg15,
  bg16,
  bg17,
  bg18,
  bg19,
  bg20
}

export default {
  props: {
    skin: {
      type: String,
      default: defaultSkin
    },
    cape: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 350
    },
    height: {
      type: Number,
      default: 350
    }
  },
  data () {
    return {
      isRotating: true,
      isPaused: false,
      isFastWalking: false,
      isYfreezed: false,
      isExpandArms: false,
      isFunnyRunning: false,
      isMouseOver: false,
      isMouseDown: false,
      counter: 0,
      firstRender: true,
      startTime: Date.now(),
      pausedTime: 0,
      oldRad: 0,
      zoom: 70,
      skinImage: new Image(),
      capeImage: new Image(),
      bg: 2
    }
  },
  computed: {
    bgStyle () {
      return {
        'background-image': `url(${bgs['bg' + this.bg]})`,
        'background-position': 'center',
        'background-repeat': 'no-repeat'
      }
    }
  },
  methods: {
    zoomModel ({ wheelDeltaY }) {
      if (
        (this.zoom > 30 && wheelDeltaY > 0) ||
        (this.zoom < 150 && wheelDeltaY < 0)
      ) {
        this.zoom -= wheelDeltaY / 120 * 2
      }
    },
    clear () {
      this.skinImage.src = defaultSkin
      this.capeImage.src = ''
    },
    toggleWalking () {
      this.isRotating = !this.isRotating
      this.isPaused = !this.isPaused
      if (this.isPaused) {
        this.pausedTime = Date.now() - this.startTime
      } else {
        this.startTime = Date.now() - this.pausedTime
      }
    },
    toggleFastWalking () {
      this.isFastWalking = !this.isFastWalking
    },
    toggleRunning () {
      this.isFunnyRunning = !this.isFunnyRunning
    },
    toggleExpandArms () {
      this.isExpandArms = !this.isExpandArms
    },
    toggleRotation () {
      this.isRotating = !this.isRotating
    },
    prevBackground () {
      if (this.bg === 0) {
        this.bg = 20
      } else {
        this.bg--
      }
    },
    nextBackground () {
      if (this.bg === 20) {
        this.bg = 0
      } else {
        this.bg++
      }
    }
  },
  mounted () {
    const requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
          setTimeout(callback, 1000 / 60)
        }

    let container = this.$refs.previewer

    let supportWebGL = !!WebGLRenderingContext &&
      (!!document.createElement('canvas').getContext('experimental-webgl') ||
      !!document.createElement('canvas').getContext('webgl'))

    // Width and height
    let cw = this.width, ch = this.height
    let tileUvWidth = 1 / 64
    let tileUvHeight = 1 / 32

    // Init <canvas>
    let skinBig = document.createElement('canvas')
    let sbc = skinBig.getContext('2d')
    let sizeRatio = 8
    skinBig.width = 64 * sizeRatio
    skinBig.height = 32 * sizeRatio

    let skincanvas = document.createElement('canvas')
    let skinc = skincanvas.getContext('2d')
    skincanvas.width = 64
    skincanvas.height = 32
    let capecanvas = document.createElement('canvas')
    let capec = capecanvas.getContext('2d')
    capecanvas.width = 64
    capecanvas.height = 32

    // You can change these value via external interface
    this.isRotating = true
    this.isPaused = false
    this.isYfreezed = false
    this.isFunnyRunning = false

    let getMaterial = function (img, trans) {
      let material = new THREE.MeshBasicMaterial({
        map: new THREE.Texture(
          img,
          new THREE.UVMapping(),
          THREE.ClampToEdgeWrapping,
          THREE.ClampToEdgeWrapping,
          THREE.NearestFilter,
          THREE.NearestFilter,
          (trans ? THREE.RGBAFormat : THREE.RGBFormat)
        ),
        transparent: trans
      })
      material.map.needsUpdate = true
      return material
    }
    let uvmap = function (mesh, face, x, y, w, h, rotateBy) {
      if (!rotateBy) rotateBy = 0
      let uvs = mesh.geometry.faceVertexUvs[0][face]
      let tileU = x
      let tileV = y

      uvs[(0 + rotateBy) % 4].u = tileU * tileUvWidth
      uvs[(0 + rotateBy) % 4].v = tileV * tileUvHeight
      uvs[(1 + rotateBy) % 4].u = tileU * tileUvWidth
      uvs[(1 + rotateBy) % 4].v = tileV * tileUvHeight + h * tileUvHeight
      uvs[(2 + rotateBy) % 4].u = tileU * tileUvWidth + w * tileUvWidth
      uvs[(2 + rotateBy) % 4].v = tileV * tileUvHeight + h * tileUvHeight
      uvs[(3 + rotateBy) % 4].u = tileU * tileUvWidth + w * tileUvWidth
      uvs[(3 + rotateBy) % 4].v = tileV * tileUvHeight
    }
    let cubeFromPlanes = function (size, mat) {
      let cube = new THREE.Object3D()
      let meshes = []
      for (let i = 0; i < 6; i++) {
        let mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat)
        mesh.doubleSided = true
        cube.add(mesh)
        meshes.push(mesh)
      }
      // Front
      meshes[0].rotation.x = Math.PI / 2
      meshes[0].rotation.z = -Math.PI / 2
      meshes[0].position.x = size / 2

      // Back
      meshes[1].rotation.x = Math.PI / 2
      meshes[1].rotation.z = Math.PI / 2
      meshes[1].position.x = -size / 2

      // Top
      meshes[2].position.y = size / 2

      // Bottom
      meshes[3].rotation.y = Math.PI
      meshes[3].rotation.z = Math.PI
      meshes[3].position.y = -size / 2

      // Left
      meshes[4].rotation.x = Math.PI / 2
      meshes[4].position.z = size / 2

      // Right
      meshes[5].rotation.x = -Math.PI / 2
      meshes[5].rotation.y = Math.PI
      meshes[5].position.z = -size / 2

      return cube
    }

    let charMaterial = getMaterial(skincanvas, false)
    let charMaterialTrans = getMaterial(skincanvas, true)
    let capeMaterial = getMaterial(capecanvas, false)

    let camera = new THREE.PerspectiveCamera(35, cw / ch, 1, 1000)
    camera.position.z = 50
    // camera.target.position.y = -2
    let scene = new THREE.Scene()
    scene.add(camera)

    let headgroup = new THREE.Object3D()
    let upperbody = new THREE.Object3D()

    // Light
    let pointLightA = new THREE.DirectionalLight(0xFFFFFF, 1)
    let pointLightB = new THREE.DirectionalLight(0x666666, 1)
    let environmentalLight = new THREE.AmbientLight(0x555555)
    pointLightA.position.set(100, 120, 80)
    pointLightB.position.set(-100, -40, -80)
    scene.add(pointLightA)
    scene.add(pointLightB)
    scene.add(environmentalLight)

    // Left leg
    let leftleggeo = new THREE.CubeGeometry(4, 12, 4)
    for (let i = 0; i < 8; i++) {
      leftleggeo.vertices[i].y -= 6
    }
    let leftleg = new THREE.Mesh(leftleggeo, charMaterial)
    leftleg.position.z = -2
    leftleg.position.y = -6
    uvmap(leftleg, 0, 8, 20, -4, 12)
    uvmap(leftleg, 1, 16, 20, -4, 12)
    uvmap(leftleg, 2, 4, 16, 4, 4, 3)
    uvmap(leftleg, 3, 8, 20, 4, -4, 1)
    uvmap(leftleg, 4, 12, 20, -4, 12)
    uvmap(leftleg, 5, 4, 20, -4, 12)

    // Right leg
    let rightleggeo = new THREE.CubeGeometry(4, 12, 4)
    for (let i = 0; i < 8; i++) {
      rightleggeo.vertices[i].y -= 6
    }
    let rightleg = new THREE.Mesh(rightleggeo, charMaterial)
    rightleg.position.z = 2
    rightleg.position.y = -6
    uvmap(rightleg, 0, 4, 20, 4, 12)
    uvmap(rightleg, 1, 12, 20, 4, 12)
    uvmap(rightleg, 2, 8, 16, -4, 4, 3)
    uvmap(rightleg, 3, 12, 20, -4, -4, 1)
    uvmap(rightleg, 4, 0, 20, 4, 12)
    uvmap(rightleg, 5, 8, 20, 4, 12)

    // Body
    let bodygeo = new THREE.CubeGeometry(4, 12, 8)
    let bodymesh = new THREE.Mesh(bodygeo, charMaterial)
    uvmap(bodymesh, 0, 20, 20, 8, 12)
    uvmap(bodymesh, 1, 32, 20, 8, 12)
    uvmap(bodymesh, 2, 20, 16, 8, 4, 1)
    uvmap(bodymesh, 3, 28, 16, 8, 4, 3)
    uvmap(bodymesh, 4, 16, 20, 4, 12)
    uvmap(bodymesh, 5, 28, 20, 4, 12)
    upperbody.add(bodymesh)

    // Left arm
    let leftarmgeo = new THREE.CubeGeometry(4, 12, 4)
    for (let i = 0; i < 8; i++) {
      leftarmgeo.vertices[i].y -= 4
    }
    let leftarm = new THREE.Mesh(leftarmgeo, charMaterial)
    leftarm.position.z = -6
    leftarm.position.y = 4
    leftarm.rotation.x = Math.PI / 32
    uvmap(leftarm, 0, 48, 20, -4, 12)
    uvmap(leftarm, 1, 56, 20, -4, 12)
    uvmap(leftarm, 2, 48, 16, -4, 4, 1)
    uvmap(leftarm, 3, 52, 16, -4, 4, 3)
    uvmap(leftarm, 4, 52, 20, -4, 12)
    uvmap(leftarm, 5, 44, 20, -4, 12)
    upperbody.add(leftarm)

    // Right arm
    let rightarmgeo = new THREE.CubeGeometry(4, 12, 4)
    for (let i = 0; i < 8; i++) {
      rightarmgeo.vertices[i].y -= 4
    }
    let rightarm = new THREE.Mesh(rightarmgeo, charMaterial)
    rightarm.position.z = 6
    rightarm.position.y = 4
    rightarm.rotation.x = -Math.PI / 32
    uvmap(rightarm, 0, 44, 20, 4, 12)
    uvmap(rightarm, 1, 52, 20, 4, 12)
    uvmap(rightarm, 2, 44, 16, 4, 4, 1)
    uvmap(rightarm, 3, 48, 16, 4, 4, 3)
    uvmap(rightarm, 4, 40, 20, 4, 12)
    uvmap(rightarm, 5, 48, 20, 4, 12)
    upperbody.add(rightarm)

    // Head
    let headgeo = new THREE.CubeGeometry(8, 8, 8)
    let headmesh = new THREE.Mesh(headgeo, charMaterial)
    headmesh.position.y = 2
    uvmap(headmesh, 0, 8, 8, 8, 8)
    uvmap(headmesh, 1, 24, 8, 8, 8)

    uvmap(headmesh, 2, 8, 0, 8, 8, 1)
    uvmap(headmesh, 3, 16, 0, 8, 8, 1)

    uvmap(headmesh, 4, 0, 8, 8, 8)
    uvmap(headmesh, 5, 16, 8, 8, 8)
    headgroup.add(headmesh)

    // Helmet/hat
    let helmetgeo = new THREE.CubeGeometry(9, 9, 9)
    let helmetmesh = new THREE.Mesh(helmetgeo, charMaterialTrans)
    helmetmesh.doubleSided = true
    helmetmesh.position.y = 2
    uvmap(helmetmesh, 0, 32 + 8, 8, 8, 8)
    uvmap(helmetmesh, 1, 32 + 24, 8, 8, 8)

    uvmap(helmetmesh, 2, 32 + 8, 0, 8, 8, 1)
    uvmap(helmetmesh, 3, 32 + 16, 0, 8, 8, 3)

    uvmap(helmetmesh, 4, 32 + 0, 8, 8, 8)
    uvmap(helmetmesh, 5, 32 + 16, 8, 8, 8)
    headgroup.add(helmetmesh)

    let helmet = cubeFromPlanes(9, charMaterialTrans)
    helmet.position.y = 2
    uvmap(helmet.children[0], 0, 32 + 8, 8, 8, 8)
    uvmap(helmet.children[1], 0, 32 + 24, 8, 8, 8)
    uvmap(helmet.children[2], 0, 32 + 8, 0, 8, 8, 1)
    uvmap(helmet.children[3], 0, 32 + 16, 0, 8, 8, 3)
    uvmap(helmet.children[4], 0, 32 + 0, 8, 8, 8)
    uvmap(helmet.children[5], 0, 32 + 16, 8, 8, 8)

    headgroup.add(helmet)

    /* ===== Ears Start （作者的彩蛋，没啥卵用） ===== */
    let ears = new THREE.Object3D()

    let eargeo = new THREE.CubeGeometry(1, (9 / 8) * 6, (9 / 8) * 6)
    let leftear = new THREE.Mesh(eargeo, charMaterial)
    let rightear = new THREE.Mesh(eargeo, charMaterial)

    leftear.position.y = 2 + (9 / 8) * 5
    rightear.position.y = 2 + (9 / 8) * 5
    leftear.position.z = -(9 / 8) * 5
    rightear.position.z = (9 / 8) * 5

    // Right ear share same geometry, same uv-maps
    uvmap(leftear, 0, 25, 1, 6, 6) // Front side
    uvmap(leftear, 1, 32, 1, 6, 6) // Back side

    uvmap(leftear, 2, 25, 0, 6, 1, 1) // Top edge
    uvmap(leftear, 3, 31, 0, 6, 1, 1) // Bottom edge

    uvmap(leftear, 4, 24, 1, 1, 6) // Left edge
    uvmap(leftear, 5, 31, 1, 1, 6) // Right edge

    ears.add(leftear)
    ears.add(rightear)

    leftear.visible = rightear.visible = false

    headgroup.add(ears)
    headgroup.position.y = 8
    /* ================ Ears End ================== */

    // Init cape
    let capeOrigo = new THREE.Object3D()
    let capegeo = new THREE.CubeGeometry(1, 16, 10)
    let capemesh = new THREE.Mesh(capegeo, capeMaterial)
    capemesh.position.y = -8
    capemesh.visible = false

    uvmap(capemesh, 0, 1, 1, 10, 16) // Front side
    uvmap(capemesh, 1, 12, 1, 10, 16) // Back side

    uvmap(capemesh, 2, 1, 0, 10, 1) // Top edge
    uvmap(capemesh, 3, 11, 0, 10, 1, 1) // Bottom edge

    uvmap(capemesh, 4, 0, 1, 1, 16) // Left edge
    uvmap(capemesh, 5, 11, 1, 1, 16) // Right edge

    capeOrigo.rotation.y = Math.PI

    capeOrigo.position.x = -2
    capeOrigo.position.y = 6

    capeOrigo.add(capemesh)

    let playerModel = new THREE.Object3D()

    playerModel.add(leftleg)
    playerModel.add(rightleg)

    playerModel.add(upperbody)
    playerModel.add(headgroup)

    playerModel.add(capeOrigo)

    playerModel.position.y = 6

    let playerGroup = new THREE.Object3D()

    playerGroup.add(playerModel)

    scene.add(playerGroup)

    let mouseX = 0
    let mouseY = 0.1
    let originMouseX = 0
    let originMouseY = 0

    let rad = 0

    this.isMouseOver = false
    this.isMouseDown = false

    this.counter = 0
    this.firstRender = true

    this.startTime = Date.now()
    this.pausedTime = 0

    let render = () => {
      requestAnimFrame(render, renderer.domElement)
      this.oldRad = rad

      let time = (Date.now() - this.startTime) / 1000

      if (!this.isMouseDown) {
        // mouseX *= 0.95
        if (!this.isYfreezed) {
          // mouseY *= 0.97
        }
        if (this.isRotating) {
          rad += 2
        }
      } else {
        rad = mouseX
      }
      if (mouseY > 500) {
        mouseY = 500
      } else if (mouseY < -500) {
        mouseY = -500
      }
      camera.position.x = -Math.cos(rad / (cw / 2) + (Math.PI / 0.9))
      camera.position.z = -Math.sin(rad / (cw / 2) + (Math.PI / 0.9))
      camera.position.y = (mouseY / (ch / 2)) * 1.5 + 0.2
      camera.position.setLength(this.zoom)
      camera.lookAt(new THREE.Vector3(0, 1.5, 0))

      if (!this.isPaused) {
        this.counter += 0.01
        headgroup.rotation.y = Math.sin(time * 1.5) / 5
        headgroup.rotation.z = Math.sin(time) / 6

        if (this.isFunnyRunning) {
          rightarm.rotation.z = 2 * Math.cos(0.6662 * time * 10 + Math.PI)
          rightarm.rotation.x = 1 * (Math.cos(0.2812 * time * 10) - 1)
          leftarm.rotation.z = 2 * Math.cos(0.6662 * time * 10)
          leftarm.rotation.x = 1 * (Math.cos(0.2312 * time * 10) + 1)

          rightleg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10)
          leftleg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10 + Math.PI)

          playerGroup.position.y =
            -6 + 1 * Math.cos(0.6662 * time * 10 * 2) // Jumping
          playerGroup.position.z =  // Dodging when running
            0.15 * Math.cos(0.6662 * time * 10)
          playerGroup.rotation.x =  // Slightly tilting when running
            0.01 * Math.cos(0.6662 * time * 10 + Math.PI)

          capeOrigo.rotation.z =
            0.1 * Math.sin(0.6662 * time * 10 * 2) + Math.PI / 2.5
        } else {
          const speed = this.isFastWalking ? 5 : 1

          if (this.isExpandArms) {
            leftarm.rotation.x = Math.PI / 2
            leftarm.rotation.y = 0
            leftarm.rotation.z = 0
            rightarm.rotation.x = -Math.PI / 2
            rightarm.rotation.y = 0
            rightarm.rotation.z = 0
          } else {
            leftarm.rotation.z = -Math.sin(time * 3 * speed) / 2
            leftarm.rotation.x = (Math.cos(time * 3 * speed) + Math.PI / 2) / 30
            rightarm.rotation.z = Math.sin(time * 3 * speed) / 2
            rightarm.rotation.x =
              -(Math.cos(time * 3 * speed) + Math.PI / 2) / 30
          }

          leftleg.rotation.z = Math.sin(time * 3 * speed) / 3
          rightleg.rotation.z = -Math.sin(time * 3 * speed) / 3
          capeOrigo.rotation.z = Math.sin(time * 2) / 15 + Math.PI / 15

          playerGroup.position.y = -6 // Not jumping
        }
      }

      renderer.render(scene, camera)
    }
    let renderer
    if (supportWebGL) {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        precision: 'highp'
      })
    } else {
      renderer = new THREE.CanvasRenderer({ antialias: true })
    }
    let threecanvas = renderer.domElement
    renderer.setSize(cw, ch)
    // renderer.setClearColorHex(0x000000, 0.25)

    container.appendChild(threecanvas)

    let onMouseMove = e => {
      if (this.isMouseDown) {
        mouseX = (e.pageX - threecanvas.offsetLeft - originMouseX)
        mouseY = (e.pageY - threecanvas.offsetTop - originMouseY)
      }
    }

    threecanvas.addEventListener('mousedown', e => {
      e.preventDefault()
      originMouseX = (e.pageX - threecanvas.offsetLeft) - rad
      originMouseY = (e.pageY - threecanvas.offsetTop) - mouseY
      this.isMouseDown = true
      this.isMouseOver = true
      onMouseMove(e)
    }, false)
    window.addEventListener('mouseup', e => {
      this.isMouseDown = false
    }, false)
    window.addEventListener('mousemove', onMouseMove, false)
    threecanvas.addEventListener('mouseout', e => {
      this.isMouseOver = false
    }, false)

    // container.appendChild(skinBig)

    /* ============================================================ */

    // 默认开始渲染的地方
    render()

    this.skinImage.src = this.skin || defaultSkin
    this.$watch('skin', function (url) {
      this.skinImage.src = url || defaultSkin
    })

    this.skinImage.onload = () => {
      /* 高清皮肤支持 */
      skincanvas.width = this.skinImage.width
      skincanvas.height = this.skinImage.width / 2

      skinc.clearRect(0, 0, skincanvas.width, skincanvas.height)

      // DEBUG
      // console.log(skin.width + " " + skin.height)

      if (this.skinImage.width === this.skinImage.height) {
        let ratio = this.skinImage.width / 64
        skinc.drawImage(
          this.skinImage,
          0 * ratio,
          0 * ratio,
          64 * ratio,
          32 * ratio,
          0 * ratio,
          0 * ratio,
          64 * ratio,
          32 * ratio
        )
        skinc.drawImage(
          this.skinImage,
          0 * ratio,
          32 * ratio,
          64 * ratio,
          16 * ratio,
          0 * ratio,
          16 * ratio,
          64 * ratio,
          16 * ratio
        )
      } else {
        skinc.drawImage(this.skinImage, 0, 0)
      }

      let imgdata = skinc.getImageData(
        0,
        0,
        skincanvas.width,
        skincanvas.height
      )
      let pixels = imgdata.data

      sbc.clearRect(0, 0, skinBig.width, skinBig.height)
      sbc.save()

      let isOnecolor = true

      let colorCheckAgainst = [40, 0]
      let colorIndex = (colorCheckAgainst[0] + colorCheckAgainst[1] * 64) * 4

      let isPixelDifferent = function (x, y) {
        if (pixels[(x + y * 64) * 4 + 0] !== pixels[colorIndex + 0] ||
          pixels[(x + y * 64) * 4 + 1] !== pixels[colorIndex + 1] ||
          pixels[(x + y * 64) * 4 + 2] !== pixels[colorIndex + 2] ||
          pixels[(x + y * 64) * 4 + 3] !== pixels[colorIndex + 3]) {
          return true
        }
        return false
      }

      // Check if helmet/hat is a solid color
      // Bottom row
      for (let i = 32; i < 64; i++) {
        for (let j = 8; j < 16; j++) {
          if (isPixelDifferent(i, j)) {
            isOnecolor = false
            break
          }
        }
        if (!isOnecolor) {
          break
        }
      }
      if (!isOnecolor) {
        // Top row
        for (let i = 40; i < 56; i++) {
          for (let j = 0; j < 8; j++) {
            if (isPixelDifferent(i, j)) {
              isOnecolor = false
              break
            }
          }
          if (!isOnecolor) {
            break
          }
        }
      }

      for (let i = 0; i < 64; i++) {
        for (let j = 0; j < 32; j++) {
          if (isOnecolor &&
            ((i >= 32 && i < 64 && j >= 8 && j < 16) ||
            (i >= 40 && i < 56 && j >= 0 && j < 8))) {
            pixels[(i + j * 64) * 4 + 3] = 0
          }
          sbc.fillStyle = 'rgba(' +
            pixels[(i + j * 64) * 4 + 0] +
            ', ' +
            pixels[(i + j * 64) * 4 + 1] +
            ', ' +
            pixels[(i + j * 64) * 4 + 2] +
            ', ' +
            pixels[(i + j * 64) * 4 + 3] / 255 +
            ')'
          sbc.fillRect(i * sizeRatio, j * sizeRatio, sizeRatio, sizeRatio)
        }
      }
      sbc.restore()

      skinc.putImageData(imgdata, 0, 0)

      charMaterial.map.needsUpdate = true
      charMaterialTrans.map.needsUpdate = true
    }

    this.capeImage.src = this.cape
    this.$watch('cape', function (url) {
      this.capeImage.src = url
    })

    this.capeImage.onload = () => {
      /* 高清披风支持 */
      capecanvas.width = this.capeImage.width
      capecanvas.height = this.capeImage.height

      capec.clearRect(0, 0, 64, 32)

      capec.drawImage(this.capeImage, 0, 0)

      capeMaterial.map.needsUpdate = true
      capemesh.visible = true
    }
    this.capeImage.onerror = () => {
      capemesh.visible = false
    }

    threecanvas.addEventListener('dragenter', function (e) {
      e.stopPropagation()
      e.preventDefault()
    }, false)
    threecanvas.addEventListener('dragleave', function (e) {
      e.stopPropagation()
      e.preventDefault()
    }, false)
    threecanvas.addEventListener('dragover', function (e) {
      e.stopPropagation()
      e.preventDefault()
    }, false)
    threecanvas.addEventListener('drop', function (e) {
      e.stopPropagation()
      e.preventDefault()
    }, false)
  }
}
</script>

<style lang="stylus" scoped>
.el-center
  text-align center

.controls
  margin-top 10px
</style>
