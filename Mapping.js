const DEFAULT_OBJECT_WIDTH = 50;
const DEFAULT_OBJECT_HEIGHT = 5;
const DEFAULT_FALLING_OBJECT_WIDTH = 20;
const DEFAULT_FALLING_OBJECT_HEIGHT = 20;
const DEFAULT_BONUS_WIDTH = 20;
const DEFAULT_BONUS_HEIGHT = 20;
const DEFAULT_NUMBER_OF_PADDLE = 15;
const DEFAULT_TOTAL_FALLING_OBJECT = 2;
const TOTAL_NUMBER_OF_PADDLE = 6;
const DEFAULT_PADDLE_WIDTH = 60;
const DEFAULT_PADDLE_HEIGHT = 100;


function Mapping() {

    this.arrPaddle = [];
    this.arrFallingObject = [];
    this.bonusObject = new Bonus(DEFAULT_BONUS_WIDTH,DEFAULT_BONUS_HEIGHT);

    this.numberOfBar = DEFAULT_NUMBER_OF_PADDLE;
    this.totalFallingObjects = DEFAULT_TOTAL_FALLING_OBJECT;

    this.createFallingObject = function () {
        for(let i = 1; i < this.totalFallingObjects; i++ ){
            let objFall = new FallObjectCreate(0,-DEFAULT_FALLING_OBJECT_HEIGHT,DEFAULT_FALLING_OBJECT_WIDTH,DEFAULT_FALLING_OBJECT_HEIGHT,0);
            objFall.x = Math.random()*(DEFAULT_CANVAS_WIDTH);
            objFall.speed = i*Math.random()*2;
            this.arrFallingObject.push(objFall);
        }
    };

    this.createPaddles = function () {
        for (let i = TOTAL_NUMBER_OF_PADDLE; i >= 1; i--) {
            for (let j = 1; j < this.numberOfBar; j++) {
                let obj = new ObjectCreate(0, 0, DEFAULT_OBJECT_WIDTH, DEFAULT_OBJECT_HEIGHT, 0);
                obj.x = j * Math.random() * DEFAULT_PADDLE_WIDTH;
                obj.y = (TOTAL_NUMBER_OF_PADDLE + 1 - i) * DEFAULT_PADDLE_HEIGHT;
                obj.speed = i;
                this.arrPaddle.push(obj);
            }
        }
    };

    this.createFallingObject();
    this.createPaddles();

    this.mapping = function (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        for (let i in this.arrPaddle) {
            this.arrPaddle[i].show(context);
        }
        for (let j in this.arrFallingObject) {
            this.arrFallingObject[j].show(context);
        }
        this.bonusObject.show(context);
    }
}
