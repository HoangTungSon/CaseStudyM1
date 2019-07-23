const DEFAULT_LINE = 16;
const DEFAULT_CANVAS_WIDTH = 1000;
const DEFAULT_CANVAS_HEIGHT = 600;


function Rectangle(height, jumping, width, x, y, x_velocity, y_velocity) {
    this.height = height;
    this.jumping = jumping;
    this.width = width;
    this.x = x;
    this.x_velocity = x_velocity;
    this.y_velocity = y_velocity;
    this.y = y;


    this.getHeight = function () {
        return this.height;
    };

    this.getJump = function () {
        return this.jumping;
    };

    this.setJump = function (state) {
        this.jumping = state;
    };

    this.getWidth = function () {
        return this.width;
    };

    this.setX = function (num) {
        this.x = num;
    };

    this.getX = function () {
        return this.x;
    };

    this.setY = function (num) {
        this.y = num;
    };

    this.getY = function () {
        return this.y;
    };

    this.setX_velocity = function (num) {
        this.x_velocity = num;
    };

    this.getX_velocity = function () {
        return this.x_velocity;
    };

    this.setY_velocity = function (num) {
        this.y_velocity = num;
    };

    this.getY_velocity = function () {
        return this.y_velocity;
    };


    this.show = function (context) {
        context.fillStyle = "blue";
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fill();

    }
}