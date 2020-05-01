var debugFlag = true;

class Pos2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Vec2D {
    constructor(th, v) {
        this.th = th;
        this.v = v;
    }
}

class GControl {

    constructor(canvas2d, x, y, w, h) {
        this.canvas2d = canvas2d;

        let x_ = 0;
        let y_ = 0;

        if (x !== undefined) {
            x_ = x;
        }
        if (y !== undefined) {
            y_ = y;
        }

        if (w !== undefined) {
            this.width = w;
        } else {
            this.width = 0;
        }

        if (h !== undefined) {
            this.height = h;
        } else {
            this.height = 0;
        }

        this.pos = new Pos2D(x_, y_);
        this.vec = new Vec2D(0, 0);

        this.debugLog();
    }

    debugLog(msg) {
        if (debugFlag == true) {
            let dbgLog = "";
            if (msg !== undefined) {
                dbgLog = "[" + msg + "] ";
            }
            console.log(dbgLog + "pos:(" + this.pos.x + "," + this.pos.y + ") size:(" + this.width + "," + this.height + ")");
        }
    }

    setImage(imagePath) {
        this.imagePath = imagePath;

        /**
         * 画像読込み完了フラグ
         */
        this.ready = false;

        this.image = new Image();
        this.image.addEventListener('load', () => {
            // 画像のロードが完了したら準備完了フラグを立てる
            this.ready = true;
            this.width = this.image.naturalWidth;
            this.height = this.image.naturalHeight;

            this.debugLog("Image.onload");
        }, false);
        this.image.src = imagePath;
    }

    setPosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    setRotation(th) {
        this.vec.th = th;
    }

    draw() {
        this.canvas2d.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
    }

    drawRotate() {
        this.canvas2d.drawRotatedImage(
            this.image,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height,
            this.vec.th
        );
    }
}
