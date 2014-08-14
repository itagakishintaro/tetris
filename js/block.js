// ブロック----------------------------------------------------------------------
//ブロック生成
function createBlock() {
    var _block = new Sprite(BLOCK_SIZE, BLOCK_SIZE);
    _block.x = GAME_MARGIN + GRID_SIZE * 4;
    _block.y = 0;
    _block.field_x = 4;
    _block.field_y = -4;
    _block._style.zindex = 1;
    _block.type = Math.floor(Math.random() * BLOCKS.length);
    _block.rotation = 0;
    _block.image = createBlockSurface(BLOCKS[_block.type][_block.rotation], BLOCK_COLORS[_block.type]);
    scene.addChild(_block);
    return _block;
}

//ブロックのSurface生成
function createBlockSurface(array, color) {
    var block_surface = new Surface(BLOCK_SIZE, BLOCK_SIZE);
    block_surface.context.fillStyle = color;
    $.each(array, function(y_index, array) {
        var y = y_index * GRID_SIZE + GRID_MARGIN;
        $.each(array, function(x_index, value) {
            if (value) {
                var x = x_index * GRID_SIZE + GRID_MARGIN;
                block_surface.context.fillRect(x, y, GRID_FILL_SIZE, GRID_FILL_SIZE);
            }
        });
    });
    return block_surface;
}