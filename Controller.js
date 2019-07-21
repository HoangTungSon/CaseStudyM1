function Controller(left, right, up){
    this.left = left;
    this.right = right;
    this.up = up;

    this.keyListener = function (event) {
        let key_state = (event.type === "keydown");
        switch(event.keyCode) {
            case 37:// left key
                this.left = key_state;
                break;
            case 38:// up key
                this.up = key_state;
                break;
            case 39:// right key
                this.right = key_state;
                break;
        }
    }
}