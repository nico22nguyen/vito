// initializes platforms array
const populatePlatforms = () => {
  for (let i = 0; i < NUM_PLATFORMS; i++) {
    // use root to space platforms further horizontally as the height increases
    const nthRoot = 1 + Math.floor(i / PLATFORMS_PER_LEVEL)

    // platforms 45 and above use the max spacing, otherwise weight a random number using the root
    const weightedRandom = i < 45 ? Math.pow(Math.random(), 1 / nthRoot) : 1

    // soften maximum for lower levels, it's hard to make the max spacing jump
    const max_spacing = i < 30 ? MAX_PLATFORM_SPACING_X - MAX_PLATFORM_SPACING_X_SOFTENER : MAX_PLATFORM_SPACING_X

    // previous platform's x position, or 0 if this is the first platform
    const previousPlatformX = platforms[i - 1]?.x || 0

    // generate the offset from the previous platform we'll use to position this platform. Also make sure the final offset is at least the minimum spacing
    let offset = Math.max(Math.round(weightedRandom * max_spacing), MIN_PLATFORM_SPACING_X)

    // determine whether to position this platform to the left or right of the previous platform
    if (Math.random() > 0.5) offset *= -1

    // calculate the platform's x position
    const unsafePlatformX = previousPlatformX + offset

    // if the platform would intersect the wall, position it in the opposite direction
    let safePlatformX = unsafePlatformX
    if (unsafePlatformX < -OUT_OF_BOUNDS + WALL_THICKNESS) safePlatformX = previousPlatformX - offset
    else if (unsafePlatformX + PLATFORM_WIDTH > OUT_OF_BOUNDS) safePlatformX = previousPlatformX - offset
    
    // add the platform to the array
    platforms[i] = {
      x: safePlatformX,
      y: i * PLATFORM_SPACING_Y + PLATFORM_START_Y,
    }
  }
}

// returns intersecting platform or null if no platform is found
const platformCheck = function (yPosition) {
  if (yPosition <= 0) return { x: undefined, y: 0 }

  return platforms.find(platform => (
    yPosition <= platform.y &&
    yPosition >= platform.y - 5 &&
    xPosition > platform.x - SHOE_WIDTH &&
    xPosition < platform.x + PLATFORM_WIDTH + SHOE_WIDTH
  ))
}

// gets "next" platform, assuming player is falling
const getNextPlatform = (yPosition) => {
  const correctedY = yPosition - PLATFORM_START_Y
  if (correctedY <= 0) return { x: undefined, y: 0 }

  const platformIndex = Math.floor(correctedY / PLATFORM_SPACING_Y)
  if (platformIndex >= NUM_PLATFORMS) return null
  return platforms[platformIndex]
}