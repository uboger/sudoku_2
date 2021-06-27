$().ready(function () {
    init();

    //鼠标进入宫格区域显示头部数字
    $(".content_class").unbind();
    /**
     * 1、当鼠标进入.content_class div 的时候显示头部div
     * 2、当鼠标离开.content_class div 的时候隐藏头部div
     * 3、当已经点击click 时候离开的时候还是显示头部div
     */
    $(".content_class").bind("mouseover", function () {
        $(".content_head_class").css("display", 'block');
    });
    /**
     * 1、显示头部div
     * 2、
     */
    $(".content_class").bind("mouseout", function () {
        var readyNumbers = getReady_nos();
        $(".unit_class_over").attr("class", "unit_class");
        if (isClick()) {
            $('#content_head').children().remove();
            for (var k = 0; k < readyNumbers.length; k++) {
                var unit_box = $('<div class="unit_class_head"></div>');

                $(unit_box).text(readyNumbers[k]);
                $(unit_box).appendTo($('#content_head'));
            }
            //$(".unit_class_over").attr("class", "unit_class");
            //$(this).attr("class", "unit_class_over");
            $(".unit_class_head").unbind();
            $(".unit_class_head").bind('click', function () {
                var val = $(this).text();
                //alert(val);
                if (isClick()) {
                    $(".unit_class_click").text(val);
                    fill_num(getId(), val / 1);
                } else {
                    alert("你还没有点击要填入数字的方块！")
                }

            });
            $(".content_head_class").css("display", 'block');
        } else {
            $(".content_head_class").css("display", 'none');
        }
    });
    //鼠标点击事件
    $(".unit_class").unbind();
    $(".unit_class").bind("click", function () {
        var position = $(this).attr("value").split(",");
        var readyNumbers = getReadyNumbers(position);
        //alert(getId()[0]/1+getId()[1]/1);
        //init();.
       // $(".unit_class_click").attr("class", "unit_class");
        if (isClick()) {
            if(getId()[0]==position[0]&&getId()[1]==position[1]){
                $(".unit_class_click").attr("class", "unit_class").attr("title", "单击一下就可以填入数字啦！");
                setClick(false);
                clearId();

            }else{
                $(".unit_class_click").attr("class", "unit_class").attr("title", "单击一下就可以填入数字啦！");
                $(this).attr("class", "unit_class_click").attr("title", "单击上面蓝色区域的数字进行填充");
                setClick(true);
                setId(position);
                setReady_numbers(readyNumbers)
            }
        } else {
            $(this).attr("class", "unit_class_click").attr("title", "单击上面蓝色区域的数字进行填充");
            setClick(true);
            setId(position);
            setReady_numbers(readyNumbers)
        }

    });
    //鼠标光标在格子内事件
    ////$(".unit_class").unbind();
    $(".unit_class").bind('mouseover', function () {
        var position = $(this).attr('value').split(',');
        var readyNumbers = getReadyNumbers(position);
        $('#content_head').children().remove();
        for (var k = 0; k < readyNumbers.length; k++) {
            var unit_box = $('<div class="unit_class_head"></div>');

            $(unit_box).text(readyNumbers[k]);
            $(unit_box).appendTo($('#content_head'));
        }
        $(".unit_class_over").attr("class", "unit_class").attr("title", "单击一下就可以填入数字啦！");
        $(this).attr("class", "unit_class_over");
        $(".unit_class_head").unbind();
        $(".unit_class_head").bind('click', function () {
            var val = $(this).text();
            //alert(val);
            if (isClick()) {
                $(".unit_class_click").text(val);
                fill_num(getId(), val / 1);
            } else {
                alert("你还没有点击要填入数字的方块！")
            }

        });
    });

});
setReady_numbers = function (arrs){
    temp.ready_no = arrs;
}
getReady_nos = function (){
    return temp.ready_no;
}
fill_num = function (id, val) {
    squer_numbers[id[0]][id[1]] = val;
}
var temp = {
    isClick: false,
    id: [],
    ready_no:[]
}
var init = function () {
    for (var i = 0; i < 9; i++) {
        for (var k = 0; k < 9; k++) {
            var unit_box = $('<div class="unit_class"></div>');
            $id = '' + (i * 9 + k);
            $(unit_box).appendTo($('#content')).attr('id', $id).attr("title", "单击一下就可以填入数字啦！").attr('value', '' + i + ',' + k);
        }
        //alert();
    }
}

//去除已经填写的数字
getReadyNumbers = function (position) {
    var __x = position[0] / 1;
    var __y = position[1] / 1;
    var no_x = getRow(__x);
    var no_y = getColumn(__y);
    var no_box = getUnitBox(__x, __y);
    return getUniqueNumber(no_x, no_y, no_box);
}
getUniqueNumber = function (no_x, no_y, no_box) {
    var i = 0;
    unique_no = [1,2,3,4,5,6,7,8,9];
    meger_arr = [no_box,no_x, no_y];
    for (var k = 0; k < meger_arr.length; k++) {
        for (var j = 0; j < meger_arr[k].length; j++) {
            if (isRepeatConsult(meger_arr[k][j], unique_no)) {
                unique_no.remove(meger_arr[k][j]);
            }
        }
    }
    return unique_no;
}
setClick = function (flag) {
    temp.isClick = flag;
}
setId = function (position) {
    temp.id = position;
}
getId = function () {
    return temp.id;
}
clearId = function () {
    temp.id = [];
}
var isRepeatConsult = function (consult, arrs) {
    for (var i = 0; i < arrs.length; i++) {
        if (arrs[i] == consult) {
            return true;//出现重复
        }
    }
    return false;
}
/**
 * 检查行或者列是否重复
 * 傳入要檢查的数组
 * @param arr_row
 * @returns {boolean}重復返回true不重復返回false
 */
