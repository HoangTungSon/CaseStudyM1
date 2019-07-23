function Bonus(w, h) {

    this.x = Math.random() * (DEFAULT_CANVAS_WIDTH*2/3);
    this.y = Math.random() * (DEFAULT_CANVAS_HEIGHT*2/3);
    this.w = w;
    this.h = h;

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

    this.setX = function (num) {
        this.x = num;
    };

    this.setY = function (num) {
        this.y = num;
    };

    this.show = function (context) {
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.w, this.h);
    };
}