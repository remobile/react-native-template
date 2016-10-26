const images = [
    require('./0.png'),
    require('./1.png'),
    require('./2.png'),
    require('./3.png'),
    require('./4.png'),
    require('./5.png'),
    require('./6.png'),
    require('./7.png'),
    require('./8.png'),
    require('./9.png'),
    require('./10.png'),
    require('./11.png'),
    require('./12.png'),
    require('./13.png'),
    require('./14.png'),
    require('./15.png'),
    require('./16.png'),
    require('./17.png'),
    require('./18.png'),
    require('./19.png'),
    require('./20.png'),
    require('./21.png'),
    require('./22.png'),
    require('./23.png'),
    require('./24.png'),
    require('./25.png'),
    require('./26.png'),
    require('./27.png'),
    require('./28.png'),
    require('./29.png'),
    require('./30.png'),
    require('./31.png'),
    require('./32.png'),
    require('./33.png'),
    require('./34.png'),
    require('./35.png'),
    require('./36.png'),
    require('./37.png'),
    require('./38.png'),
    require('./39.png'),
    require('./40.png'),
    require('./41.png'),
    require('./42.png'),
    require('./43.png'),
    require('./44.png'),
    require('./45.png'),
    require('./46.png'),
    require('./47.png'),
    require('./48.png'),
    require('./49.png'),
    require('./50.png'),
    require('./51.png'),
    require('./52.png'),
    require('./53.png'),
    require('./54.png'),
    require('./55.png'),
    require('./56.png'),
    require('./57.png'),
    require('./58.png'),
    require('./59.png'),
    require('./60.png'),
    require('./61.png'),
    require('./62.png'),
    require('./63.png'),
    require('./64.png'),
    require('./65.png'),
    require('./66.png'),
    require('./67.png'),
    require('./68.png'),
    require('./69.png'),
    require('./70.png'),
    require('./71.png'),
    require('./72.png'),
    require('./73.png'),
    require('./74.png'),
    require('./75.png'),
    require('./76.png'),
];

const ROWS = 3, COLS = 7;
const countPerPage = ROWS*COLS-1;
var count = Math.floor((images.length-1)/countPerPage+1)*countPerPage+1;
let data = [], page=[], rowList=[];
let col = 0, row = 0;
for (var i = 0; i < count; i++) {
    var img = images[i];
    if (row===ROWS-1 && col===COLS-1) {
        rowList.push({isDelete:true});
        page.push(rowList);
        data.push(page);
        rowList = [{index: i, img: img}];
        page = [];
        col = 1;
        row = 0;
    } else {
        rowList.push({index: i, img: img});
        if (col === COLS-1) {
            page.push(rowList);
            row++;
            col = 0;
            rowList = [];
        } else {
            col++;
        }
    }
}

module.exports = {
    data,
    images,
};
