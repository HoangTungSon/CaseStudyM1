function Bonus(w, h) {

    this.x = Math.random() * (DEFAULT_CANVAS_WIDTH*2/3);
    this.y = Math.random() * (DEFAULT_CANVAS_HEIGHT*2/3);
    this.w = w;
    this.h = h;

    this.show = function (context) {
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.w, this.h);
    };
}