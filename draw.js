const drawClouds = function (xPos, yPos, context) {
	for (let i = -10000; i < 10000; i += 1000) {
		context.fillStyle = 'white'
		context.beginPath()
		context.ellipse(xPos - 75 + i, yPos - 70, 100, 50, 0, 0, 2 * Math.PI)
		context.fill()
		context.beginPath()
		context.ellipse(xPos + 75 + i, yPos - 70, 100, 50, 0, 0, 2 * Math.PI)
		context.fill()
		context.beginPath()
		context.ellipse(xPos + i, yPos - 100, 120, 65, 0, 0, 2 * Math.PI)
		context.fill()
	}
}

const drawPlats = function (xPos, yPos, context) {
	for (let i = 0; i < 50; i++) {
		context.fillStyle = PLATFORM_COLOR
		context.fillRect(xPos + platforms[i].x, SCREEN_HEIGHT - GROUND_THICKNESS - platforms[i].y + yPos, 200, 30)
	}
}

const drawBackground = function (xPos, yPos, context) {
	//sky
	context.fillStyle = SKY_COLOR
	context.fillRect(-10000, -10000, 20000, 20000)
	drawClouds(xPos, yPos, context)

	//ground
	context.fillStyle = GROUND_COLOR
	context.fillRect(xPos - 10000, SCREEN_HEIGHT - GROUND_THICKNESS + yPos, 20000, 200)

	//walls
	context.fillStyle = 'grey'
	context.fillRect(xPos + 5715, 0, 400, yPos + 300)
	context.fillRect(xPos - 5715, 0, 400, yPos + 300)

	//platforms
	drawPlats(xPos, yPos, context)
}

const drawVito = function (x, y, unitDirection, context) {
  y = SCREEN_HEIGHT - GROUND_THICKNESS - y
  /**
   * This function works by taking the "center of mass" of vito's body parts,
   * and reflecting them by an offset depending on the direction
   */

	//body
	context.fillStyle = 'red'
	context.fillRect(x - 20, y - 92.5, 40, 60)

	//overalls
  const LEGS_CENTER = -17.5
  const BELLY_CENTER = 7.5
	context.fillStyle = OVERALL_COLOR
	context.fillRect(x + LEGS_CENTER + 2.5 * unitDirection, y - 67.5, 35, 35)
	context.fillRect(x + LEGS_CENTER - 2.5 * unitDirection, y - 32.5, 10, 30)
	context.fillRect(x + BELLY_CENTER - 2.5 * unitDirection, y - 32.5, 10, 30)
  
	//button
	context.fillStyle = OVERALL_BUTTON_COLOR
	context.beginPath()
	context.arc(x + 12.5 * unitDirection, y -60, 5, 0, 2 * Math.PI)
	context.fill()

	//head
	context.fillStyle = 'yellow'
	context.fillRect(x - 25, y -117.5, 50, 45)
	context.fillStyle = 'black'
	context.beginPath()
	context.arc(x + 20 * unitDirection, y - 92.5, 2.5, 0, 2 * Math.PI)
	context.fill()

	//hat
  const HAT_CENTER = -30
	context.fillStyle = 'red'
	context.fillRect(x + HAT_CENTER + 5 * unitDirection, y - 122.5, 60, 20)

	//shoes
  const SHOE_CENTER = -10
	context.fillStyle = SHOE_COLOR
	context.fillRect(x + SHOE_CENTER + 10 * -unitDirection, y - 7.5, 20, 7.5)
	context.fillRect(x + SHOE_CENTER + 15 * unitDirection, y - 7.5, 20, 7.5)
	//arm
  ARM_CENTER = -2.5
	context.fillStyle = 'red'
	context.fillRect(x + ARM_CENTER + 22.5 * -unitDirection, y - 67.5, 5, 35)
}