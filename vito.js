// game variables
const keys = {}
const platforms = []
let xVelocityMultiplier = 1
let yVelocity = 0
let xPosition = 0
let yPosition = 0
let direction = 'RIGHT'

const adjustY = () => {
  // can't go below the ground
	if (yPosition < 0) {
		yPosition = 0
    yVelocity = 0
    return
	}
  
  // only apply gravity if vito is above the ground
	yVelocity += Math.min(GRAVITY_FORCE, MAX_FALL_SPEED)

  // if vito is moving upwards, no platform logic needed
  if (yVelocity > 0) {
    yPosition += yVelocity
    return
  }

  // If vito is touching a platform, stop y velocity or jump if key is pressed
  const intersectingPlatform = platformCheck(xPosition, yPosition)
  if (intersectingPlatform) {
    yVelocity = keys['UP'] ? JUMP_POWER : 0
    yPosition = intersectingPlatform.y
    return
  }

  // if applying velocity would skip vito past the next platform, land him on the platform
  const nextPlatform = getNextPlatform(yPosition)
  const nextPosition = yPosition + yVelocity

  if (nextPosition <= 0 || (nextPosition <= nextPlatform?.y && xIntersectingPlatform(xPosition, nextPlatform))) {
    yVelocity = keys['UP'] ? JUMP_POWER : 0
    yPosition = nextPlatform.y
    return
  }

  // otherwise, apply velocity
  yPosition += yVelocity
}

const adjustX = () => {
  // "do nothing" cases
  if (keys['RIGHT'] && keys['LEFT']) return // both pressed
  if (!keys['RIGHT'] && !keys['LEFT']) return // none pressed
 
  // want to go left, but at wall
	if (keys['LEFT'] && xPosition < -OUT_OF_BOUNDS + HAT_JUT + WALL_THICKNESS + X_VELOCITY) {
    xPosition = -OUT_OF_BOUNDS + WALL_THICKNESS + HAT_JUT
    return
  }

  // want to go right, but at wall
	if (keys['RIGHT'] && xPosition > OUT_OF_BOUNDS - HAT_JUT - X_VELOCITY) {
    xPosition = OUT_OF_BOUNDS - HAT_JUT
    return
  }

  xPosition += X_VELOCITY * xVelocityMultiplier
}

const tick = (context) => {
  adjustY()
  adjustX()

  // background moves in the opposite direction of vito, hence -x
	drawBackground(-xPosition, yPosition, context)
	drawVito(SCREEN_WIDTH / 2, 0, xVelocityMultiplier, context)
}

const run = () => {
  const canvas = document.getElementById('canvas')
  canvas.width = SCREEN_WIDTH
  canvas.height = SCREEN_HEIGHT

  const context = canvas.getContext('2d')

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  
  populatePlatforms()

  const _tick = () => tick(context)
  const game = setInterval(_tick, 1000 / FPS)
}

run()