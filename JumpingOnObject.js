function ObjectCreate(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;

    this.getX = function () {
        return this.x;
    };
    this.getY = function () {
        return this.y;
    };
    this.getW = function () {
        return this.w;
    };
    this.getH = function () {
        return this.h;
    };

    this.getSpeed = function () {
        return this.speed;
    };

    this.setX = function (num) {
        this.x = num;
    };

    this.setY = function (num) {
        this.y = num;
    };

    this.setSpeed = function (num) {
        this.speed = num;
    };



    this.show = function (context) {
        if (this.x < context.canvas.width) {
            this.x += this.speed;
            context.fillStyle = "black";
            context.fillRect(this.x, this.y, this.w, this.h);
        } else {
            this.x = -this.w;
        }
    };
}
