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
        this.spd = 0.5;
    }

    onMove(x, y) {
        this.moveX = x - this.oprStartX;
        this.moveY = y - this.oprStartY;
    }

    onRelease(x, y) {
        this.moveX = 0;
        this.moveY = 0;
        this.spd = 0;
    }

    /**
     * 更新処理
     */
    update() {
        let r = 0;

        this.tgtRot = Math.atan2(this.moveY, this.moveX);
        /*
                r = this.tgtRot - this.rot;
                if (rot > this.tgtRot) {
                    this.rot -= 0.1;
                } else {
                    this.rot += 0.1;
                }
        */
        this.rot = Math.PI / 2;

        this.posX += Math.cos(this.rot) * this.spd;
        this.posY += Math.sin(this.rot) * this.spd;

        this.setPosition(this.posX, this.posY);
        this.setRotation(this.rot);
    }

    render() {
        this.drawRotatedImage();
    }
}
