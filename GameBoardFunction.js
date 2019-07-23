const DEFAULT_VELOCITY = 0.5;
const DEFAULT_FRICTION = 0.9;
const DEFAULT_GRAVITY = 1;
const DEFAULT_RECTANGLE_WIDTH = 20;
const DEFAULT_RECTANGLE_HEIGHT = 20;
const DEFAULT_SCORE_WIN = 10;
const DEFAULT_COUNT_NEXT_CHALLENGE = 2;

function GameBoard() {
    this.context = document.getElementById("gameCanvas").getContext("2d");
    this.score = 0;
    this.count = 0;
    this.rectangle = new Rectangle(DEFAULT_RECTANGLE_HEIGHT, false, DEFAULT_RECTANGLE_WIDTH, this.context.canvas.width / 2, 0, 0, 0);
    this.controller = new Controller(false, false, false);
    this.map = new Mapping();

    this.checkCondition = function () {
        // ----------------- controlling ------------------
        if (this.controller.up && this.rectangle.jumping === true) {
            this.rectangle.y_velocity -= DEFAULT_GRAVITY * DEFAULT_RECTANGLE_HEIGHT * 1.5;
            this.rectangle.jumping = false;
        }

        if (this.controller.left) {
            this.rectangle.x_velocity -= DEFAULT_VELOCITY;
        }

        if (this.controller.right) {
            this.rectangle.x_velocity += DEFAULT_VELOCITY;
        }

        this.rectangle.y_velocity += DEFAULT_GRAVITY;// gravity
        this.rectangle.x += this.rectangle.x_velocity;
        this.rectangle.y += this.rectangle.y_velocity;
        this.rectangle.x_velocity *= DEFAULT_FRICTION;// friction
        this.rectangle.y_velocity *= DEFAULT_FRICTION;// friction

        // if rectangle is going off the left of the screen
        if (this.rectangle.x < -this.rectangle.width) {
            this.rectangle.x = this.context.canvas.width;

            // if rectangle goes past right boundary
        } else if (this.rectangle.x > this.context.canvas.width) {
            this.rectangle.x = -this.rectangle.width;
        }

        //-------- check player moving on screen ---------
        for (let i = 0; i < this.map.arrPaddle.length; i++) {
            // if rectangle is falling below floor line
            if (this.rectangle.y > this.context.canvas.height - this.rectangle.width) {

                this.rectangle.jumping = true;
                this.rectangle.y = this.context.canvas.height - this.rectangle.width;
                this.rectangle.y_velocity = 0;

                // fall and stay on the objects
            } else if (this.rectangle.y > this.map.arrPaddle[i].y - this.rectangle.height &&
                this.rectangle.y < this.map.arrPaddle[i].y &&
                this.rectangle.x < this.map.arrPaddle[i].x + this.map.arrPaddle[i].w &&
                this.rectangle.x > this.map.arrPaddle[i].x - this.rectangle.width) {

                this.rectangle.jumping = true;
                this.rectangle.y = this.map.arrPaddle[i].y - this.rectangle.height;
                this.rectangle.y_velocity = 0;

                //not jump though the objects
            } else if (this.rectangle.y > this.map.arrPaddle[i].y + this.map.arrPaddle[i].h &&
                this.rectangle.y < this.map.arrPaddle[i].y + this.map.arrPaddle[i].h + 10 &&
                this.rectangle.x < this.map.arrPaddle[i].x + this.map.arrPaddle[i].w &&
                this.rectangle.x > this.map.arrPaddle[i].x - this.rectangle.width) {
                this.rectangle.jumping = false;
                this.rectangle.y_velocity = 0;
                console.log("down");
            }
        }

        // -------------- check touching falling objects ----------------
        for (let j = 0; j < this.map.arrFallingObject.length; j++) {
            if (this.rectangle.x + this.rectangle.width >= this.map.arrFallingObject[j].x &&
                this.rectangle.x <= this.map.arrFallingObject[j].x + this.map.arrFallingObject[j].w &&
                this.rectangle.y + this.rectangle.height >= this.map.arrFallingObject[j].y &&
                this.rectangle.y < this.map.arrFallingObject[j].y + this.map.arrFallingObject[j].h) {

                this.count = 0;
                this.score = 0;
                alert("You Lose");
                window.cancelAnimationFrame(animation);
            }
        }

        // ---------------- check score increase by bonus ---------------
        if (this.rectangle.x + this.rectangle.width >= this.map.bonusObject.x &&
            this.rectangle.x <= this.map.bonusObject.x + this.map.bonusObject.w &&
            this.rectangle.y + this.rectangle.height >= this.map.bonusObject.y &&
            this.rectangle.y < this.map.bonusObject.y + this.map.bonusObject.h) {

            this.count++;
            this.score++;
            console.log("count " + this.count);
            console.log("score " + this.score);
            this.map.bonusObject.x = Math.random() * (DEFAULT_CANVAS_WIDTH);
            this.map.bonusObject.y = Math.random() * (DEFAULT_CANVAS_HEIGHT);

            if (this.count === DEFAULT_COUNT_NEXT_CHALLENGE) {
                this.map.totalFallingObjects++;
                this.map.createFallingObject();
                this.count = 0;
            }
            if (this.score === DEFAULT_SCORE_WIN) {
                alert("you won");
                window.cancelAnimationFrame(animation);
            }
        }
        this.rectangle.show(this.context);
        displayScore(this.score, this.context);

        // -----------------call update when the browser is ready to draw again ----------------
        let animation = window.requestAnimationFrame(function () {
            gameBoard.map.mapping(gameBoard.context);
            gameBoard.checkCondition();
        });
    };
}




