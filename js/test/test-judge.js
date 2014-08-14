module("canDown", {
    setup: function() {
        var BLOCKS = [];
        BLOCKS[0] = [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        ];
        //フィールド
        field = [];
        field.fill = [];
        for (var row = 0; row < 20; row++) {
            field.fill[row] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        //ブロック
        block = [];
        block.x = GAME_MARGIN + GRID_SIZE * 4;
        block.y = 0;
        block.field_x = 4;
        block.field_y = -4;
        block.type = 0;
        block.rotation = 0;
    }
});
test("初期状態", function() {
    block.y = GAME_MARGIN + GRID_SIZE * 17;
    block.field_y = 17;
    deepEqual(canDown(), true, '１行前');
    block.y += GRID_SIZE;
    block.field_y = 18;
    deepEqual(canDown(), false, '一番下');
});