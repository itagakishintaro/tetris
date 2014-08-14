function drawPointMessage() {
    point_message = new Label("ポイント：" + point + "点");
    point_message.x = GAME_WIDTH - GAME_MARGIN + GRID_SIZE;
    point_message.y = GRID_SIZE;
    scene.addChild(point_message);
}

function drawGameoverMessage() {
    game_over_message = new Label("");
    game_over_message.color = "red";
    game_over_message.x = GAME_WIDTH - GAME_MARGIN + GRID_SIZE;
    game_over_message.y = GRID_SIZE * 3;
    scene.addChild(game_over_message);
}