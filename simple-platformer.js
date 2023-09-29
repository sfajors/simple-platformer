
const startCanvas = document.getElementById('startCanvas');
const startCtx = startCanvas.getContext('2d');

// Draw the 'Press S to start' text on the startCanvas
startCtx.font = '30px Arial';
startCtx.fillStyle = '#333';
startCtx.fillText("Press 'S' to start", startCanvas.width / 2 - 110, startCanvas.height / 2);

let gameStarted = false;

// Listen for the 'S' key press
document.addEventListener('keydown', function(event) {
    if (!gameStarted && (event.key === 's' || event.key === 'S')) {
        gameStarted = true;
        startCanvas.style.display = 'none'; // Hide the startCanvas
        gameInit(); // Initialize the game
    }
});

function gameInit() {

const canvas = document.getElementById('gameCanvas');
let isGameOver = false;
const ctx = canvas.getContext('2d');

function displayCurrentLevel() {
    // Set the font size, style, and color
    ctx.font = '12px Roboto';
    ctx.fillStyle = 'blue';
    
    // Calculate the position for displaying the level number
    const text = "Level: " + (currentLevel + 1);  // +1 because array indices start at 0
    const xPosition = canvas.width - 70;  // Adjust as needed to position the text in the right upper corner
    const yPosition = 20;  // A little padding from the top
    
    // Display the level number on the canvas
    ctx.fillText(text, xPosition, yPosition);
}


function fadeInOutOverlay() {
    const overlay = document.getElementById('fadeOverlay');
    if (!overlay) return;  // If the overlay doesn't exist, exit the function

    // Fade in the overlay
    overlay.style.opacity = '1';
    
    // After the fade in completes, fade out the overlay
    setTimeout(() => {
        overlay.style.opacity = '0';
    }, 500);  // Assuming the transition duration is 0.5s (500ms) as set in the CSS
}

function winGame() {
    fadeInOutOverlay();
    isGameOver = true;  // Using the same flag to indicate game over or win state
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
    ctx.font = '30px Roboto';
    ctx.fillStyle = 'black';
    ctx.fillText("Congratulations!", canvas.width / 2 - 110, canvas.height / 2 - 30);
    ctx.font = '20px Roboto';
    ctx.fillText('Press "R" to restart or "E" to exit.', canvas.width / 2 - 130, canvas.height / 2 + 10);
    
    // Listen for player's choice (similar to the gameOver() function)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'r' || event.key === 'R') {
            location.reload();  // Restart the game by reloading the page
        } else if (event.key === 'e' || event.key === 'E') {
            window.close();  // Close the game window/tab
        } else {
            return;  // Ignore other key presses
        }
    });
}

function gameOver(message) {
    isGameOver = true;
    // Pause any game loop or logic here

    // Clear the canvas and display the game over message
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Roboto";
    ctx.fillText(message, canvas.width / 2 - (message.length * 8) / 2, canvas.height / 2 - 30);
    ctx.font = "20px Roboto";
    ctx.fillText("Press 'R' to Restart or 'E' to Exit", canvas.width / 2 - 150, canvas.height / 2 + 10);

    
    setTimeout(function() {
        if (isGameOver) {  // If the game is still in a game over state
            alert('Please press "R" to restart or "E" to exit the game.');
        }
    }, 10000);  // 10 seconds delay

    // Listen for player's choice
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'r' || event.key === 'R') {
            location.reload();  // Restart the game by reloading the page
        } else if (event.key === 'e' || event.key === 'E') {
            window.close();
        } else {
            return;  // Ignore other key presses
        }
    });
  // Event listener will be removed after one use
}

const GRAVITY = 0.5;
const FRICTION = 0.8;

let player = {
    width: 40,
    height: 60,
    speed: 5,
    dy: 0,
    jumping: false,
    doubleJumpAllowed: true
};

