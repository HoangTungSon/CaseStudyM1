function FallObjectCreate(x, y, w, h, speed) {
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

    this.setSpeed = function (num) {
        this.speed = num;
    };
    this.show = function (context) {
        if (this.y < context.canvas.height) {
            this.y += this.speed;
       //     context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.w, this.h);
        } else {
            this.y = -this.h;
        }
    };
}