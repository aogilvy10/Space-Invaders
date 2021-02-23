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
  const deadAliensArray = []  

  //SHOOTER
  const shooterClass = 'shooter'
  const shooterStartPosition = 94
  let currentShooterPosition = 94



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
    console.log(alien)
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
          window.alert('GAME IS OVER, BETTER LUCK NEXT TIME')
        }
      })
    }, 100)
  }


  



  //THE LASER

  function shootLaser() {
    let laserId
    let currentLaserPosition = currentShooterPosition
    function moveLaser() {
      boxes[currentLaserPosition].classList.remove('laser')
      currentLaserPosition -= width
      if (boxes[currentLaserPosition].contains(alienClass)){
        boxes[currentLaserPosition].classList.remove('laser')
        boxes[currentLaserPosition].classList.remove(alienClass)

        const deadAliens = alienArray.indexOf(currentLaserPosition)
        deadAliensArray.push(deadAliens)

        if (currentLaserPosition < width) {
          clearInterval(laserId)
          
        }
      } 
    }
  }



  //WRITE A FUNCITON TO RESET THE GAME
  //so need to make all the varibales go back to their original place
  //and remove event listeners maybe?





  //EVENT LISTENERS
  startButton.addEventListener('keyup', moveShooter)
  startButton.addEventListener('click', startGame)

  createGrid(shooterStartPosition)
}










window.addEventListener('DOMContentLoaded', init)