let levels = [
    // Level 1
    {
        platforms: [
            {x: 0, y: canvas.height - 40, width: canvas.width, height: 40},
            {x: 100, y: canvas.height - 80, width: 150, height: 20},
            {x: 300, y: canvas.height - 120, width: 200, height: 20},
            {x: 550, y: canvas.height - 160, width: 150, height: 20}
        ],
        start: {x: 50, y: canvas.height - 140},
        end: {x: 700, y: canvas.height - 180, width: 50, height: 50},
        coins: [
            {x: 130, y: 400 - 120, radius: 10, collected: false},
            {x: 330, y: 400 - 160, radius: 10, collected: false}
        ],
    },
    // Level 2
    {
        platforms: [
            {x: 0, y: canvas.height - 40, width: canvas.width, height: 40},
            {x: 50, y: canvas.height - 80, width: 100, height: 20},
            {x: 200, y: canvas.height - 150, width: 200, height: 20},
            {x: 450, y: canvas.height - 200, width: 150, height: 20},
            {x: 650, y: canvas.height - 250, width: 100, height: 20}
        ],
        start: {x: 50, y: canvas.height - 140},
        end: {x: 700, y: canvas.height - 280, width: 50, height: 50},
        coins: [
            {x: 100, y: 280, radius: 10, collected: false},
            {x: 270, y: 320, radius: 10, collected: false},
            {x: 388, y: 240, radius: 10, collected: false},
            {x: 470, y: 220, radius: 10, collected: false},
        ],
    },
    // Level 3
{
    platforms: [
        {x: 0, y: canvas.height - 40, width: canvas.width, height: 40},
        {x: 50, y: canvas.height - 90, width: 150, height: 20},
        {x: 250, y: canvas.height - 140, width: 180, height: 20},
        {x: 150, y: canvas.height - 320, width: 90, height: 20},
        {x: 480, y: canvas.height - 190, width: 200, height: 20},
        {x: 730, y: canvas.height - 240, width: 70, height: 20}
    ],
    start: {x: 50, y: canvas.height - 140},
    end: {x: 740, y: canvas.height - 290, width: 50, height: 50},
    coins: [
        {x: 110, y: 140, radius: 10, collected: false},
        {x: 273, y: 20, radius: 10, collected: false},
        {x: 388, y: 200, radius: 10, collected: false},
        {x: 423, y: 780, radius: 10, collected: false},
        {x: 567, y: 160, radius: 10, collected: false},
    ],
},
// Level 4
{
    platforms: [
        {x: 0, y: canvas.height - 40, width: canvas.width, height: 40},
        {x: 60, y: canvas.height - 120, width: 140, height: 20},
        {x: 250, y: canvas.height - 80, width: 200, height: 20},
        {x: 250, y: canvas.height - 300, width: 200, height: 20},
        {x: 500, y: canvas.height - 140, width: 150, height: 20},
        {x: 520, y: canvas.height - 280, width: 100, height: 20},
        {x: 700, y: canvas.height - 90, width: 100, height: 20}
    ],
    start: {x: 40, y: canvas.height - 160},
    end: {x: 730, y: canvas.height - 140, width: 50, height: 50},
    coins: [
        {x: 100, y: 200, radius: 10, collected: false},
        {x: 220, y: 380, radius: 10, collected: false},
        {x: 305, y: 460, radius: 10, collected: false},
        {x: 390, y: 140, radius: 10, collected: false},
        {x: 580, y: 120, radius: 10, collected: false},
        {x: 671, y: 100, radius: 10, collected: false},
    ],
},
// Level 5
{
    platforms: [
        {x: 0, y: canvas.height - 40, width: canvas.width, height: 40},
        {x: 50, y: canvas.height - 100, width: 130, height: 20},
        {x: 230, y: canvas.height - 160, width: 170, height: 20},
        {x: 450, y: canvas.height - 110, width: 180, height: 20},
        {x: 680, y: canvas.height - 280, width: 120, height: 20},
        {x: 680, y: canvas.height - 180, width: 120, height: 20}
    ],
    start: {x: 30, y: canvas.height - 140},
    end: {x: 730, y: canvas.height - 230, width: 50, height: 50},
    coins: [
        {x: 90, y: 160, radius: 10, collected: false},
        {x: 211, y: 340, radius: 10, collected: false},
        {x: 350, y: 130, radius: 10, collected: false},
        {x: 420, y: 190, radius: 10, collected: false},
        {x: 507, y: 165, radius: 10, collected: false},
        {x: 690, y: 280, radius: 10, collected: false},
        {x: 777, y: 40, radius: 10, collected: false},
    ],
},
// Level 6
{
    platforms: [
        {x: 0, y: canvas.height - 40, width: canvas.width, height: 40},
        {x: 650, y: canvas.height - 100, width: 150, height: 20},
        {x: 500, y: canvas.height - 160, width: 150, height: 20},
        {x: 350, y: canvas.height - 220, width: 150, height: 20},
        {x: 200, y: canvas.height - 280, width: 150, height: 20},
        {x: 50, y: canvas.height - 340, width: 150, height: 20}
    ],
    start: {x: 700, y: canvas.height - 150},
    end: {x: 100, y: canvas.height - 390, width: 50, height: 50},
    coins: [
        {x: 102, y: 120, radius: 10, collected: false},
        {x: 230, y: 300, radius: 10, collected: false},
        {x: 361, y: 280, radius: 10, collected: false},
        {x: 492, y: 260, radius: 10, collected: false},
        {x: 513, y: 140, radius: 10, collected: false},
        {x: 623, y: 120, radius: 10, collected: false},
        {x: 733, y: 100, radius: 10, collected: false},
    ],
},
// Level 7
{
    platforms: [
        {x: 0, y: canvas.height - 40, width: canvas.width, height: 40},
        {x: 60, y: canvas.height - 160, width: 130, height: 20},
        {x: 230, y: canvas.height - 250, width: 170, height: 20},
        {x: 450, y: canvas.height - 200, width: 180, height: 20},
        {x: 680, y: canvas.height - 300, width: 120, height: 20}
    ],
    start: {x: 40, y: canvas.height - 200},
    end: {x: 750, y: canvas.height - 350, width: 50, height: 50},
    coins: [
        {x: 110, y: 180, radius: 10, collected: false},
        {x: 223, y: 100, radius: 10, collected: false},
        {x: 309, y: 60, radius: 10, collected: false},
        {x: 405, y: 280, radius: 10, collected: false},
        {x: 507, y: 100, radius: 10, collected: false},
        {x: 611, y: 220, radius: 10, collected: false},
    ],
},
// Level 8
{
    platforms: [
        {x: 0, y: canvas.height - 40, width: canvas.width, height: 40},
        {x: 50, y: canvas.height - 340, width: 150, height: 20},
        {x: 250, y: canvas.height - 160, width: 180, height: 20},
        {x: 480, y: canvas.height - 340, width: 200, height: 20},
        {x: 730, y: canvas.height - 160, width: 70, height: 20}
    ],
    start: {x: 50, y: canvas.height - 390},
    end: {x: 740, y: canvas.height - 210, width: 50, height: 50},
    coins: [
        {x: 110, y: 80, radius: 10, collected: false},
        {x: 230, y: 60, radius: 10, collected: false},
        {x: 505, y: 340, radius: 10, collected: false},
        {x: 609, y: 290, radius: 10, collected: false},
    ],
},
// Level 9
{
    platforms: [
        {x: 0, y: canvas.height - 40, width: canvas.width, height: 40},
        {x: 50, y: canvas.height - 160, width: 150, height: 20},
        {x: 250, y: canvas.height - 340, width: 180, height: 20},
        {x: 480, y: canvas.height - 160, width: 200, height: 20},
        {x: 730, y: canvas.height - 340, width: 70, height: 20}
    ],
    start: {x: 50, y: canvas.height - 210},
    end: {x: 740, y: canvas.height - 390, width: 50, height: 50},
    coins: [
        {x: 120, y: 180, radius: 10, collected: false},
        {x: 290, y: 80, radius: 10, collected: false},
        {x: 311, y: 60, radius: 10, collected: false},
    ],
},
// Level 10
{
    platforms: [
        {x: 0, y: canvas.height - 40, width: canvas.width, height: 40},
        {x: 30, y: canvas.height - 340, width: 150, height: 20},
        {x: 220, y: canvas.height - 160, width: 150, height: 20},
        {x: 420, y: canvas.height - 280, width: 150, height: 20},
        {x: 620, y: canvas.height - 100, width: 180, height: 20}
    ],
    start: {x: 40, y: canvas.height - 390},
    end: {x: 740, y: canvas.height - 150, width: 50, height: 50},
    coins: [
        {x: 210, y: 100, radius: 20, collected: false},
        {x: 630, y: 80, radius: 20, collected: false},
    ],
},
];

