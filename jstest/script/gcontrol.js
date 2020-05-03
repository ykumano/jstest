var debugFlag = true;

/**
 * 2次元座標管理クラス
 */
class Pos2D {
    /**
     * コンストラクタ
     * @param {*} x 
     * @param {*} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * 2次元ベクトル管理クラス
 */
class Vec2D {
    /**
     * コンストラクタ
     * @param {*} th 
     * @param {*} v 
     */
    constructor(th, v) {
        this.th = th;
        this.v = v;
    }
}

/**
 * コントロール管理クラス
 */
class GControl {

    /**
     * コンストラクタ
     * @param {*} gcanvas 
     * @param {*} x 
     * @param {*} y 
     * @param {*} w 
     * @param {*} h 
     */
    constructor(gcanvas, x, y, w, h) {
        this.gcanvas = gcanvas;

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

    /**
     * デバッグ用ログ
     * @param {*} msg 
     */
    debugLog(msg) {
        if (debugFlag == true) {
            let dbgLog = "";
            if (msg !== undefined) {
                dbgLog = "[" + msg + "] ";
            }
            console.log(dbgLog + "pos:(" + this.pos.x + "," + this.pos.y + ") size:(" + this.width + "," + this.height + ")");
        }
    }

    /**
     * 画像設定
     * @param {*} imagePath 
     */
    setImage(imagePath) {
        this.imagePath = imagePath;

        /**
         * 画像読込み完了フラグ
         */
        this.imageReady = false;

        this.image = new Image();
        this.image.addEventListener('load', () => {
            // 画像のロードが完了したら準備完了フラグを立てる
            this.imageReady = true;
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

    /**
     * 更新処理
     */
    update() {

    }

    /**
     * 描画処理
     */
    render() {

    }

    /**
     * 画像描画
     */
    drawImage() {
        this.gcanvas.drawImage(
            this.image,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height
        );
    }

    /**
     * 回転画像描画
     */
    drawRotatedImage() {
        this.gcanvas.drawRotatedImage(
            this.image,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height,
            this.vec.th
        );
    }
}
