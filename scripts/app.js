function init() {

  ///--------------VARIABLES--------------- 
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.start')
  const total = document.querySelector('span')

  //DEFINING THE GRID
  const width = 10
  const areaOfDiv = width * width
  const boxes = []

  //ALIENS
  const alienClass = 'alien'
  const currentAlienPosition = 0
  let alienArray = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29]
  // const deadAliensArray = []  

  //SHOOTER
  const shooterClass = 'shooter'
  const shooterStartPosition = 94
  let currentShooterPosition = 94

  //LASER
  const laserClass = 'laser'



  //MAKING THE GRID


  function createGrid(shooterStartPosition) {
    for ( let i = 0; i < areaOfDiv; i++) {
      const boxNumber = document.createElement('div')
      // boxNumber.innerText = i
      grid.appendChild(boxNumber)
      boxes.push(boxNumber)
    }
    addShooter(shooterStartPosition)
    addAliens(currentAlienPosition)

  }


  //START THE GAME
  function startGame() {
    moveAliens()
    startButton.disabled = 'true'
  }


  //ADD SHOOTER
  function addShooter(position) {
    boxes[position].classList.add(shooterClass)
  }


  //REMOVE SHOOTER
  function removeShooter(position) {
    boxes[position].classList.remove(shooterClass)
  }
  

  //MOVE THE SHOOTER
  function moveShooter(event) {
    const key = event.keyCode
    removeShooter(currentShooterPosition)
    if (key === 39 && currentShooterPosition % width !== width - 1 ) {
      currentShooterPosition++
    } else if (key === 37 && currentShooterPosition % width !== 0) {
      currentShooterPosition --
    } else if (key === 32) {
      shootLaser()
    }
    addShooter(currentShooterPosition)

  }
  

  //ADD ALIENS
  function addAliens() {
    alienArray.forEach(alien => {
      boxes[alien + currentAlienPosition].classList.add(alienClass)
    })
  }
  

  //REMOVE ALIENS

  function removeAliens (alien) {
    boxes[alien].classList.remove(alienClass)
  }

  //MOVE ALIENS

  function moveAliens() {
    const leftSide = alienArray[0] % width 
    const rightSide = [alienArray.length - 1] % width
    const timerId = setInterval(() => {
      alienArray.forEach((alien, i) => {
        removeAliens(alien)
        alienArray[i] = alienArray[i] + 1
        addAliens()
        if (alienArray[alien] === leftSide) {
          alienArray[alien] + width
        } else if (alienArray[alien] === rightSide) {
          alienArray[alien] + width
        } else if (alienArray[i] >= width * width - 10) {
          clearInterval(timerId)
          resetGame()
        }
      })
    }, 1000)
  }


  



  //THE LASER

  //need the current position of the laser
  //if the laser finds an alien remove the alien class and make the laser disapper
  //we want to keep track of how many dead aliens there are and compare to our aliens array
  //if they are the same we want the game to end and alert a winner
  // need to add event listener so if we press space it will shoot

  //need a set interval 
  //remove update add
  //if the laser is in the top grid disapper and clear interval 
  //or compare current laser index with alien array 
  //remove class
  //remove laserinterval
  //remove alien from alien array 
  //before -= width 
  //if in top grid do that before we update the position
  //if its hit will be after update the posiiton 
  //LASER MOVEMENT

  function shootLaser() {
    let currentLaserPosition = currentShooterPosition 
    const laserInterval = setInterval(() => {
      boxes[currentLaserPosition].classList.remove(laserClass)
      currentLaserPosition -= width
      boxes[currentLaserPosition].classList.add(laserClass)
      if (boxes[currentLaserPosition].classList.contains(alienClass) ) {
        boxes[currentLaserPosition].classList.remove(laserClass)
        boxes[currentLaserPosition].classList.remove(alienClass)
        alienArray = alienArray.filter((i) => (i) !== currentLaserPosition)
        //need to add the total not just in a line
        total.innerHTML += 100
        clearInterval(laserInterval)
      } else if (currentLaserPosition < width) {
        boxes[currentLaserPosition].classList.remove(laserClass)
        clearInterval(laserInterval)
      }
    }, 500)
  }



  //FUNCITON TO RESET THE GAME

  function resetGame() {
    location.reload()
  }


  //ADD A RANDOM ALIEN BOMB
  //first need the bomb to be random and coming from one of the aliens in the alien array 






  //EVENT LISTENERS
  document.addEventListener('keyup', moveShooter)
  startButton.addEventListener('click', startGame)
  // document.addEventListener('keyup', shootLaser)

  createGrid(shooterStartPosition)
}










window.addEventListener('DOMContentLoaded', init)