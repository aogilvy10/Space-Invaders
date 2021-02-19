function init() {

  ///VARIABLES 
  const grid = document.querySelector('.grid')



  //DEFINING THE GRID
  const width = 10
  const areaOfDiv = width * width
  const boxes = []




  //ALIENS
  // const aliensHit = []


  //SHOOTER
  const shooterClass = 'shooter'
  const shooterStartPosition = 94
  let currentShooterPosition 

  //MAKING THE GRID


  function createGrid(shooterStartPosition) {
    for ( let i = 0; i < areaOfDiv; i++) {
      const boxNumber = document.createElement('div')
      boxNumber.innerText = i
      grid.appendChild(boxNumber)
      boxes.push(boxNumber)
    }
    addShooter(shooterStartPosition)
  }

  //ADD SHOOTER
  function addShooter(position) {
    console.log('position being passed', position)
    boxes[position].classList.add(shooterClass)
  }




  //MOVE THE SHOOTER
  function moveShooter(event) {
    const key = event.keyCode
    if (key === 39 && currentShooterPosition % width >= width - 1 ) {
      currentShooterPosition++
    }

  }
  


  createGrid(shooterStartPosition)
}










window.addEventListener('DOMContentLoaded', init)