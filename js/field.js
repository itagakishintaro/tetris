// フィールド----------------------------------------------------------------------
//フィールド生成
function createField() {
    field = new Sprite(STAGE_WIDTH, STAGE_HEIGHT);
    field.fill = [];
    field.color = [];
    for (var row = 0; row < 20; row++) {
        field.fill[row] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        field.color[row] = [FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR, FIELD_COLOR];
    }
    field.x = GAME_MARGIN;
    field.y = GAME_MARGIN;
    field._style.zindex = 0;
    field.image = createFieldSurface();
    scene.addChild(field);
}

//フィールドのSurface生成
function createFieldSurface() {
    var field_surface = new Surface(STAGE_WIDTH, STAGE_HEIGHT);
    // 初期化
    field_surface.context.fillStyle = scene.backgroundColor;
    field_surface.context.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    // グリッド描画
    for (var y = GRID_MARGIN; y < STAGE_HEIGHT; y = y + GRID_SIZE) {
        for (var x = GRID_MARGIN; x < STAGE_WIDTH; x = x + GRID_SIZE) {
            field_surface.context.fillStyle = field.color[(y - GRID_MARGIN) / GRID_SIZE][(x - GRID_MARGIN) / GRID_SIZE];
            field_surface.context.fillRect(x, y, GRID_FILL_SIZE, GRID_FILL_SIZE);
        }
    }
    return field_surface;
}