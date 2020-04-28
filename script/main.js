(() => {
    var cntr = 0;

    var px = 0;
    var py = 0;
    var mouseFlag = false;

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
        util = new Canvas2DUtility(document.getElementById('serverView'));

        initialize();

        updateFrame();
    }, false);

    function initialize() {
        canvas = util.canvas;
        canvas.addEventListener('mousedown', function (e) {
            mouseFlag = true;
            onPress(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        });
        canvas.addEventListener('mousemove', function (e) {
            if (mouseFlag) {
                onPress(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            }
        });
        canvas.addEventListener('mouseup', function (e) {
            mouseFlag = false
        });
        canvas.addEventListener('touchstart', function (e) {
            console.log("touchstart");
            onPress(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        });
        canvas.addEventListener('touchmove', function (e) {
            var touch = e.touches[0];
            console.log("touchmove" + touch.clientX + "," + touch.clientY);
            onPress(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
        });
        canvas.addEventListener('touchend', function (e) {
            console.log("touchend");
        });

        /* canvas外に対するタッチイベントを無効化 */
        var bgView = document.getElementById("bgView");
        bgView.addEventListener('touchstart', function (e) { e.preventDefault(); });
        bgView.addEventListener('touchmove', function (e) { e.preventDefault(); });
        bgView.addEventListener('touchend', function (e) { e.preventDefault(); });
    }

    function onPress(x, y) {
        px = x;
        py = y;
    }

    /**
     * フレーム更新処理
     */
    function updateFrame() {
        // 画面クリア
        util.drawRect(0, 0, 320, 240, "#f0f0f0ff");

        cntr++;

        util.drawText("test " + cntr, 20, 20, "#00000040");
        util.drawFan(10, 10, 40, 0.0, Math.PI / 2, "#00000040");


        util.drawLine(0, 0, px, py, "#ff000080", 4);

        requestAnimationFrame(updateFrame);

        //        console.log(px + "," + py);
    }
})();
