class Own extends GControl {

    /**
     * コンストラクタ
     * @param {*} gcanvas 
     * @param {*} x 
     * @param {*} y 
     * @param {*} w 
     * @param {*} h 
     */
    constructor(gcanvas, x, y, w, h) {
        super(gcanvas, x, y, w, h);

        this.rot = 0;
        this.spd = 0;
        this.posX = x;
        this.posY = y;

        this.oprStartX = 0;
        this.oprStartY = 0;
        this.moveX = 0;
        this.moveY = 0;
        this.tgtRot = 0;
    }

    onPress(x, y) {
        this.oprStartX = x;
        this.oprStartY = y;
        this.spd = 1;
    }

    onMove(x, y) {
        this.moveX = this.oprStartX - x;
        this.moveY = this.oprStartY - y;
    }

    onRelease(x, y) {
//        this.moveX = 0;
//        this.moveY = 0;
        this.spd = 0;
    }

    /**
     * 更新処理
     */
    update() {
        let r = 0;
        let rd = 0;
        let tr = 0.2;

        this.tgtRot = Math.atan2(this.moveY, this.moveX);
        if (this.tgtRot < 0) {
            this.tgtRot += Math.PI * 2;
        }
        console.log("r:" + this.rot + " tgt:" + this.tgtRot);
        r = this.rot - this.tgtRot;
        if (r < 0) {
            if (r < -Math.PI) {
                rd = tr;
            } else {
                rd = -tr;
            }
        } else {
            if (r > Math.PI) {
                rd = -tr;
            } else {
                rd = tr;
            }
        }
        this.rot += rd;

        this.posX += Math.cos(this.rot) * this.spd;
        this.posY += Math.sin(this.rot) * this.spd;

        this.setPosition(this.posX, this.posY);
        this.setRotation(this.rot);
    }

    render() {
        this.drawRotatedImage();
    }
}
