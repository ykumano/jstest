(() => {
    var cntr = 0;

    var px = 0;
    var py = 0;

    var oprStartX = 0;
    var oprStartY = 0;
    var ctrlX = 0;
    var ctrlY = 0;

    var rot = 0;
    var spd = 0;
    var posX = 100;
    var posY = 100;

    var testImage;

    /**
     * ユーティリティクラス
     */
    var util = null;

    //   let canvas = null;

    /**
     * Window読込み完了ハンドラ
     */
    window.addEventListener('load', () => {
        console.log("on load");

        initialize();

        updateFrame();
    }, false);

    function initialize() {
        //       canvas = util.canvas;
        // ユーティリティクラスを初期化
        util = new Canvas2DUtility(document.getElementById('serverView'), window);

        testImage = new Image();
        testImage.addEventListener('load', () => {
            // 画像のロードが完了したら準備完了フラグを立てる
            console.log("image load.");
        }, false);
        testImage.src = "./res/a.png";

        util.setEventListener(onPress, onMove, onRelease);
    }

    function onPress(x, y) {
        //       console.log("press:" + x + "," + y);
        px = x;
        py = y;
        oprStartX = x;
        oprStartY = y;
    }

    function onMove(x, y) {
        //        console.log("move:" + x + "," + y);
        px = x;
        py = y;
        ctrlX = x - oprStartX;
        ctrlY = y - oprStartY;
        //        console.log("ctrl:" + ctrlX + "," + ctrlY);
    }

    function onRelease(x, y) {
        //       console.log("release:" + x + "," + y);
        px = x;
        py = y;
        ctrlX = 0;
        ctrlY = 0;
        spd = 0;
    }

    /**
     * フレーム更新処理
     */
    function updateFrame() {
        // 画面クリア
        util.drawRect(0, 0, 320, 400, "#808080ff");
        util.drawRect(0, 0, 320, 240, "#f0f0f0ff");

        cntr++;

        util.drawText("test " + cntr, 20, 20, "#00000040");
        util.drawFan(10, 10, 40, 0.0, Math.PI / 2, "#00000040");

        util.drawLine(0, 0, px, py, "#ff000080", 4);

        util.drawRect(160, 120, ctrlX, ctrlY, "#00008080");

        //        util.drawImage(testImage, 100, 100, 16, 16);
        let r = 0;
        if (ctrlX > 1) {
            r = ctrlX * 0.005;
            if (r > 0.05) {
                r = 0.05;
            }
            rot += r;
        } else if (ctrlX < -1) {
            r = ctrlX * 0.005;
            if (r < -0.05) {
                r = -0.05;
            }
            rot += r;
        } else {
        }
        if (ctrlY < -1) {
            spd = ctrlY * -0.1;
            if (spd > 2) {
                spd = 2;
            }
        } else if (ctrlY > 1) {
            spd = ctrlY * -0.1;
            if (spd < -2) {
                spd = -2;
            }
        }
        //        console.log("ctrlY:" + ctrlY + " spd:" + spd + " rot:" + rot);


        posX += Math.cos(rot) * spd;
        posY += Math.sin(rot) * spd;

        util.drawRotatedImage(testImage, posX, posY, 16, 16, rot);

        /**
         * フレーム更新処理再登録
         */
        requestAnimationFrame(updateFrame);
    }
})();
