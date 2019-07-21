function ObjectCreate(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;

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
