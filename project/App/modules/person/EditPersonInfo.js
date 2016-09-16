'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    Image,
    Text,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
} = ReactNative;

var PersonalInfoMgr = require('../../manager/PersonalInfoMgr.js');
var Subscribable = require('Subscribable');

var {MessageBox, DImage}=  COMPONENTS;

const DEFAULT_OPACITY = 0.5;

module.exports = React.createClass({
    mixins: [Subscribable.Mixin],
    statics: {
        title: '个人资料',
        leftButton: {handler: ()=>{app.scene.goBack()}},
        rightButton: { title: "编辑", handler: ()=>{app.scene.toggleEdit()}},
    },
    goBack() {
        if (this.state.isEditting) {
            this.setState({messageBoxType: 2});
        } else {
            app.navigator.pop();
        }
    },
    toggleEdit() {
        if (this.state.isEditting === true) {
            this.setState({ messageBoxType: 1, });
        }else{
            this.setState({ isEditting: true, });
            app.getCurrentRoute().rightButton = { title: '完成', handler: ()=>{app.scene.toggleEdit()}},
            app.forceUpdateNavbar();
        }
    },
    getInitialState() {
        var info = app.personal.info;
        return {
            messageBoxType: 0, //0：不显示，1：是否保存修改， 2：是否放弃修改
            isEditting: false,
            phone: info.phone,
            name: info.name,
            identifyNumber: info.identifyNumber,
            address: info.address,

            inputName: info.name,
            inputidentifyNumber: info.identifyNumber,
            inputAddress: info.adress,
        };
    },
    setPersonalInfo() {
        var info = app.personal.info;
        info.name = this.state.name;
        info.identifyNumber = this.state.identifyNumber;
        info.address = this.state.address;
        app.personal.set(info);
    },
    doCancel() {
        const {messageBoxType} = this.state;
        if (messageBoxType === 1) {
            this.setState({
                isEditting: false,
                messageBoxType: 0,
            });
            app.getCurrentRoute().rightButton = { title: '编辑', handler: ()=>{app.scene.toggleEdit()}},
            app.forceUpdateNavbar();
        } else if (messageBoxType === 2) {
            this.setState({
                messageBoxType: 0,
            });
        }
    },
    doConfirm() {
        const {messageBoxType} = this.state;
        if (messageBoxType === 1) {
            this.setState({messageBoxType: 0, isEditting: false});
            this.updatePersnalInfo();

            app.getCurrentRoute().rightButton = { title: '编辑', handler: ()=>{app.scene.toggleEdit()}},
            app.forceUpdateNavbar();
        } else if (messageBoxType === 2) {
            app.navigator.pop();
        }
    },
    updatePersnalInfo() {
        var param = {
            phone: this.state.phone,
            name: this.state.inputName,
            address: this.state.inputAddress,
        };
        POST(app.route.ROUTE_UPDATE_PERSONAL_INFO, param, this.updatePersnalInfoSuccess, this.updatePersnalInfoError, true);
    },
    updatePersnalInfoSuccess(data) {
        if (data.success) {
            Toast('修改成功');
            this.setPersonalInfo();
            this.setState({isEditting: false});

            this.setState({
                name: this.state.inputName,
                identifyNumber: this.state.inputidentifyNumber,
                address: this.state.inputAddress,
            });

            app.getCurrentRoute().rightButton = { title: '编辑', handler: ()=>{app.scene.toggleEdit()}},
            app.forceUpdateNavbar();
        } else {
            Toast(data.msg);
        }
    },
    updatePersnalInfoError(error) {
    },
    render() {
        const {messageBoxType, isEditting, name, identifyNumber, address} = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.separatorView}>
                    </View>

                    <View style={styles.itemView}>
                        <Text style={styles.itemKeyText}>姓名</Text>
                        {
                            !isEditting ?
                            <Text style={styles.itemValueText}>{name}</Text>
                            :
                            <TextInput style={styles.itemInputValueText}
                                defaultValue={name}
                                onChangeText={(text)=>this.setState({inputName: text})} />
                        }
                    </View>
                    <View style={styles.separatorView} />
                    <View style={styles.itemView}>
                        <Text style={styles.itemKeyText}>身份证号</Text>
                        {
                            !isEditting ?
                            <Text style={styles.itemValueText}>{identifyNumber}</Text>
                            :
                            <TextInput style={styles.itemInputValueText}
                                defaultValue={identifyNumber}
                                onChangeText={(text)=>this.setState({inputidentifyNumber: text})} />
                        }
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemKeyText}>地址</Text>
                        {
                            !isEditting ?
                            <Text style={styles.itemValueText}>{address}</Text>
                            :
                            <TextInput style={styles.itemInputValueText}
                                defaultValue={address}
                                onChangeText={(text)=>this.setState({inputAddress: text})} />
                        }
                    </View>
                </View>
                {
                    messageBoxType!==0 &&
                    <MessageBox
                        content={messageBoxType===1 ? '是否保存修改?' : '是否放弃修改?'}
                        doCancel={this.doCancel}
                        doConfirm={this.doConfirm}
                        />
                }
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ececec',
        flexDirection: 'column',
    },
    headImgBg:{
        height: 200,
        backgroundColor: '#ececec',
        alignItems:'center',
        justifyContent:'center',
    },
    headItemTouch: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    headStyle: {
        alignSelf: 'flex-start',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    separatorView: {
        backgroundColor: '#ececec',
        height: 20,
    },
    itemView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 40,
        alignItems:'center',
        marginVertical: 2,
    },
    itemKeyText: {
        width: 120,
        color: '#666666',
        fontSize: 15,
        fontWeight: '100',
        textAlign: 'left',
        overflow: 'hidden',
        paddingLeft: 20,
    },
    itemValueText: {
        width: sr.w-125,
        color: '#666666',
        fontSize: 15,
        fontWeight: '100',
        textAlign: 'left',
        overflow: 'hidden',
        padding: 5,
    },
    itemInputValueText: {
        width: sr.w-125,
        color: '#666666',
        fontSize: 15,
        fontWeight: '100',
        textAlign: 'left',
        overflow: 'hidden',
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DBDBDB'
    },
    itemValueInput: {
        color: 'red',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'left',
        overflow: 'hidden',
    },
});
