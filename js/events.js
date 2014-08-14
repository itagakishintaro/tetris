// イベント----------------------------------------------------------------------
//落下イベント
function fall() {
    if (block.y === 0) { // ステージイン
        while (!inField()) {
            block.y += GRID_SIZE;
            block.field_y = (block.y - GAME_MARGIN) / GRID_SIZE;
        }
        if (canDown()) {
            next_block = createBlock();
        } else {
            afterFall();
        }
    } else if (canDown()) { // 落下処理
        block.y += GRID_SIZE;
        block.field_y = (block.y - GAME_MARGIN) / GRID_SIZE;
    } else { // 落下後の処理
        afterFall();
        if (0 < checkLine().length) {
            point += POINTS[checkLine().length - 1];
            point_message.text = "ポイント：" + point + "点";
            clearLine(checkLine());
        }
    }
}

//落下後の処理
function afterFall() {
    var array = BLOCKS[block.type][block.rotation];
    var color = BLOCK_COLORS[block.type];
    var isGameOver = false;
    $.each(array, function(y, values) {
        $.each(values, function(x, value) {
            if (y + block.field_y < 20 && x + block.field_x < 10) {
                field.fill[y + block.field_y][x + block.field_x] += array[y][x];
                if (array[y][x]) {
                    field.color[y + block.field_y][x + block.field_x] = color;
                }
                if (1 < field.fill[y + block.field_y][x + block.field_x]) {
                    isGameOver = true;
                }
            }
        });
    });
    if(isGameOver){
        gameOver();
    } else {
        reDraw();
        block = next_block;
    }
}

//画面を再描画
function reDraw() {
    scene.removeChild(next_block);
    scene.removeChild(block);
    scene.removeChild(field);
    field.image = createFieldSurface();
    scene.addChild(field);
    scene.addChild(block);
    scene.addChild(next_block);
}

//指定行を削除
function clearLine(lines) {
    game.assets['sounds/bomb1.wav'].play();
    $.each(lines, function(index, y) {
        for (var i = y; 0 < i; i--) {
            field.fill[i] = field.fill[i - 1];
            field.color[i] = field.color[i - 1];
        }
        field.fill[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        field.color[0] = [FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR];
    });
    reDraw();
}

//ケームオーバー処理
function gameOver() {
    game.assets['sounds/se4.wav'].play();
    game_over_message.text = "GAME OVER!";
    game.stop();
}

//キーイベント
function key() {
    if (game.input.right && canRight()) {
        block.x += GRID_SIZE;
        block.field_x = (block.x - GAME_MARGIN) / GRID_SIZE;
    }
    if (game.input.left && canLeft()) {
        block.x -= GRID_SIZE;
        block.field_x = (block.x - GAME_MARGIN) / GRID_SIZE;
    }
    if (game.input.down && canDown()) {
        block.y += GRID_SIZE;
        block.field_y = (block.y - GAME_MARGIN) / GRID_SIZE;
    }
    if (game.input.up && canDown()) {
        while (canDown()) {
            block.y += GRID_SIZE;
            block.field_y = (block.y - GAME_MARGIN) / GRID_SIZE;
        }
    }
    if (game.input.x && canRightRotate()) {
        rightRotate();
    }
    if (game.input.z && canLeftRotate()) {
        leftRotate();
    }
}

function rightRotate() {
    block.rotation = (block.rotation + 1) % (BLOCKS[block.type].length);
    block.image = createBlockSurface(BLOCKS[block.type][block.rotation], BLOCK_COLORS[block.type]);
}

function leftRotate() {
    block.rotation = (block.rotation + BLOCKS[block.type].length - 1) % (BLOCKS[block.type].length);
    block.image = createBlockSurface(BLOCKS[block.type][block.rotation], BLOCK_COLORS[block.type]);
}