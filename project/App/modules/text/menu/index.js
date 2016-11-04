var icons = [
    {
        img: require('./picture.png'),
        text: '图片',
    },
    {
        img: require('./location.png'),
        text: '位置',
    },
    {
        img: require('./card.png'),
        text: '名片',
    },
]

const ROWS = 2, COLS = 4;
const countPerPage = ROWS*COLS;
var count = Math.floor((icons.length-1)/countPerPage+1)*countPerPage+1;
let data = [], page=[], rowList=[];
let col = 0, row = 0;
for (var i = 0; i < count; i++) {
    var icon = icons[i];
    rowList.push({index: i, icon});
    col++;
    if (col === COLS) {
        page.push(rowList);
        row++;
        col = 0;
        rowList = [];
        if (row===ROWS) {
            data.push(page);
            page = [];
            row = 0;
        }
    }
}

module.exports = {
    data,
    icons,
};
