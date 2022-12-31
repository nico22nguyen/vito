const handleKeyDown = (event) => {
  const direction = KEYCODE_TO_DIRECTION[event.keyCode]
  if (!direction) return
  if (event.repeat) return

	keys[direction] = true

  // if both left and right are pressed, do nothing
  if (!keys['LEFT'] || !keys['RIGHT']) {

    // handle x direction changes
    if (direction === 'LEFT') unitDirection = -1
    else if (direction === 'RIGHT') unitDirection = 1
  }

}

const handleKeyUp = (event) => {
  const direction = KEYCODE_TO_DIRECTION[event.keyCode]
  if (!direction) return
	keys[direction] = false

  // if we released up, it shouldn't affect x velocity
  if (direction === 'UP') return

  // if the other direction key is held, switch velocity immediately 
  if (keys['LEFT']) unitDirection = -1
  if (keys['RIGHT']) unitDirection = 1
}