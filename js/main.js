window.onload = function() {
    enchant();
    game = enchant.Core(GAME_WIDTH, GAME_HEIGHT);
    game.fps = FPS;
    game.speed = speed;
    game.keybind(90, "z");
    game.keybind(88, "x");
    scene = game.rootScene;
    scene.backgroundColor = "white";
    game.preload('sounds/bomb1.wav');
    game.preload('sounds/se4.wav');
    game.onload = function() {
        // メッセージ
        drawPointMessage();
        drawGameoverMessage();
        // フィールド、ブロックの描画
        createField();
        block = createBlock();
        // イベントの追加
        var counter = 0;
        scene.addEventListener(Event.ENTER_FRAME, function() {
            counter++;
            if (inField() && counter % key_speed === 0) {
                key();
            }
            if (counter % speed === 0) {
                fall();
            }
            if (counter % 1000 === 0 && 0 < speed){
                speed--;
            }
        });
    };
    game.start();
};