function init() {

  ///--------------VARIABLES--------------- 
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.start')

  //DEFINING THE GRID
  const width = 10
  const areaOfDiv = width * width
  const boxes = []

  //ALIENS
  const alienClass = 'alien'
  const currentAlienPosition = 0
  const alienArray = [1,2,3,4,5,6,7,8,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28]
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
      // if (boxes[currentLaserPosition] < width) {
      //   console.log(boxes[currentLaserPosition])
      //   boxes[currentLaserPosition].classList.remove(laserClass)
      //   clearInterval(laserInterval)
      // }
      currentLaserPosition -= width
      boxes[currentLaserPosition].classList.add(laserClass)
    }, 500)
  }




  // function shootLaser() {
  //   let laserId
  //   let currentLaserPosition = currentShooterPosition
  //   function moveLaser() {
  //     boxes[currentLaserPosition].classList.remove('laser')
  //     currentLaserPosition -= width
  //     if (boxes[currentLaserPosition].contains(alienClass)){
  //       boxes[currentLaserPosition].classList.remove('laser')
  //       boxes[currentLaserPosition].classList.remove(alienClass)

  //       const deadAliens = alienArray.indexOf(currentLaserPosition)
  //       deadAliensArray.push(deadAliens)

  // //  make it so if the laser hits the top it disappers 
  // //  need to make it delete after a certain amount of time

  //       if (currentLaserPosition < width) {
  //         clearInterval(laserId)
  //         setTimeout(() => {
  //           boxes[currentLaserPosition].classList.remove('laser')
  //         }, 100)
  //       }
  //     } 
  //   }
  // }
  
  // ADD EVENT LISTENER FOR THE LASER
  // document.addEventListener('keyup', event => {
  //   if (event.keyCode === 32) {
  //     moveLaser()
  //   }
  // })



  //FUNCITON TO RESET THE GAME

  function resetGame() {
    location.reload()
  }


  //ADD A RANDOM ALIEN BOMB
  //first need the bomb to be random and coming from one of the aliens in the alien array 






  //EVENT LISTENERS
  startButton.addEventListener('keyup', moveShooter)
  startButton.addEventListener('click', startGame)
  // document.addEventListener('keyup', shootLaser)

  createGrid(shooterStartPosition)
}










window.addEventListener('DOMContentLoaded', init)