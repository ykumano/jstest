class Own extends GControl {

    constructor(gcanvas, x, y, w, h) {
        super(gcanvas, x, y, w, h);

        this.rot = 0;
        this.spd = 0;
        this.posX = x;
        this.posY = y;

        this.oprStartX = 0;
        this.oprStartY = 0;
        this.ctrlX = 0;
        this.ctrlY = 0;
    }

    onPress(x, y) {
        this.oprStartX = x;
        this.oprStartY = y;
    }

    onMove(x, y) {
        this.ctrlX = x - this.oprStartX;
        this.ctrlY = y - this.oprStartY;
    }

    onRelease(x, y) {
        this.ctrlX = 0;
        this.ctrlY = 0;
        this.spd = 0;
    }

    update() {
        let r = 0;
        if (this.ctrlX > 1) {
            r = this.ctrlX * 0.005;
            if (r > 0.05) {
                r = 0.05;
            }
            this.rot += r;
        } else if (this.ctrlX < -1) {
            r = this.ctrlX * 0.005;
            if (r < -0.05) {
                r = -0.05;
            }
            this.rot += r;
        }
        if (this.ctrlY < -1) {
            this.spd = ctrlY * -0.1;
            if (this.spd > 2) {
                this.spd = 2;
            }
        } else if (this.ctrlY > 1) {
            this.spd = ctrlY * -0.1;
            if (this.spd < -2) {
                this.spd = -2;
            }
        }

        this.posX += Math.cos(this.rot) * this.spd;
        this.posY += Math.sin(this.rot) * this.spd;

        this.setPosition(this.posX, this.posY);
        this.setRotation(this.rot);
    }

    draw() {
        this.drawRotatedImage();
    }
}
