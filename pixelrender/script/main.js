(() => {
    var cntr = 0;

    var objList = [];

    var memCanvas = document.createElement('canvas');
    memCanvas.width = 160;
    memCanvas.height = 100;
    var memCtx = memCanvas.getContext("2d");

    /**
     * ユーティリティクラス
     */
    var gcanvas = null;
    var own = null;

    /**
     * Window読込み完了ハンドラ
     */
    window.addEventListener('load', () => {
        console.log("on load");

        initialize();

//        updateFrame();
    }, false);

    /**
     * 初期化処理
     */
    function initialize() {
        var canvas = document.getElementById('mainCanvas');
        var context = canvas.getContext("2d");

        memCtx.fillStyle = 'rgb(160, 160, 255)';
        memCtx.fillRect(10, 20, 40, 30);

        var memImage = memCtx.getImageData(0, 0, 160,100);

        for(var y=0; y<100; y++){
            for(var x=0; x<160; x++){
                var rPix = memImage.data[((y*(memImage.width*4)) + (x*4)) + 0];
                var gPix = memImage.data[((y*(memImage.width*4)) + (x*4)) + 1];
                var bPix = memImage.data[((y*(memImage.width*4)) + (x*4)) + 2];
                var aPix = memImage.data[((y*(memImage.width*4)) + (x*4)) + 3];
                //context.fillStyle = `rgb(${255}, ${255}, ${255})`;
                context.fillStyle = `rgb(${rPix}, ${gPix}, ${bPix})`;
                //            context.fillStyle = 'rgb(255,255,255)';
                context.fillRect(x * 8, y*8, 6, 6);
            }

        }

//        context.putImageData(memImage, 0, 0);
    }

    /**
     * マウスプレス操作
     * @param {*} x 
     * @param {*} y 
     */
    function onPress(x, y) {
        own.onPress(x, y);
    }
    /**
     * マウス移動操作
     * @param {*} x 
     * @param {*} y 
     */
    function onMove(x, y) {
        own.onMove(x, y);
    }
    /**
     * マウスリリース操作
     * @param {*} x 
     * @param {*} y 
     */
    function onRelease(x, y) {
        own.onRelease(x, y);
    }

    /**
     * フレーム更新処理
     */
    function updateFrame() {
        // 画面クリア
        gcanvas.drawRect(0, 0, 320, 440, "#808080ff");
        gcanvas.drawRect(0, 0, 320, 240, "#f0f0f0ff");

        cntr++;
        gcanvas.drawText("test " + cntr, 20, 20, "#00000020");

        gcanvas.drawFan(10, 10, 50, 0.0, Math.PI / 2, "#00000040");

        /**
         * オブジェクト更新処理
         */
        objList.forEach(function (obj) {
            obj.update();
        })

        /**
         * オブジェクト描画処理
         */
        objList.forEach(function (obj) {
            obj.render();
        })

        /**
         * フレーム更新処理再登録
         */
        requestAnimationFrame(updateFrame);
    }
})();
