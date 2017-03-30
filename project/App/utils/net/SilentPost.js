'use strict';

const Des = require('@remobile/react-native-des');
const KEY = CONSTANTS.DES_KEY;

module.exports = (url, parameter, success, failed) => {
    Des.encrypt(JSON.stringify(parameter), KEY, (base64) => {
        const param = base64;
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain',
            },
            body: param,
        })
        .then((response) => response.text())
        .then((base64) => {
            // console.log("base64:",base64);
            success && Des.decrypt(base64, KEY, (jsonString) => {
                let json = {};
                try {
                    json = JSON.parse(jsonString);
                } catch (error) {
                    failed && failed();
                }
                // console.log("recv:", json);
                success(json);
            }, () => {
                failed && failed();
            });
        })
        .catch((error) => {
            failed && failed();
        });
    }, () => {
        failed && failed();
    });
};
