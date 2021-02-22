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
  const alienDirection = [1,2]
  

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
    // alien.classList.remove(alienClass)
    boxes[alien].classList.remove(alienClass)
    
    // alienArray.forEach(alien => {
    // })
  }

  //MOVE ALIENS

  //DO I NEED TO DECLARE A VARIBALE FOR DIRECTION?
  //THEN DO I NEED TO PUT ALL OF THESE FUNCTIONS INSIDE MY START GAME FUNCTION SO IT RUNS ONCE THE BUTTON IS CLICK?
  //HOW WOULD I GO ABOUT MAKE THE ALIENS DIFFERENT, WOULD I ASSIGN THE INDEX OR CERTAIN IMAGES A CLASS AND THEN ADD THE BACKGROUND? OR TO MAKE THE ALIENS SMALLER

  //check if any of the indexs are hitting 

  function moveAliens() {
    const leftSide = alienArray[0] % width 
    const rightSide = [alienArray.length - 1] % width
    setInterval(() => {
      alienArray.forEach((alien, i) => {
        removeAliens(alien)
        alienArray[i] = alienArray[i] + 1
        addAliens()
        if (alienArray[alien] === leftSide) {
          alienArray[alien] + width
        } else if (alienArray[alien] === rightSide) {
          alienArray[alien] + width
        } 
      })
    }, 2000)
  }


  

  // alienArray.forEach(alien => {
  //   removeAliens()
  //   alienArray ++
  //   addAliens()
  //   if (currentAlienPosition[alien] === leftSide) {
  //     return currentAlienPosition + width
  //   } else if (currentAlienPosition[alien] === rightSide) {
  //     return currentAlienPosition + width
  //   } else {
  //     console.log('bollocks')
  //   }
  // })


  //THE LASER

  // function shootLaser() {
  //   let laserId
  //   let currentLaserPosition = currentShooterPosition
  //   function moveLaser() {
  //     boxes[currentLaserPosition].classList.remove('laser')
  //     currentLaserPosition -= width
  //     if (boxes[currentLaserPosition].contains(alienClass)){
  //       boxes[currentLaserPosition].classList.remove('laser')
  //       boxes[currentLaserPosition].classList.remove(alienClass)
  //     } 
  //   }
  // }






  //EVENT LISTENERS
  startButton.addEventListener('keyup', moveShooter)
  startButton.addEventListener('click', startGame)

  createGrid(shooterStartPosition)
}










window.addEventListener('DOMContentLoaded', init)