'use strict';
var React = require('react');var ReactNative = require('react-native');
var {
    AsyncStorage,
    Platform,
} = ReactNative;
var moment = require('moment');
var EventEmitter = require('EventEmitter');
var fs = require('react-native-fs');

var DocumentPath = Platform.OS==="android" ? fs.ExternalStorageDirectoryPath+"/mediaRecodes/": fs.DocumentDirectoryPath+"/mediaRecodes/";
console.log(DocumentPath);

const ITEM_NAME = "mediaRecordeFiles";
const ITEM_NAME_INDEX = "mediaRecordeFilesIndex";

class Manager extends EventEmitter {
	constructor() {
        super();
        this.get();
	}
    get() {
        return new Promise(async(resolve, reject)=>{
            var data = {};
            var index = 0;
            try {
                var infoStr = await AsyncStorage.getItem(ITEM_NAME);
                data = JSON.parse(infoStr||'{}');
            } catch(e) {
                data = {};
            }
            this.data = data;
            try {
                var infoStr = await AsyncStorage.getItem(ITEM_NAME_INDEX);
                index = JSON.parse(infoStr||'0');
            } catch(e) {
                index = 0;
            }
            this.index = index;
            this.tempItem = {images:[], videos:[]};
        });
    }
    resetItem() {
        this.tempItem = {images:[], videos:[]};
    }
	checkRootDir() {
		return new Promise(async(resolve, reject) => {
			const exist = await fs.exists(DocumentPath);
			if (!exist) {
				await fs.mkdir(DocumentPath);
			}
			await fs.mkdir(DocumentPath);
            resolve(true);
        });
    }
    addMediaFile(path, isImage) {
        return new Promise(async(resolve, reject) => {
            this.index++;
            var expandName = path.replace(/^.*(\..*)$/, '$1');
            await AsyncStorage.setItem(ITEM_NAME_INDEX, JSON.stringify(this.index));
            var item = {
                mediaId: this.index,
                url: DocumentPath+this.index+expandName,
                local: true,
            };
            await fs.copyFile(path, item.url);
            var taskItem = this.tempItem;
            var list = isImage?taskItem.images:taskItem.videos;
            list.push(item);
            resolve(list);
        });
    }
    removeMediaFile(accusationId, url, isImage, noNeedChecked) {
        return new Promise(async(resolve, reject) => {
            if (noNeedChecked ? false : await fs.exists(url)) {
                await fs.unlink(url);
            }
            let taskItem = this.data[accusationId];
            if (taskItem) {
                let list = isImage?taskItem.images:taskItem.videos;
                if (list) {
                    list = _.reject(list, (item)=>item.url===url);
                    if (list.length) {
                        if (isImage) {
                            taskItem.images = list;
                        } else {
                            taskItem.videos = list;
                        }
                    } else {
                        if (isImage) {
                            if (taskItem.videos.length) {
                                taskItem.images = [];
                            } else {
                                delete this.data[accusationId];
                                this.emit('MEDIA_UPLOAD_ALL_EVENT', {accusationId});
                            }
                        } else {
                            if (taskItem.images.length) {
                                taskItem.videos = [];
                            } else {
                                delete this.data[accusationId];
                                this.emit('MEDIA_UPLOAD_ALL_EVENT', {accusationId});
                            }
                        }
                    }
                    await AsyncStorage.setItem(ITEM_NAME, JSON.stringify(this.data));
                }
            }
            resolve();
        });
    }
    async startTryUploadTasks(accusationId) {
        this.data[accusationId] = this.tempItem;
        await AsyncStorage.setItem(ITEM_NAME, JSON.stringify(this.data));
        setTimeout(()=>this.tryUploadTasks(), 1000);
    }
    tryUploadTasks() {
        if (!this.isUpLoading) {
            const accusationId =  _.keys(this.data)[0];
            if (accusationId) {
                const {connect, fee} = app.net.info;
                const {onlyWifiUpload} = app.setting.data;
                if (connect) {
                    if (!(fee && onlyWifiUpload)) {
                        this.isUpLoading = true;
                        this.tryUploadMediaFile(accusationId);
                    }
                }
            }
        }
    }
    tryUploadMediaFile(accusationId) {
        const task = this.data[accusationId];
        if (task) {
            const {images, videos} = task;
            if (images.length) {
                this.uploadMediaFile(accusationId, images[0], true);
            } else if (videos.length) {
                this.uploadMediaFile(accusationId, videos[0], false);
            }
        } else {
            const accusationId =  _.keys(this.data)[0];
            if (accusationId) {
                this.tryUploadMediaFile(accusationId);
            } else {
                this.isUpLoading = false;
            }
        }
    }
    uploadMediaFile(accusationId, media, isImage) {
        const {url, mediaId} = media;
        const options = {
            fileKey: 'file',
            fileName: url.substr(url.lastIndexOf('/')+1),
            mimeType: isImage ? 'image/jpeg' : 'm4a',
            params: {
                type: isImage ? 0 : 1,
            }
        };
        UPLOAD(url, app.route.ROUTE_UPLOAD_MEDIA_FILE, options, (progress) => {
            this.emit('MEDIA_UPLOAD_PROGREES_EVENT', {accusationId, isImage, mediaId, progress:parseInt(progress.loaded*100/progress.total)});
        }, (data)=> {
            this.removeMediaFile(accusationId, url, isImage).then(()=>{
                this.emit('MEDIA_UPLOAD_UPLOADED_EVENT', {accusationId, isImage, url: data.context.url, mediaId});
                this.tryUploadMediaFile(accusationId);
            });
        }, async (error)=> {
            const exist = await fs.exists(url);
			if (!exist) {
                this.removeMediaFile(accusationId, url, isImage, true).then(()=>{
                    this.tryUploadMediaFile(accusationId);
                });
			} else {
                this.isUpLoading = false;
                Toast("上传失败, 需要在设置里面启动上传");
            }
        });
    }
    onNetChange(info) {
        if (info.connect) {
            this.tryUploadTasks();
        } else {
            this.isUpLoading = false;
        }
    }
    getMediaFile(accusationId) {
        return this.data[accusationId]|{images:[], videos:[]};
    }
    clear() {
        this.data = {};
        AsyncStorage.removeItem(ITEM_NAME);
    }
}

module.exports = new Manager();