var isRepeat = function (arrs) {
    for (var i = 0; i < arrs.length; i++) {
        for (var k = 0; k < arrs.length; k++) {
            if (arrs[i] == arrs[k] && i != k) {
                return true;//出现重复
            }
        }
    }
    return false;
}
var isRepeatColumn = function (arr_col) {

}
var isClick = function () {
    return temp.isClick;
}
/**
 * 检查一个九宫格是否有重复
 * @param arr_unb 一個九宮格里的所有數子
 * @returns {boolean}重復返回true不重復返回false
 */
var isRepeatUnitBox = function (arr_unb) {
    return false;
}
/**
 * 根據索引查找當前行
 * @param i
 * @returns {number[]}
 */
var getRow = function (index) {
    return squer_numbers[index];
}
/**
 * 根據索引查找當前列
 * @param i
 * @returns {number[]}
 */
var getColumn = function (index) {
    var numbers = [];
    for (var i = 0; i < squer_numbers.length; i++) {
        numbers[i] = squer_numbers[i][index];
    }
    return numbers;
}
var squer_numbers = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var getUnitBox = function (_x, _y) {
    var re_no = [];
    //第一宫
    if (_x < 3 && _y < 3) {
        re_no = [squer_numbers[0][0], squer_numbers[0][1], squer_numbers[0][2],
            squer_numbers[1][0], squer_numbers[1][1], squer_numbers[1][2],
            squer_numbers[2][0], squer_numbers[2][1], squer_numbers[2][2]
        ];
        //第二宫
    } else if (_y >= 3 && _y < 6 && _x < 3) {
        re_no = [squer_numbers[0][3], squer_numbers[0][4], squer_numbers[0][5],
            squer_numbers[1][3], squer_numbers[1][4], squer_numbers[1][5],
            squer_numbers[2][3], squer_numbers[2][4], squer_numbers[2][5]
        ];

        //第三宫
    } else if (_y >= 6 && _y < 9 && _x < 3) {
        re_no = [squer_numbers[0][6], squer_numbers[0][7], squer_numbers[0][8],
            squer_numbers[1][6], squer_numbers[1][7], squer_numbers[1][8],
            squer_numbers[2][6], squer_numbers[2][7], squer_numbers[2][8]
        ];
        //第四宫
    } else if (_y < 3 && _x >= 3 && _x < 6) {
        re_no = [squer_numbers[3][0], squer_numbers[3][1], squer_numbers[3][2],
            squer_numbers[4][0], squer_numbers[4][1], squer_numbers[4][2],
            squer_numbers[5][0], squer_numbers[5][1], squer_numbers[5][2]
        ];
        //第五宫
    } else if (_y >= 3 && _y < 6 && _x >= 3 && _x < 6) {
        re_no = [squer_numbers[3][3], squer_numbers[3][4], squer_numbers[3][5],
            squer_numbers[4][3], squer_numbers[4][4], squer_numbers[4][5],
            squer_numbers[5][3], squer_numbers[5][4], squer_numbers[5][5]
        ];
        //第六宫
    } else if (_y >= 6 && _y < 9 && _x >= 3 && _x < 6) {
        re_no = [squer_numbers[3][6], squer_numbers[3][7], squer_numbers[3][8],
            squer_numbers[4][6], squer_numbers[4][7], squer_numbers[4][8],
            squer_numbers[5][6], squer_numbers[5][7], squer_numbers[5][8]
        ];
        //第7宫
    } else if (_y < 3 && _x >= 6 && _x < 9) {
        re_no = [squer_numbers[6][0], squer_numbers[6][1], squer_numbers[6][2],
            squer_numbers[7][0], squer_numbers[7][1], squer_numbers[7][2],
            squer_numbers[8][0], squer_numbers[8][1], squer_numbers[8][2]
        ];
        //第8宫
    } else if (_y >= 3 && _y < 6 && _x >= 6 && _x < 9) {
        re_no = [squer_numbers[6][3], squer_numbers[6][4], squer_numbers[6][5],
            squer_numbers[7][3], squer_numbers[7][4], squer_numbers[7][5],
            squer_numbers[8][3], squer_numbers[8][4], squer_numbers[8][5]
        ];
        //第9宫
    } else if (_y >= 6 && _y < 9 && _x >= 6 && _x < 9) {
        re_no = [squer_numbers[6][6], squer_numbers[6][7], squer_numbers[6][8],
            squer_numbers[7][6], squer_numbers[7][7], squer_numbers[7][8],
            squer_numbers[8][6], squer_numbers[8][7], squer_numbers[8][8]
        ];
    }
    return re_no;

}


//alert(getRow(0))
//alert(getColumn(1))
//alert(getUnitBox(0,7))
//var ary = new Array("1111", "222", "33", "111", "22","22");
//alert(__isRepeat(ary) ? '重复' : '不重复');
// 验证重复元素，有重复返回true；否则返回false
function _isRepeat(_arr) {
    for (var i = 0; i < _arr.length; i++) {
        for (var k = 0; k < _arr.length; k++) {
            if (_arr[i] == _arr[k] && i != k) {
                return true;//出现重复
            }
        }
    }
    return false;
}

/**
 * 这种写法不理解
 * 抽空再去琢磨琢磨
 * @param _arr
 * @returns {boolean}
 * @private
 */
function __isRepeat(_arr) {
    var hash = {};
    for (var s in _arr) {
        alert(hash[_arr[s]]);
        if (hash[_arr[s]]) {
            return true;
        }
        hash[_arr[s]] = true;
    }
    return false;
}
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            return i;
        }
    }
    return -1;
};
// 通过索引删除数组元素
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
