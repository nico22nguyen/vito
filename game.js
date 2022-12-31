/** 
 * TODO:
 * - add score at top of screen (increments after reaching top of level)
 * - add portal on the top platform (end of level, increment score, regenerate platforms/clouds)
 * - sky color darkens progressively each level, draw stars starting at a dark enough level (e.g. 5)
 * - kill vito if he falls more than N (5?) platforms (reset score, regenerate platforms/clouds)
 * - make the canvas scale-able and match the window size
 * 
 * TRY OUT: 
 * - reduced map size on the x axis (e.g. 800-1000 units)
*/

// game variables
const keys = {}
const platforms = []
const cloudLevels = []
const vito = new Vito(0, 0)

const tick = (context) => {
  vito.adjustY()
  vito.adjustX()

  // background moves in the opposite direction of vito, hence -x
	drawBackground(-vito.x, vito.y, context)
  updateCloudPositions()
	drawVito(SCREEN_WIDTH / 2, 0, vito.direction, context)
}

const run = () => {
  const canvas = document.getElementById('canvas')
  canvas.width = SCREEN_WIDTH
  canvas.height = SCREEN_HEIGHT

  const context = canvas.getContext('2d')

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  
  populatePlatforms()
  generateClouds()

  const _tick = () => tick(context)
  const game = setInterval(_tick, 1000 / FPS)
}

run()