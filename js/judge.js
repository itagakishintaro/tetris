// 判定----------------------------------------------------------------------
//下に移動可能かの判定
function canDown() {
    return BLOCKS[block.type][block.rotation].every(function(values, y) {
        return values.every(function(value, x) {
            if (!value) { // ブロックの空の部分
                return true;
            } else if (19 <= block.field_y + y) { // 端だったら
                return false;
            } else { // 下が埋まっているかどうかの判定
                return field.fill[block.field_y + y + 1][block.field_x + x] + value <= 1;
            }
        });
    });
}

//右に移動可能かの判定
function canRight() {
    return BLOCKS[block.type][block.rotation].every(function(values, y) {
        return values.every(function(value, x) {
            if (!value) { // ブロックの空の部分
                return true;
            } else if (9 <= block.field_x + x) { // 端だったら
                return false;
            } else { // 右が埋まっているかどうかの判定
                return field.fill[block.field_y + y][block.field_x + x + 1] + value <= 1;
            }
        });
    });
}

//左に移動可能かの判定
function canLeft() {
    return BLOCKS[block.type][block.rotation].every(function(values, y) {
        return values.every(function(value, x) {
            if (!value) { // ブロックの空の部分
                return true;
            } else if (block.field_x + x <= 0) { // 端だったら
                return false;
            } else { // 左が埋まっているかどうかの判定
                return field.fill[block.field_y + y][block.field_x + x - 1] + value <= 1;
            }
        });
    });
}

//右回転可能かの判定
function canRightRotate() {
    return BLOCKS[block.type][(block.rotation + 1) % BLOCKS[block.type].length].every(function(values, y) {
        return values.every(function(value, x) {
            if (!value) { // ブロックの空の部分
                return true;
            } else if (block.field_x + x < 0 || 10 <= block.field_x + x || block.field_y + y < 0 || 20 <= block.field_y + y) { // フィールドからはみ出てたら
                return false;
            } else { // 埋まっているかどうかの判定
                return field.fill[block.field_y + y][block.field_x + x] === 0;
            }
        });
    });
}

//左回転可能かの判定
function canLeftRotate() {
    return BLOCKS[block.type][(block.rotation + BLOCKS[block.type].length - 1) % BLOCKS[block.type].length].every(function(values, y) {
        return values.every(function(value, x) {
            if (!value) { // ブロックの空の部分
                return true;
            } else if (block.field_x + x < 0 || 10 <= block.field_x + x || block.field_y + y < 0 || 20 <= block.field_y + y) { // フィールドからはみ出てたら
                return false;
            } else { // 埋まっているかどうかの判定
                return field.fill[block.field_y + y][block.field_x + x] === 0;
            }
        });
    });
}

//フィールドの中かどうかの判定
function inField() {
    return BLOCKS[block.type][block.rotation].every(function(values, y) {
        return values.every(function(value, x) {
            if (!value) { // ブロックの空の部分
                return true;
            } else { // y軸がフィールド内か
                return 0 <= block.field_y + y;
            }
        });
    });
}

//行がそろったかどうかの判定
function checkLine(){
    var lines = [];
    $.each(field.fill, function(y, values){
        if(values.every(function(value, x){
            return value;
        })){
            lines.push(y);
        }
    });
    return lines;
}


