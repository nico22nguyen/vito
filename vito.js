class Vito {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.yVelocity = 0
    this.direction = 1
  }

  adjustY = () => {
    // can't go below the ground
    if (this.y < 0) {
      this.y = 0
      this.yVelocity = 0
      return
    }
    
    // only apply gravity if vito is above the ground
    this.yVelocity += Math.min(GRAVITY_FORCE, MAX_FALL_SPEED)
  
    // if vito is moving upwards, no platform logic needed
    if (this.yVelocity > 0) {
      this.y += this.yVelocity
      return
    }
  
    // If vito is touching a platform, stop y velocity or jump if key is pressed
    const intersectingPlatform = platformCheck(this.x, this.y)
    if (intersectingPlatform) {
      this.yVelocity = keys['UP'] ? JUMP_POWER : 0
      this.y = intersectingPlatform.y
      return
    }
  
    // if applying velocity would skip vito past the next platform, land him on the platform
    const nextPlatform = getNextPlatform(this.y)
    const nextPosition = this.y + this.yVelocity
  
    if (nextPosition <= 0 || (nextPosition <= nextPlatform?.y && xAlignsWithPlatform(this.x, nextPlatform))) {
      this.yVelocity = keys['UP'] ? JUMP_POWER : 0
      this.y = nextPlatform.y
      return
    }
  
    // otherwise, apply velocity
    this.y += this.yVelocity
  }

  adjustX = () => {
    // "do nothing" cases
    if (keys['RIGHT'] && keys['LEFT']) return // both pressed
    if (!keys['RIGHT'] && !keys['LEFT']) return // none pressed
   
    // want to go left, but at wall
    if (keys['LEFT'] && this.x < -OUT_OF_BOUNDS + HAT_JUT + WALL_THICKNESS + X_VELOCITY) {
      this.x = -OUT_OF_BOUNDS + WALL_THICKNESS + HAT_JUT
      return
    }
  
    // want to go right, but at wall
    if (keys['RIGHT'] && this.x > OUT_OF_BOUNDS - HAT_JUT - X_VELOCITY) {
      this.x = OUT_OF_BOUNDS - HAT_JUT
      return
    }
  
    this.x += X_VELOCITY * this.direction
  }
}