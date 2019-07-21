const DEFAULT_OBJECT_WIDTH = 50;
const DEFAULT_OBJECT_HEIGHT = 5;
const DEFAULT_FALLING_OBJECT_WIDTH = 20;
const DEFAULT_FALLING_OBJECT_HEIGHT = 20;
const DEFAULT_BONUS_WIDTH = 20;
const DEFAULT_BONUS_HEIGHT = 20;

let arr = [];
let arrFallingObject = [];

function createObject(numberOfObject) {
    for (let i = 6; i > 0; i--) {
        for (let j = 1; j < numberOfObject; j++) {
            let obj = new ObjectCreate(0, 0, DEFAULT_OBJECT_WIDTH, DEFAULT_OBJECT_HEIGHT, 0);
            obj.x = j * Math.random() * 60;
            obj.y = (7 - i) * 100;
            obj.speed = i;
            arr.push(obj);
        }
    }
}
let numberOfObject = 15;
let objectFallingIncrease = 5;

function createFallingObject(numberOfFallObject) {
    for(let i = 1; i < numberOfFallObject; i++ ){
        let objFall = new FallObjectCreate(0,-DEFAULT_FALLING_OBJECT_HEIGHT,DEFAULT_FALLING_OBJECT_WIDTH,DEFAULT_FALLING_OBJECT_HEIGHT,0);
        objFall.x = Math.random()*(DEFAULT_CANVAS_WIDTH);
        objFall.speed = i*Math.random()*2;
        arrFallingObject.push(objFall);
    }
}

createObject(numberOfObject);

createFallingObject(objectFallingIncrease);

let bonusObject = new Bonus(DEFAULT_BONUS_WIDTH,DEFAULT_BONUS_HEIGHT);

function mapping() {

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (let i in arr) {
        arr[i].show(context);
    }
    for (let j in arrFallingObject) {
        arrFallingObject[j].show(context);
    }
    bonusObject.show(context);


}