let enemies = [
    // Level 1
    [
        {x: 200, y: canvas.height - 90, width: 50, height: 50, type: 'obstacle'},
        {x: 500, y: canvas.height - 130, width: 30, height: 30, type: 'enemy'}
    ],
    // Level 2
    [
        {x: 300, y: canvas.height - 170, width: 40, height: 40, type: 'enemy'},
        {x: 600, y: canvas.height - 220, width: 50, height: 50, type: 'obstacle'}
    ],
    // Enemies for Level 3
    [
        {x: 180, y: canvas.height - 110, width: 40, height: 40, type: 'enemy'},
        {x: 550, y: canvas.height - 210, width: 30, height: 30, type: 'obstacle'}
    ],
    // Enemies for Level 4
    [
        {x: 320, y: canvas.height - 100, width: 40, height: 40, type: 'obstacle'},
        {x: 620, y: canvas.height - 140, width: 40, height: 40, type: 'enemy'}
    ],
    // Enemies for Level 5
    [
        {x: 150, y: canvas.height - 130, width: 40, height: 40, type: 'enemy'},
        {x: 530, y: canvas.height - 140, width: 30, height: 30, type: 'obstacle'}
    ],
    // Enemies for Level 6
    [
        {x: 280, y: canvas.height - 300, width: 40, height: 40, type: 'obstacle'},
        {x: 400, y: canvas.height - 240, width: 40, height: 40, type: 'enemy'}
    ],
    // Enemies for Level 7
    [
        {x: 150, y: canvas.height - 200, width: 40, height: 40, type: 'enemy'},
        {x: 400, y: canvas.height - 250, width: 40, height: 40, type: 'obstacle'}
    ],
    // Enemies for Level 8
    [
        {x: 300, y: canvas.height - 190, width: 40, height: 40, type: 'obstacle'},
        {x: 530, y: canvas.height - 360, width: 40, height: 40, type: 'enemy'}
    ],
    // Enemies for Level 9
    [
        {x: 180, y: canvas.height - 210, width: 40, height: 40, type: 'enemy'},
        {x: 500, y: canvas.height - 210, width: 30, height: 30, type: 'obstacle'}
    ],
    // Enemies for Level 10
    [
        {x: 100, y: canvas.height - 370, width: 40, height: 40, type: 'enemy'},
        {x: 340, y: canvas.height - 190, width: 30, height: 30, type: 'obstacle'},
        {x: 630, y: canvas.height - 130, width: 40, height: 40, type: 'enemy'}
    ]
];

