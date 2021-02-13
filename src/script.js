import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'




import vertexShader1 from './shaders/one/vertex.glsl'
import fragmentShader1 from './shaders/one/fragment.glsl'


/**
 * Base
 */
// Debug

let color = 0
//Texture
const canvasTexture = document.getElementById('texture')
if(canvasTexture){
const artDystopiaFont = new FontFace('ArtDystopia', 'url(/assets/fonts/ArtDystopia.otf)')



artDystopiaFont.load().then(function(loaded_face) {
    // use font here
    document.fonts.add(loaded_face)
    console.log(document.fonts)
    var ctx = canvasTexture.getContext('2d')
    ctx.font = '40px ArtDystopia'
    var gradient = ctx.createLinearGradient(0, 0, 300, 0)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.45)')
    gradient.addColorStop(0.19, 'rgba(173, 12, 12, 0.45)')
    gradient.addColorStop(0.81, 'rgba(173, 12, 12, 0.45)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.45)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = '#4AF626'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    canvasTexture.style.letterSpacing = '2px'

    ctx.fillText("THE SKY ABOVE THE PORT", 200, 100)
    console.log('hiys')
    texture = new THREE.CanvasTexture(canvasTexture)
    const mesh = new THREE.Mesh(geometry, material)




    scene.add( mesh)
}).catch(function(error) {

});

}
var texture = new THREE.CanvasTexture(canvasTexture)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color( 0xffffff );

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
//const texture = textureLoader.load('./textures/texture.png')

/**
 * Test mesh
 */
// Geometry
// const geometry =  new THREE.TorusGeometry( 2, 1, 16, 100 )

const geometry =  new THREE.TorusGeometry( 1, 12, 16, 100 )


// Material
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader1,
  fragmentShader: fragmentShader1,
  transparent: false,
  depthWrite: true,
  clipShadows: true,
  uniforms: {
    uFrequency: {
      value: new THREE.Vector2(10, 5)
    },
    uTime: {
      value: 0
    },
    uColor: {
      value: new THREE.Color('orange')
    },
    uTexture: {
      value: texture
    },
    uMouse: {
      value: {x: 0.5, y: 0.5}
    }
  }
})





window.addEventListener('mousemove', function (e) {
  material.uniforms.uMouse.value.x =  (e.clientX / window.innerWidth) * 2 - 1
  material.uniforms.uMouse.value.y = -(event.clientY / window.innerHeight) * 2 + 1

})

// Mesh


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.25, - 0.25, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.localClippingEnabled = true
renderer.globalClippingEnabled = true

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>{
  const elapsedTime = clock.getElapsedTime()

  //Update Material
  material.uniforms.uTime.value = elapsedTime


  //mesh.rotation.z +=0.01
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)



  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
