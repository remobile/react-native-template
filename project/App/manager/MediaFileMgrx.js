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
/*
 *添加图片或者视频时，使用接口addMediaFile，用户选择提交，用户立即退出，在后台提交，如果提交一个文件成功，
 *调用removeMediaFile删除文件和记录，如果提交失败者不修改，检测到网络了之后重传，
 *当所有的都上传成功之后，发送通知：MEDIA_UPLOAD_ALL_EVENT， 将该任务的状态改为待审核
 *
 *显示待提交列表时，先显示服务器下发的图片和视频，然后再显示本地的图片和视频，如果在上传中，需要显示上传进度
 */

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
        });
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
    addMediaFile(taskId, name, description, path, location, isImage) {
        return new Promise(async(resolve, reject) => {
            this.index++;
            const {address, latitude, longitude} = location;
            var expandName = path.replace(/^.*(\..*)$/, '$1');
            await AsyncStorage.setItem(ITEM_NAME_INDEX, JSON.stringify(this.index));
            var item = {
                mediaId: this.index,
                name,
                description,
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
                url: DocumentPath+this.index+expandName,
                address,
                latitude,
                longitude,
                local: true,
            };
            await fs.copyFile(path, item.url);
            var taskItem = this.data[taskId];
            if (!taskItem) {
                taskItem = {images:[], videos:[]};
            }
            var list = isImage?taskItem.images:taskItem.videos;
            list.push(item);
            this.data[taskId] = taskItem;
            await AsyncStorage.setItem(ITEM_NAME, JSON.stringify(this.data));
            setTimeout(()=>this.tryUploadTasks(), 1000);
            resolve(item);
        });
    }
    removeMediaFile(taskId, url, isImage, noNeedChecked) {
        return new Promise(async(resolve, reject) => {
            if (noNeedChecked ? false : await fs.exists(url)) {
                await fs.unlink(url);
            }
            let taskItem = this.data[taskId];
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
                                delete this.data[taskId];
                                this.emit('MEDIA_UPLOAD_ALL_EVENT', {taskId});
                            }
                        } else {
                            if (taskItem.images.length) {
                                taskItem.videos = [];
                            } else {
                                delete this.data[taskId];
                                this.emit('MEDIA_UPLOAD_ALL_EVENT', {taskId});
                            }
                        }
                    }
                    await AsyncStorage.setItem(ITEM_NAME, JSON.stringify(this.data));
                }
            }
            resolve();
        });
    }
    tryUploadTasks() {
        if (!this.isUpLoading) {
            const taskId =  _.keys(this.data)[0];
            if (taskId) {
                const {connect, fee} = app.net.info;
                const {onlyWifiUpload} = app.setting.data;
                if (connect) {
                    if (!(fee && onlyWifiUpload)) {
                        this.isUpLoading = true;
                        this.tryUploadMediaFile(taskId);
                    }
                }
            }
        }
    }
    tryUploadMediaFile(taskId) {
        const task = this.data[taskId];
        if (task) {
            const {images, videos} = task;
            if (images.length) {
                this.uploadMediaFile(taskId, images[0], true);
            } else if (videos.length) {
                this.uploadMediaFile(taskId, videos[0], false);
            }
        } else {
            const taskId =  _.keys(this.data)[0];
            if (taskId) {
                this.tryUploadMediaFile(taskId);
            } else {
                this.isUpLoading = false;
            }
        }
    }
    uploadMediaFile(taskId, media, isImage) {
        const {name, description, time, url, address, latitude, longitude, mediaId} = media;
        const options = {
            fileKey: 'file',
            fileName: url.substr(url.lastIndexOf('/')+1),
            mimeType: isImage ? 'image/jpeg' : 'm4a',
            params: {
                phone:app.personal.info.phone,
                taskId,
                name,
                description,
                time,
                address,
                latitude,
                longitude,
                type: isImage ? 0 : 1,
            }
        };
        UPLOAD(url, app.route.ROUTE_UPLOAD_MEDIA_FILE, options, (progress) => {
            this.emit('MEDIA_UPLOAD_PROGREES_EVENT', {taskId, isImage, mediaId, progress:parseInt(progress.loaded*100/progress.total)});
        }, (data)=> {
            this.removeMediaFile(taskId, url, isImage).then(()=>{
                this.emit('MEDIA_UPLOAD_UPLOADED_EVENT', {taskId, isImage, url: data.context.url, mediaId, name, description, time});
                this.tryUploadMediaFile(taskId);
            });
        }, async (error)=> {
            const exist = await fs.exists(url);
			if (!exist) {
                this.removeMediaFile(taskId, url, isImage, true).then(()=>{
                    this.tryUploadMediaFile(taskId);
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
    getMediaFile(taskId) {
        return this.data[taskId]|{images:[], videos:[]};
    }
    clear() {
        this.data = {};
        AsyncStorage.removeItem(ITEM_NAME);
    }
}

module.exports = new Manager();
