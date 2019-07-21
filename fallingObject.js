function FallObjectCreate(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;

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