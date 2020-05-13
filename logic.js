
const canvas = document.getElementById("canvas");
const cx = canvas.getContext("2d");

const box = 22;
const canvasSize = 16;

// declare a snake
let snake = [];
snake[0] = {
    x: Math.floor((canvasSize / 2)) * box,
    y: Math.floor((canvasSize / 2)) * box
}

let food = {
    x: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
    y: Math.floor(1 + Math.random() * (canvasSize - 1)) * box
}

let name = "Snake Game score: ";
// dir direction variable 
let dir;
let snakeX;
let snakeY;
let score = 0;
let screenOutput;

function draw() {
    ctx.fillStyle = "mediumSpringGreen";
    ctx.fillRect(box, box, canvasSize * box - box, canvasSize * box - box);

    snakeX = snake[0].x;
    snakeY = snake[0].y;

    // draw a snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    } // end of draw function


    // move snake
    setDirection();

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
            y: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
        }
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // checking for collisions
    
    if (snakeX < box || snakeY < box || snakeX > ((canvasSize - 1) * box) ||
        snakeY > ((canvasSize - 1) * box) || collision(newHead, snake)) {
        clearInterval(runGame);
    }

    // The unshift() method adds one or more elements to the beginning 
    // of an array and returns the new length of the array.
    snake.unshift(newHead);

    // food
    cx.fillStyle = "red";
    cx.fillRect(food.x, food.y, box, box);

    screenOutput = name + score;

    // draw score
    cx.fillStyle = "white";
    cx.font = "24px Changa One"
    cx.clearRect(0, 0, 50, 25);
    cx.fillText(screenOutput, box, 0.8 * box);


} // end of draw function

// criating a event listener for monitoring if key was used - left, up, right, down
document.addEventListener('keydown', direction)
function direction(e) {

    if (e.keyCode === 37 && dir != "RIGHTN") { dir = "LEFT"; }
    if (e.keyCode === 38 && dir != "DOWN") { dir = "UP"; }
    if (e.keyCode === 39 && dir != "LEFT") { dir = "RIGHT"; }
    if (e.keyCode === 40 && dir != "UP") { dir = "DOWN"; }
}
function setDirection() {
    switch (dir) {
        case 'LEFT':
            snakeX -= box;
            break;
        case 'RIGHT':
            snakeX += box;
            break;
        case 'UP':
            snakeY -= box;
            break;
        case 'DOWN':
            snakeY += box;
    } // end of switch 
} // end ofsetDirection
function collision(head, array) {
    for (let i = 0; i <= array.length; i++) {
        if (head.x == array[i] && head.y == array[i]) {
            return true;
        }
    }
    return false;
}
// reloading a draw function every 200 milliseconds
var runGame = setInterval(draw, 200);

let testNum = 1;

document.querySelector(".btnRestart").addEventListener("click", testBtn);
// will reload a page when button is clicked.
function testBtn(){
    window.location.reload();
}




