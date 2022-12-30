/* colors */
const OVERALL_COLOR = '#1560bd'
const OVERALL_BUTTON_COLOR = '#ffd700'
const SHOE_COLOR = '#663300'
const PLATFORM_COLOR_SCHEDULE = ['#00ff00', '#ffd700', '#00ffff', '#ff00ff', '#ff0000']
const SKY_COLOR = '#7ec0ee'
const GROUND_COLOR = '#7cfc00'

/* game */
const SCREEN_WIDTH = 1350
const SCREEN_HEIGHT = 600
const FPS = 40
const GRAVITY_FORCE = -1
const MAX_FALL_SPEED = 50
const OUT_OF_BOUNDS = 5715
const GROUND_THICKNESS = 200
const WALL_THICKNESS = 400
const KEYCODE_TO_DIRECTION = {
  65: 'LEFT', // A
  68: 'RIGHT', // S
  87: 'UP', // W
  32: 'UP', // SPACE
}

/* clouds */
const CLOUD_SPACING_X = 1000
const CLOUD_SPACING_Y = 600
const CLOUD_START = 400

/* platforms */
const PLATFORM_WIDTH = 200
const PLATFORM_HEIGHT = 30
const PLATFORM_SPACING_Y = 275
const PLATFORM_START_Y = 250
const MIN_PLATFORM_SPACING_X = 100
const MAX_PLATFORM_SPACING_X = 525
// soften the max for lower levels since the max should be really hard to hit
const MAX_PLATFORM_SPACING_X_SOFTENER = 25
const NUM_PLATFORMS = 50
const PLATFORMS_PER_LEVEL = 10

/* vito */
const JUMP_POWER = 25
const X_VELOCITY = 10
const SHOE_WIDTH = 20 // for platform detection
const HAT_JUT = 35 // for wall detection (UNSAFE, THIS IS NOT TIED TO THE ACTUAL HAT DRAWING)