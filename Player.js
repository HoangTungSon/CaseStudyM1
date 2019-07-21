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

    this.show = function (context) {
        // context.fillStyle = "#202020";
        // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = "blue";
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fill();

        // context.strokeStyle = "#202830";
        // context.lineWidth = 4;
        // context.beginPath();
        // context.moveTo(0, context.canvas.height - DEFAULT_LINE);
        // context.lineTo(context.canvas.width, context.canvas.height - DEFAULT_LINE);
        // context.stroke();


    }
}