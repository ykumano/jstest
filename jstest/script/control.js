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

class Control {

    constructor(canvas2d) {
        this.canvas2d = canvas2d;

        this.pos = new Pos2D(0, 0);
        this.vec = new Vec2D(0, 0);
    }

    setImage(imagePath){
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

            console.log("image:" + this.width + "," + this.height);
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
