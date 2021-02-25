function init() {

  ///--------------VARIABLES--------------- 
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.start')
  const total = document.querySelector('span')
  let playerCanMove = false
  

  //DEFINING THE GRID
  const width = 10
  const areaOfDiv = width * width
  const boxes = []

  //ALIENS
  const alienClass = 'alien'
  const currentAlienPosition = 0
  let alienArray = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29]

  //SHOOTER
  const shooterClass = 'shooter'
  const shooterStartPosition = 94
  let currentShooterPosition = 94

  //LASER
  const laserClass = 'laser'

  //BOMB
  const bombClass = 'bomb'



  //MAKING THE GRID

  function createGrid(shooterStartPosition) {
    for ( let i = 0; i < areaOfDiv; i++) {
      const boxNumber = document.createElement('div')
      grid.appendChild(boxNumber)
      boxes.push(boxNumber)
    }
    addShooter(shooterStartPosition)
    addAliens(currentAlienPosition)

  }


  //START THE GAME
  function startGame() {
    playerCanMove = true
    moveAliens()
    createAlienBomb()
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
    if (playerCanMove === false) return
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
          window.alert(`GAME OVER, BETTER LUCK NEXT TIME!! YOUR SCORE IS ${Number(total.innerHTML)}`)
          clearInterval(timerId)
          resetGame()
        }
      })
    }, 600)
  }


  
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
        total.innerHTML = Number(total.innerHTML) + 100
        clearInterval(laserInterval)
      } else if (currentLaserPosition < width) {
        boxes[currentLaserPosition].classList.remove(laserClass)
        clearInterval(laserInterval)
      } else if (Number(total.innerHTML) === 1500) {
        clearInterval(laserInterval)
        resetGame()
        window.alert(`YOU WIN!! FINAL SCORE : ${Number(total.innerHTML)}`)
      }
    }, 500)
  }

  
  
  //ADD A RANDOM ALIEN BOMB
  
  function alienBombMove() {
    let currentBombPosition = alienArray[Math.floor(Math.random() * alienArray.length)]
    const bombInterval = setInterval(() => {
      boxes[currentBombPosition].classList.remove(bombClass)
      currentBombPosition += width
      boxes[currentBombPosition].classList.add(bombClass)
      //add if statement
      if (boxes[currentBombPosition] === boxes[currentShooterPosition]){
        boxes[currentShooterPosition].classList.remove(shooterClass)
        clearInterval(bombInterval)
        resetGame()
        //TRY TO MAKE IT SO THE SHOOTER DISAPPEARS BEFORE THE WINDOW ALERT IS SHOWN
        window.alert('YOU HAVE BEEN HIT! GAME OVER')
        //else if isnt working either 
      } else if (boxes[currentBombPosition] >= width * width - 10) {
        boxes[currentBombPosition].classList.remove(bombClass)
      }
      // boxes[currentBombPosition].classList.add(bombClass)
    }, 1000)
  }
  
  function createAlienBomb() {
    setInterval(() => {
      alienBombMove()
    }, 3000)
  }
  
  
  //FUNCITON TO RESET THE GAME

  function resetGame() {
    location.reload()
  }


  //EVENT LISTENERS
  document.addEventListener('keyup', moveShooter)
  startButton.addEventListener('click', startGame)

  createGrid(shooterStartPosition)
}


window.addEventListener('DOMContentLoaded', init)