let currentLevel = 0;

function startLevel() {
    player.x = levels[currentLevel].start.x;
    player.y = levels[currentLevel].start.y;
    player.dy = 0;
    player.jumping = false;
        player.doubleJumpAllowed = true;
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'green';
    levels[currentLevel].platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function drawEnd() {
    const end = levels[currentLevel].end;
    ctx.fillStyle = 'red';
    ctx.fillRect(end.x, end.y, end.width, end.height);
}

function drawEnemies() {
    enemies[currentLevel].forEach(enemy => {
        if (enemy.type === 'enemy') {
            ctx.fillStyle = 'purple';
        } else {
            ctx.fillStyle = 'brown';
        }
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function updatePlayer() {
    // Gravity
    player.dy += GRAVITY;
    // Boundary checks to keep the player within the canvas
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;


    // Movement
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
    
    if (keys['ArrowUp'] && !player.jumping) {
        player.dy = -10;  // Regular single jump height
        player.jumping = true;
    } else if (keys['ArrowUp'] && player.jumping && player.doubleJumpAllowed) {
        player.dy += -20;  // Adding additional force for double jump
        player.doubleJumpAllowed = false;
    }


    // Apply physics
    player.y += player.dy;
    player.dy *= FRICTION;

    // Collision with platforms
    levels[currentLevel].platforms.forEach(platform => {
        if (player.y + player.height > platform.y && player.y < platform.y + platform.height &&
            player.x + player.width > platform.x && player.x < platform.x + platform.width) {
            player.y = platform.y - player.height;
            player.jumping = false;
        player.doubleJumpAllowed = true;
        }
    });

    // Collision with enemies and obstacles
    enemies[currentLevel].forEach(enemy => {
        if (player.x + player.width > enemy.x && 
            player.x < enemy.x + enemy.width &&
            player.y + player.height > enemy.y &&
            player.y < enemy.y + enemy.height) {
                if (enemy.type === 'enemy') {
                    gameOver("Caught by enemy! Game Over.");
                    currentLevel = 0;
                    startLevel();
                } else if (enemy.type === 'obstacle') {
                    gameOver("Hit an obstacle! Try again.");
                    startLevel();
                }
        }
    });

    // Level progression
    
if (player.x + player.width > levels[currentLevel].end.x && 
    player.x < levels[currentLevel].end.x + levels[currentLevel].end.width &&
    player.y + player.height > levels[currentLevel].end.y &&
    player.y < levels[currentLevel].end.y + levels[currentLevel].end.height) {
        currentLevel++;
        if (currentLevel >= levels.length) {
            winGame();
            return;  // Stop further execution of the updatePlayer function
        }
        startLevel();
}

    }

let keys = {};

document.addEventListener('keydown', function(e) {
    keys[e.code] = true;
});

document.addEventListener('keyup', function(e) {
    keys[e.code] = false;
});


let score = 0;

function drawCoins() {
    ctx.fillStyle = 'gold';
    ctx.strokeStyle = 'black';

    // Loop through coins of the current level
    const currentCoins = levels[currentLevel].coins || [];
    for (const coin of currentCoins) {
        if (!coin.collected) {
            ctx.beginPath();
            ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    }
}

function checkCoinCollision() {
    const currentCoins = levels[currentLevel].coins || [];
    for (const coin of currentCoins) {
        if (!coin.collected && 
            player.x + player.width > coin.x - coin.radius && 
            player.x < coin.x + coin.radius && 
            player.y + player.height > coin.y - coin.radius && 
            player.y < coin.y + coin.radius) {
            coin.collected = true;
            score += 10;
        }
    }
}

function displayScore() {
    ctx.font = '12px Roboto';
    ctx.fillStyle = 'blue';
    ctx.fillText("Score: " + score, 10, 20);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the entire canvas first

    drawPlatforms();  // Draw platforms on the canvas
    displayCurrentLevel();  // Display the current level number after clearing the canvas but before drawing other elements

    drawEnd();
    drawEnemies();
    drawCoins();
    drawPlayer();
    updatePlayer();
    checkCoinCollision();
    displayScore();

    if (!isGameOver) {
        requestAnimationFrame(gameLoop);
    }
}

startLevel();
gameLoop();
}