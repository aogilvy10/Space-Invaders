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
  

  //SHOOTER
  const shooterClass = 'shooter'
  const shooterStartPosition = 94
  let currentShooterPosition = 94



  //MAKING THE GRID


  function createGrid(shooterStartPosition) {
    for ( let i = 0; i < areaOfDiv; i++) {
      const boxNumber = document.createElement('div')
      boxNumber.innerText = i
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

  function moveAliens() {
    const leftSide = alienArray[0] % width 
    const rightSide = [alienArray.length - 1] % width
    alienArray.forEach(alien => {
      setInterval(() => {
        alienArray[alien] ++
        if (currentAlienPosition[alien] === leftSide) {
          return currentAlienPosition + width
        } else if (currentAlienPosition[alien] === rightSide) {
          return currentAlienPosition + width
        }
      }, 2000)
      // if (currentAlienPosition[alien] === leftSide) {
      //   return currentAlienPosition + width
      // } else if (currentAlienPosition[alien] === rightSide) {
      //   return currentAlienPosition + width
      // }
    })
  }





  //EVENT LISTENERS
  startButton.addEventListener('keyup', moveShooter)
  document.addEventListener('click', startGame)

  createGrid(shooterStartPosition)
}










window.addEventListener('DOMContentLoaded', init)