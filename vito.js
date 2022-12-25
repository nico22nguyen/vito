// colors
const OVERALL_COLOR = '#1560bd'
const OVERALL_BUTTON_COLOR = '#ffd700'
const SHOE_COLOR = '#663300'
const PLATFORM_COLOR = '#ffd700'
const SKY_COLOR = '#7ec0ee'
const GROUND_COLOR = '#7cfc00'

// game constants
const FPS = 40
const GRAVITY_FORCE = -1
const OUT_OF_BOUNDS = 5010
const SCREEN_WIDTH = 1350
const SCREEN_HEIGHT = 600
const PLATFORM_SPACING = 275
const PLATFORM_START = 300
const GROUND_LEVEL = 0
const GROUND_THICKNESS = 200
const KEYCODE_TO_DIRECTION = {
  65: 'LEFT', // A
  68: 'RIGHT', // S
  87: 'UP', // W
  32: 'UP', // SPACE
}

// vito constants
const JUMP_POWER = 25
const X_VELOCITY = 10

// game variables
const keys = {}
const platforms = []
let xVelocityMultiplier = 1
let yVelocity = 0
let xPosition = 675
let yPosition = GROUND_LEVEL
let direction = 'RIGHT'

// populate platforms
for (let i = 0; i < 50; i++) {
	platforms[i] = {
		x: Math.floor(400 * Math.random()) + Math.floor(400 * Math.random()),
		y: i * PLATFORM_SPACING + GROUND_LEVEL + PLATFORM_START,
	}
}

console.log(platforms)

const keysPressed = function (event) {
  const direction = KEYCODE_TO_DIRECTION[event.keyCode]
  if (!direction) return
  if (event.repeat) return

	keys[direction] = true

  // if both left and right are pressed, do nothing
  if (!keys['LEFT'] || !keys['RIGHT']) {

    // handle x direction changes
    if (direction === 'LEFT') xVelocityMultiplier = -1
    else if (direction === 'RIGHT') xVelocityMultiplier = 1
  }

}

const keysReleased = function (event) {
  const direction = KEYCODE_TO_DIRECTION[event.keyCode]
  if (!direction) return
	keys[direction] = false

  // if we released up, it shouldn't affect x velocity
  if (direction === 'UP') return

  // if the other direction key is held, switch velocity immediately 
  if (keys['LEFT']) xVelocityMultiplier = -1
  if (keys['RIGHT']) xVelocityMultiplier = 1
}

const platformCheck = function () {
  if (yPosition <= GROUND_LEVEL) return true

  return platforms.some(platform => {
    if (
      yPosition <= platform.y &&
      yPosition >= platform.y - 5 &&
      xPosition >= 475 - platform.x &&
      xPosition <= 675 - platform.x
    ) {
      return true
    }
  })
}

const adjustY = () => {
  // can't go below the ground
	if (yPosition < GROUND_LEVEL) {
		yPosition = GROUND_LEVEL
    yVelocity = 0
    return
	}
  
  // only apply gravity if we're above the ground
	yVelocity += GRAVITY_FORCE

  // If we're touching a platform, stop y velocity or jump if key is pressed
	if (platformCheck() && yVelocity <= 0) yVelocity = keys['UP'] ? JUMP_POWER : 0

  yPosition += yVelocity
}

const adjustX = () => {
  // "do nothing" cases
  if (keys['RIGHT'] && keys['LEFT']) return // both pressed
  if (!keys['RIGHT'] && !keys['LEFT']) return // none pressed
	if (keys['LEFT'] && xPosition > OUT_OF_BOUNDS) return // want to go right, but at wall
	if (keys['RIGHT'] && xPosition < -OUT_OF_BOUNDS) return // want to go left, but at wall

  // background moves in the opposite direction of the player
  xPosition -= X_VELOCITY * xVelocityMultiplier
}

const tick = function (context) {
  adjustY()
  adjustX()

	drawBackground(xPosition, yPosition, context)
	drawVito(SCREEN_WIDTH / 2, 0, xVelocityMultiplier, context)
  console.log(xPosition)
}

const run = () => {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  document.addEventListener('keydown', keysPressed)
  document.addEventListener('keyup', keysReleased)

  const _tick = () => tick(context)
  const game = setInterval(_tick, 1000 / FPS)
}

run()