'use strict';

function GET(url, success, error) {
    console.log("getSend:", url);
    app.showProgressHUD();
    fetch(url,  {
        method: 'get',
        headers: {
            'apikey': '41a92c6e398afc79efd35252a630639b'
        },
    })
    .then((response) => response.json())
    .then((json) => {
        console.log("getRecv:", json);
        app.dismissProgressHUD();
        success && success(json);
    })
    .catch((err) => {
        app.dismissProgressHUD();
        if (!error||!error(err)) {
            Toast("网络出错");
        }
    });
}

module.exports = GET;
