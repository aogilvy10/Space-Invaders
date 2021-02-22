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
  let alienDirection = 1
  

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

  function removeAliens () {
    alienArray.forEach(alien => {
      boxes[alien].remove(alienClass)
    })
  }

  //MOVE ALIENS

  //DO I NEED TO DECLARE A VARIBALE FOR DIRECTION?
  //THEN DO I NEED TO PUT ALL OF THESE FUNCTIONS INSIDE MY START GAME FUNCTION SO IT RUNS ONCE THE BUTTON IS CLICK?
  //I AM CREATING FUNCTIONS FOR EACH PART OF THE GAME, IS THAT THE WRONG WAY TO GO ABOUT IT?
  //TRIED PREVENT DEFAULT SO WHEN PRESS UP OR DOWN KEYS IT DOESNT MOVE THE WHOLE PAGE
  //HOW WOULD I GO ABOUT MAKE THE ALIENS DIFFERENT, WOULD I ASSIGN THE INDEX OR CERTAIN IMAGES A CLASS AND THEN ADD THE BACKGROUND? OR TO MAKE THE ALIENS SMALLER

  function moveAliens() {
    const leftSide = alienArray[0] % width 
    const rightSide = [alienArray.length - 1] % width
    alienArray.forEach(alien => {
      setInterval(() => {
        addAliens()
        if (currentAlienPosition[alien] === leftSide) {
          return currentAlienPosition + width
        } else if (currentAlienPosition[alien] === rightSide) {
          return currentAlienPosition + width
        } else {
          alienDirection++
        }
      }, 2000)
    })
  }





  //EVENT LISTENERS
  startButton.addEventListener('keyup', moveShooter)
  document.addEventListener('click', startGame)

  createGrid(shooterStartPosition)
}










window.addEventListener('DOMContentLoaded', init)