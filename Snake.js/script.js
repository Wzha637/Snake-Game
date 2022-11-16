const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('span');
const startBtn = document.querySelector('.start');
let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2,1,0] // 2 is the head and 0 is the tail and 1 is the body
let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0; 
let interval = 0;
let squares = []


function createBoard() {
 for(let i = 0; i< width*width; i++) {
  const square = document.createElement('div');
  square.setAttribute('id',i);
  grid.appendChild(square);
  squares.push(square);
 }
}

createBoard()


function startGame() {
 currentSnake.forEach(index => squares[index].classList.remove('snake'));
 squares[appleIndex].classList.remove('apple');
 squares[appleIndex].innerHTML = '';
 clearInterval(interval);
 score = 0;
 randomApple();
 direction = 1;
 scoreDisplay.innerHTML = score;
 intervalTime = 1000;
 currentSnake = [2,1,0]
 currentIndex = 0;
 currentSnake.forEach(index => squares[index].classList.add('snake'));
 interval = setInterval(moveOutcomes, intervalTime);
}

// function for the movement outcomes of the snake
function moveOutcomes() {
 // deals with snake hitting the wall and itself
 if(
  (currentSnake[0] + width >= (width*width) && direction === width) || // if snake hits the bottom 
  (currentSnake[0] % width === width-1 && direction === 1) || // if snake hits right wall
  (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
  (currentSnake[0] - width < 0 && direction === -width) || // if snake hits roof
  squares[currentSnake[0] + direction].classList.contains('snake') // if snake hits itself
 ) {
  alert('Game Over!');
  return clearInterval(interval);
 }
 // when snake moves fowards the snake pops the end off and adds it to the head  
 const tail = currentSnake.pop();
 squares[tail].classList.remove('snake');
 currentSnake.unshift(currentSnake[0] + direction)

 //deals with the snake hitting the apple
 if(squares[currentSnake[0]].classList.contains('apple')) {
  squares[currentSnake[0]].classList.remove('apple');
  squares[currentSnake[0]].innerHTML = '';
  squares[tail].classList.add('snake');
  currentSnake.push(tail);
  randomApple();
  score++;
  scoreDisplay.innerHTML = score;
  clearInterval(interval);
  intervalTime = intervalTime * speed;
  interval = setInterval(moveOutcomes, intervalTime);
 }
 squares[currentSnake[0]].classList.add('snake');
}

// arrow controls
function control(e) {
 squares[currentIndex].classList.remove('snake');

 if(e.keyCode ===39) {
  direction = 1;
 } else if(e.keyCode === 38) {
  direction = -width;
 } else if(e.keyCode === 37) {
  direction = -1;
 } else if(e.keyCode === 40) {
  direction = +width;
 }
}

// generate new apple 
function randomApple() {
  appleIndex = Math.floor(Math.random() * squares.length);
  if(squares[appleIndex].classList.contains('snake')) {
   randomApple()
  } else {
   squares[appleIndex].classList.add('apple');
   squares[appleIndex].innerHTML = '<i class="fa-solid fa-apple-whole" style="color:red"></i>';
  }
 
}

document.addEventListener('keyup',control);
startBtn.addEventListener('click',startGame);
