const DEFAULT_VELOCITY = 0.5;
const DEFAULT_FRICTION = 0.9;
const DEFAULT_GRAVITY = 1;
const DEFAULT_RECTANGLE_WIDTH = 20;
const DEFAULT_RECTANGLE_HEIGHT = 20;
const DEFAULT_SCORE_WIN = 50;
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
        if (this.controller.getUp() && this.rectangle.getJump() === true) {
            this.rectangle.setY_velocity(this.rectangle.getY_velocity() - DEFAULT_GRAVITY * DEFAULT_RECTANGLE_HEIGHT * 2);
            this.rectangle.setJump(false);
        }

        if (this.controller.getLeft()) {
            this.rectangle.setX_velocity(this.rectangle.getX_velocity() - DEFAULT_VELOCITY);
        }

        if (this.controller.getRight()) {
            this.rectangle.setX_velocity(this.rectangle.getX_velocity() + DEFAULT_VELOCITY);

        }

        this.rectangle.setY_velocity(this.rectangle.getY_velocity() + DEFAULT_GRAVITY);
        this.rectangle.setX(this.rectangle.getX() + this.rectangle.getX_velocity());
        this.rectangle.setY(this.rectangle.getY() + this.rectangle.getY_velocity());
        this.rectangle.setX_velocity(this.rectangle.getX_velocity()*DEFAULT_FRICTION);
        this.rectangle.setY_velocity(this.rectangle.getY_velocity()*DEFAULT_FRICTION);

        // if rectangle is going off the left of the screen
        if (this.rectangle.getX < -this.rectangle.getWidth()) {
            this.rectangle.setX(this.context.canvas.width);

            // if rectangle goes past right boundary
        } else if (this.rectangle.getX > this.context.canvas.width) {
            this.rectangle.setX(-this.rectangle.getWidth());
        }

        //-------- check player moving on screen ---------
        for (let i = 0; i < this.map.arrPaddle.length; i++) {
            // if rectangle is falling below floor line
            if (this.rectangle.getY() > this.context.canvas.height - this.rectangle.getWidth()) {

                this.rectangle.setJump(true);
                this.rectangle.setY(this.context.canvas.height - this.rectangle.getWidth());
                this.rectangle.setY_velocity(0);

                // fall and stay on the objects
            } else if (this.rectangle.getY() > this.map.arrPaddle[i].getY() - this.rectangle.getHeight() &&
                this.rectangle.getY() < this.map.arrPaddle[i].getY() &&
                this.rectangle.getX() < this.map.arrPaddle[i].getX() + this.map.arrPaddle[i].w &&
                this.rectangle.getX() > this.map.arrPaddle[i].getX() - this.rectangle.width) {

                this.rectangle.setJump(true);
                this.rectangle.setY(this.map.arrPaddle[i].getY() - this.rectangle.getHeight());
                this.rectangle.setY_velocity(0);

                //not jump though the objects
            } else if (this.rectangle.getY() > this.map.arrPaddle[i].getY() + this.map.arrPaddle[i].getH() &&
                this.rectangle.getY() < this.map.arrPaddle[i].getY() + this.map.arrPaddle[i].getH() + 10 &&
                this.rectangle.getX() < this.map.arrPaddle[i].getX() + this.map.arrPaddle[i].getW() &&
                this.rectangle.getX() > this.map.arrPaddle[i].getX() - this.rectangle.getWidth()) {
                this.rectangle.setJump(false);
                this.rectangle.setY_velocity(0);
                console.log("down");
            }
        }

        // -------------- check touching falling objects ----------------
        for (let j = 0; j < this.map.arrFallingObject.length; j++) {
            if (this.rectangle.getX() + this.rectangle.getWidth() >= this.map.arrFallingObject[j].getX() &&
                this.rectangle.getX() <= this.map.arrFallingObject[j].getX() + this.map.arrFallingObject[j].getW() &&
                this.rectangle.getY() + this.rectangle.getHeight() >= this.map.arrFallingObject[j].getY() &&
                this.rectangle.getY() < this.map.arrFallingObject[j].getY() + this.map.arrFallingObject[j].getH()) {

                alert("Your score is = " + this.score);
                window.cancelAnimationFrame(animation);
            }
        }

        // ---------------- check score increase by bonus ---------------
        if (this.rectangle.getX() + this.rectangle.getWidth() >= this.map.bonusObject.getX() &&
            this.rectangle.getX() <= this.map.bonusObject.getX() + this.map.bonusObject.getW() &&
            this.rectangle.getY() + this.rectangle.getHeight() >= this.map.bonusObject.getY() &&
            this.rectangle.getY() < this.map.bonusObject.getY() + this.map.bonusObject.getH()) {

            this.count++;
            this.score++;
            console.log("count " + this.count);
            console.log("score " + this.score);
            this.map.bonusObject.setX(Math.random() * DEFAULT_CANVAS_WIDTH);
            this.map.bonusObject.setY(Math.random() * DEFAULT_CANVAS_HEIGHT);

            if (this.count === DEFAULT_COUNT_NEXT_CHALLENGE) {
                this.map.totalFallingObjects++;
                this.map.createFallingObject();
                this.count = 0;
            }
            if (this.score === DEFAULT_SCORE_WIN) {
                alert("Excellence !!!");
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




