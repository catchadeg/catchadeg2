// Get the canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Game settings
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE_LENGTH = 3;
const INITIAL_SNAKE_DIRECTION = 'right';
const GAME_SPEED = 100; // Milliseconds

// Game variables
let snake = [];
let food = {};
let direction = INITIAL_SNAKE_DIRECTION;
let score = 0;
let gameInterval;

// Initialize the game
function initGame() {
  // Initialize the snake
  snake = [];
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({ x: i, y: 0 });
  }

  // Initialize the food
  createFood();

  // Start the game loop
  startGame();
}

// Start the game loop
function startGame() {
  gameInterval = setInterval(gameLoop, GAME_SPEED);
}

// Game loop
function gameLoop() {
  // Move the snake
  moveSnake();

  // Check for collisions
  if (isGameOver()) {
    endGame();
    return;
  }

  // Check if the snake has eaten the food
  if (snake[0].x === food.x && snake[0].y === food.y) {
    growSnake();
    createFood();
    updateScore();
  }

  // Render the game
  renderGame();
}

// Move the snake
function moveSnake() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }

  snake.unshift(head);
  snake.pop();
}

// Check for game over conditions
function isGameOver() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= GRID_SIZE ||
    head.y < 0 ||
    head.y >= GRID_SIZE ||
    snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    return true;
  }
  return false;
}

// End the game
function endGame() {
  clearInterval(gameInterval);
  alert(`Game Over! Your score is ${score}`);
  initGame();
}

// Grow the snake
function growSnake() {
  const tail = { ...snake[snake.length - 1] };
  switch (direction) {
    case 'up':
      tail.y++;
      break;
    case 'down':
      tail.y--;
      break;
    case 'left':
      tail.x++;
      break;
    case 'right':
      tail.x--;
      break;
  }
  snake.push(tail);
  score++;
}

// Create food
function createFood() {
  food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
}

// Update the score
function updateScore() {
  document.getElementById('score').textContent = score;
}

// Render the game
function renderGame() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  });

  // Draw the food
  ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// Handle user input
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

// Restart the game
document.getElementById('restart-btn').addEventListener('click', () => {
  initGame();
});

// Start the game
initGame();
