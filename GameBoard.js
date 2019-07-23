const DEFAULT_VELOCITY = 0.5;
const DEFAULT_FRICTION = 0.9;
const DEFAULT_GRAVITY = 1;
const DEFAULT_RECTANGLE_WIDTH = 20;
const DEFAULT_RECTANGLE_HEIGHT = 20;
const DEFAULT_SCORE_WIN = 25;
const DEFAULT_COUNT_NEXT_CHALLENGE = 1;

let context = document.getElementById("gameCanvas").getContext("2d");
let score = 0;
let count = 0;
let rectangle = new Rectangle(DEFAULT_RECTANGLE_HEIGHT, false, DEFAULT_RECTANGLE_WIDTH, context.canvas.width / 2, 0, 0, 0);
let controller = new Controller(false, false, false);
let map = new Mapping();

function gameBoard() {

    // ----------------- controlling ------------------
    if (controller.up && rectangle.jumping === true) {
        rectangle.y_velocity -= DEFAULT_GRAVITY * DEFAULT_RECTANGLE_HEIGHT*2;
        rectangle.jumping = false;
    }

    if (controller.left) {
        rectangle.x_velocity -= DEFAULT_VELOCITY;
    }

    if (controller.right) {
        rectangle.x_velocity += DEFAULT_VELOCITY;
    }

    rectangle.y_velocity += DEFAULT_GRAVITY;// gravity
    rectangle.x += rectangle.x_velocity;
    rectangle.y += rectangle.y_velocity;
    rectangle.x_velocity *= DEFAULT_FRICTION;// friction
    rectangle.y_velocity *= DEFAULT_FRICTION;// friction

    // if rectangle is going off the left of the screen
    if (rectangle.x < -rectangle.width) {
        rectangle.x = context.canvas.width;

        // if rectangle goes past right boundary
    } else if (rectangle.x > context.canvas.width) {
        rectangle.x = -rectangle.width;
    }

    //-------- check player moving on screen ---------
    for (let i = 0; i < arr.length; i++) {
        // if rectangle is falling below floor line
        if (rectangle.y > context.canvas.height - rectangle.width) {

            rectangle.jumping = true;
            rectangle.y = context.canvas.height - rectangle.width;
            rectangle.y_velocity = 0;

            // fall and stay on the objects
        } else if (rectangle.y > arr[i].y - rectangle.height &&
            rectangle.y < arr[i].y &&
            rectangle.x < arr[i].x + arr[i].w &&
            rectangle.x > arr[i].x - rectangle.width) {

            rectangle.jumping = true;
            rectangle.y = arr[i].y - rectangle.height;
            rectangle.y_velocity = 0;

            //not jump though the objects
        } else if (rectangle.y > arr[i].y + arr[i].h &&
            rectangle.y < arr[i].y + arr[i].h + 10 &&
            rectangle.x < arr[i].x + arr[i].w &&
            rectangle.x > arr[i].x - rectangle.width) {
            rectangle.jumping = false;
            rectangle.y_velocity = 0;
            console.log("down");
        }
    }

    // -------------- check touching falling objects ----------------
    for (let j = 0; j < arrFallingObject.length; j++) {
        if (rectangle.x + rectangle.width >= arrFallingObject[j].x &&
            rectangle.x <= arrFallingObject[j].x + arrFallingObject[j].w &&
            rectangle.y + rectangle.height >= arrFallingObject[j].y &&
            rectangle.y < arrFallingObject[j].y + arrFallingObject[j].h) {

            count = 0;
            score = 0;
            alert("You Lose");
            window.cancelAnimationFrame(looping);
        }
    }

    // ---------------- check score increase by bonus ---------------
    if (rectangle.x + rectangle.width >= bonusObject.x &&
        rectangle.x <= bonusObject.x + bonusObject.w &&
        rectangle.y + rectangle.height >= bonusObject.y &&
        rectangle.y < bonusObject.y + bonusObject.h) {

        count++;
        score++;
        console.log("count " + count);
        console.log("score " + score);
        bonusObject.x = Math.random() * (DEFAULT_CANVAS_WIDTH);
        bonusObject.y = Math.random() * (DEFAULT_CANVAS_HEIGHT);

        if (count === DEFAULT_COUNT_NEXT_CHALLENGE) {
            map.objectFallingIncrease++;
            map.createFallingObject();
            count = 0;
        }
        if (score === DEFAULT_SCORE_WIN) {
            console.log("you won");
        }
    }

    // -----------------call update when the browser is ready to draw again ----------------
    rectangle.show(context);
    displayScore(score, context);

    let looping = window.requestAnimationFrame(function () {
        map.mapping();
        gameBoard();
    });
}


window.addEventListener("keydown", function () {
    controller.keyListener(event);
});
window.addEventListener("keyup", function () {
    controller.keyListener(event);
});
window.requestAnimationFrame(function () {
    map.mapping();
    gameBoard();
});


