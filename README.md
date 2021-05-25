# Space Invaders
 
For my first project in my Software Engineering Immersive Course 
 
## Deployed Version
 
https://aogilvy10.github.io/Space-Invaders/
 
![image](https://user-images.githubusercontent.com/68297258/117759061-f7e50b00-b1d7-11eb-9fdf-8cefb62a0411.png)
 
## How To Play
 
Space Invaders is a classic arcade game from the 80s. The player aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret.
 
The player can only move left or right. The aliens also move from left to right, and also down each time they reach the side of the screen. The aliens also periodically drop bombs towards the player.
 
Once the player has destroyed a wave of aliens, the game starts again. The aim is to achieve the highest score possible before either being destroyed by the aliens, or allowing them to reach the planet's surface.
 
**Controls:**
- Move Left or Right with arrow keys
- Fire with Space Bar
## Brief
- Render a game in the browser
- Be built on a grid: do not use HTML Canvas for this
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Use Javascript for DOM manipulation
- Deploy your game online, where the rest of the world can access it
 
## Technologies Used:
 
- HTML5
- JavaScript(ES6)
- CSS3
 
 
## Approach
 
I started by creating a 10 by 10 grid using a for loop that created each individual div. I set the area of the grid using variables to define the size. I then placed the shooter as well as the aliens in their starting div using their index. I also created an IF statement that restricted the shooter from being able to move up and down and only left and right.
 
``` javascript
  //ALIENS
 const alienClass = 'alien'
 const currentAlienPosition = 0
 let alienArray = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29]
 
 //SHOOTER
 const shooterClass = 'shooter'
 const shooterStartPosition = 94
 let currentShooterPosition = 94
 
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
 
```
 
### Grid Movement
 
Next I focused on the movement of everything throughout the grid. I started with the shooter's laser. The function contained an IF else statement telling the laser to enter a grid if the condition is met, and if so take a certain action. This allowed the laser to travel up the grid and if an alien is present, remove the alien and add 100 to the users total score.
 
```javascript
 
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
   }, 300)
 }
```
After, I needed the aliens to drop bombs randomly that if present in the same div as the shooter's location, the game would end and your score would be displayed. This function was similar to my laser function. I added functionality that chose a random alien to drop the bomb, and a timer for every time a bomb is randomly dropped.
 
```javascript
let currentBombPosition = alienArray[Math.floor(Math.random() * alienArray.length)]
   const bombInterval = setInterval(() => {
     boxes[currentBombPosition].classList.remove(bombClass)
     currentBombPosition += width
```
![image](https://user-images.githubusercontent.com/68297258/117761020-7f804900-b1db-11eb-917d-e85254fe58d9.png)
 
## Wins
One of my major wins I accomplished during this project would have to be the functionality of the aliens movement using a timer. I was not familiar with setIntervals so creating a function that allowed for my aliens to move down the grid after a set amount of time felt like a great accomplishment. After, giving the aliens functionality to drop bombs randomly was another success of mine. I am proud of what I was able to accomplish with not so much knowledge.

## Bugs and Blocks
 
With this being my first ever computer software project, I was definitely a bit nervous on how it would turn out. I started off well by creating the grids and adding the aliens and shooter, but when I began the movement process I was a little stuck. Once I figured out the significance of a conditional statement it all clicked. Styling was one area I believe I can add more, but it being my first project I tried to make it more slick. 

 
## Key Learnings
 
I learned a lot during my first project. I gained a complete understanding of an IF else statement as well as adding event listeners to buttons. I was able to try different bits of code and further test my HTML, CSS and JavaScript capabilities. This project helped me realize that I am capable of becoming a web developer and continue the journey of the course.
