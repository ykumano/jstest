(() => {
    var cntr = 0;

    var px = 0;
    var py = 0;

    /**
     * ユーティリティクラス
     */
    var util = null;

    let canvas = null;

    /**
     * Window読込み完了ハンドラ
     */
    window.addEventListener('load', () => {
        console.log("on load");

        // ユーティリティクラスを初期化
        util = new Canvas2DUtility(document.getElementById('serverView'), window);

        initialize();

        updateFrame();
    }, false);

    function initialize() {
        canvas = util.canvas;

        util.initEvent(onPress, onMove, onRelease);
    }

    function onPress(x, y) {
        console.log("press:" + x + "," + y);
        px = x;
        py = y;
    }

    function onMove(x, y) {
        console.log("move:" + x + "," + y);
        px = x;
        py = y;
    }

    function onRelease(x, y) {
        console.log("release:" + x + "," + y);
        px = x;
        py = y;
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

        requestAnimationFrame(updateFrame);

        //        console.log(px + "," + py);
    }
})();
