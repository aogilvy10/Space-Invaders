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
const shooterStartPosition = 0
let currentShooterPosition = 0

//MAKING THE GRID


function createGrid(shooterStartPosition) {
  for( let i = 0; i < areaOfDiv; i++) {
    const boxNumber = document.createElement('div')
    boxNumber.innerText = i
    grid.appendChild(boxNumber)
    boxes.push(boxNumber)
  }
  addShooter(shooterStartPosition)
}

//ADD SHOOTER
function addShooter(position) {
  boxes[position].classList.add(shooterClass)
}





createGrid(shooterStartPosition)
}










window.addEventListener('DOMContentLoaded', init)