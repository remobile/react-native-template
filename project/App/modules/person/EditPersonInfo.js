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

var CityData = require('../../data/city.js');
var HeadSet = require('../head/HeadSet.js');
var PersonalInfoMgr = require('../../manager/PersonalInfoMgr.js');
import Picker from 'react-native-picker';
var Subscribable = require('Subscribable');

var {MessageBox}=  COMPONENTS;

var createAreaData = (area) => {
    let data = {};
    let len = area.length;
    for(let i=0;i<len;i++){
        let city = area[i]['city'];
        let cityLen = city.length;
        let ProvinceName = area[i]['name'];
        data[ProvinceName] = {};
        for(let j=0;j<cityLen;j++){
            let area = city[j]['area'];
            let cityName = city[j]['name'];
            data[ProvinceName][cityName] = area;
        }
    }
    return data;
};

var getAddressFullName = (values) => {
    if (values[0] === values[1]) {
        return values[0]+'市'+values[2];
    }
    return values[0]+'省'+values[1]+'市'+values[2];
};

const DATA = {
    sex: ['男','女'],
    age: ['00后','90后','80后','70后','60后'],
    degree: ['高中','专科','本科','硕士','博士','博士后'],
    career: ['IT行业','服务业','医疗','金融'],
    city: createAreaData(CityData),
};
const DEFAULT_OPACITY = 0.5;

var arrayTemp = [];

module.exports = React.createClass({
    mixins: [Subscribable.Mixin],
    statics: {
        title: '编辑资料',
        leftButton: { handler: ()=>{app.scene.goBack()}},
        rightButton: { title: '编辑', handler: ()=>{app.scene.toggleEdit()}},
    },
    componentWillMount() {
        this.addListenerOn(PersonalInfoMgr, 'USER_HEAD_CHANGE_EVENT', (param)=>{
            this.setState({headImgSource: {uri: param.head}});
        });
        this.IndustryData = this.createIndustryData();
    },
    goBack() {
        if (this.state.isEditStatus) {
            this.setState({overlayShow: true, contentText: '是否放弃修改?'});
        } else {
            app.navigator.pop();
        }
    },
    toggleEdit() {
        if (!this.picker.isPickerShow()) {
            if (this.state.isEditStatus) {
                this.setState({overlayShow: true});
            } else {
                this.setState({isEditStatus: true});
                module.exports.rightButton = { title: '完成', handler: this.toggleEdit};
                app.forceUpdateNavbar();
            }
        }
    },
    getStateFromPersonalInfo() {
        var info = app.personal.info;
        var post = info.post;
        var name = info.name;
        var city = info.city;
        var company = info.company;
        var industry = info.industry;

        if (!industry) {
            var primary = '', secondary = '';
            for (var variable in info.industryPersonal) {
                var infoVariable = info.industryPersonal[variable];
                primary = variable;
                for (var item in infoVariable.secondary) {
                   secondary = item;
                }
            }
            if (!primary || !secondary) {
                var item = info.industryAll[0];
                primary = _.keys(item)[0];
                secondary = _.keys(item[primary].secondary)[0];
            }
            industry = primary+'-'+secondary;
        }

        var sex = '男';
        var ageText = '60后';
        var degreeText = '其他';
        if (info.sex === 0) {
            sex = '女';
        }
        if (info.ageGroup == 0) {
            ageText = '60后';
        } else if (info.ageGroup == 1) {
            ageText = '70后';
        } else if (info.ageGroup == 2) {
            ageText = '80后';
        } else if (info.ageGroup == 3) {
            ageText = '90后';
        } else if (info.ageGroup == 4) {
            ageText = '00后';
        }

        if (info.education == 0) {
            degreeText = '高中';
        } else if (info.education == 1) {
            degreeText = '专科';
        } else if (info.education == 2) {
            degreeText = '本科';
        } else if (info.education == 3) {
            degreeText = '硕士';
        } else if (info.education == 4) {
            degreeText = '博士';
        } else if (info.education == 5) {
            degreeText = '博士后';
        }
        var headImgSource = app.img.personal_default_head;
        if (info.headImg) {
            headImgSource = {uri: info.headImg};
        }

        return {
            sex: sex,
            city: city,
            name: name,
            post: post,
            company: company,
            industry: industry,
            ageText: ageText,
            degreeText: degreeText,
            headImgSource: headImgSource,
            contentText: '是否保存修改?',
        }
    },
    getInitialState() {
        return Object.assign({
            overlayShow: false,
            isEditStatus: false,
            pickerData: ['男','女'],
            defaultSelectValue: '男',
        }, this.getStateFromPersonalInfo());
    },
    setPersonalInfo() {
        var info = app.personal.info;
        info.sex = this.state.sex;
        info.post = this.state.post;
        info.name = this.state.name;
        info.city = this.state.city;
        info.company = this.state.company;
        info.industry = this.state.industry;
        info.headImg = this.state.headImgSource.uri||'';
        if (this.state.sex[0]==='男') {
            info.sex = 1;
        } else {
            info.sex = 0;
        }
        var ageText = this.state.ageText;
        if (ageText[0] === '60后') {
            info.ageGroup = 0;
        } else if (ageText[0] === '70后') {
            info.ageGroup = 1;
        } else if (ageText[0] === '80后') {
            info.ageGroup = 2;
        } else if (ageText[0] === '90后') {
            info.ageGroup = 3;
        } else if (ageText[0] === '00后') {
            info.ageGroup = 4;
        }

        var degreeText = this.state.degreeText;
        if (degreeText[0] === '高中') {
            info.education = 0;
        } else if (degreeText[0] === '专科') {
            info.education = 1;
        } else if (degreeText[0] === '本科') {
            info.education = 2;
        } else if (degreeText[0] === '硕士') {
            info.education = 3;
        } else if (degreeText[0] === '博士') {
            info.education = 4;
        } else if (degreeText[0] === '博士后') {
            info.education = 5;
        }
        app.personal.set(info);
    },
    setHeadIcon() {
        app.navigator.push({
            component: HeadSet,
        });
    },
    _onPressHandle(type) {
        if (!this.picker.isPickerShow()) {
            this.pickerType = type;
            var state = this.state;
            var {sex, ageText, degreeText, industry, city} = state;

            industry = this.industryToString(industry);
            industry = industry.split(/\s+/);

            if (city) {
                city = city.split(/市|省/);
                if (city.length === 2) {
                    city =[city[0]].concat(city);
                } else if (city.length === 1) {
                    city = ['北京', '北京', '朝阳区'];
                }
            } else {
                city = ['北京', '北京', '朝阳区'];
            }

            if (industry[0] === '' || industry[1] === '') {
                industry = arrayTemp;
            }
            if (type === 'sex') {
                this.setState({defaultSelectValue: sex, pickerData: DATA.sex});
            } else if (type === 'age') {
                this.setState({defaultSelectValue: ageText, pickerData: DATA.age});
            } else if (type === 'degree') {
                this.setState({defaultSelectValue: degreeText, pickerData: DATA.degree});
            } else if (type === 'career') {
                if (this.IndustryData != null) {
                    this.setState({defaultSelectValue: industry, pickerData: this.IndustryData});
                }
            } else if (type === 'city') {
                this.setState({defaultSelectValue:  city, pickerData: DATA.city});
            }
            this.picker.show();
        } else {
            this.picker.hide();
        }
    },
    setChooseValue(value) {
        var type = this.pickerType;
        if (type === 'sex') {
            this.setState({sex: value});
        } else if (type === 'age') {
            this.setState({ageText: value});
        } else if (type === 'degree') {
            this.setState({degreeText: value});
        } else if (type === 'career') {
            this.setState({industry: this.industryToValue(value)});
        } else if (type === 'city') {
            this.setState({city: getAddressFullName(value)});
        }
    },
    setPostText(text) {
        text = app.utils.cutLimitText(text, 16);
        this.setState({post: text})
    },
    createIndustryData() {
        var industryAll = app.personal.info.industryAll;
        var industryArray = {};
        var temp = 1;
        for (var variable in industryAll) {
            var industryPrimary = industryAll[variable];
            for (var item in industryPrimary) {
                var primaryStr = industryPrimary[item].primary;
                if (temp === 1) {
                    arrayTemp[0] = primaryStr;
                }
                var itemIndustryArray = [];
                for (var secondary in industryPrimary[item].secondary) {
                    itemIndustryArray.push(industryPrimary[item].secondary[secondary]);
                    if (temp === 1) {
                        arrayTemp[1] = industryPrimary[item].secondary[secondary];
                    }
                    temp++;
                }
                industryArray[primaryStr] = itemIndustryArray;
            }
        }
        return industryArray;
    },
    industryToValue(value) {
        var val1 = value[0], val2 = value[1];
        var key1 = '', key2 = '';
        var industryAll = app.personal.info.industryAll;
        for (var i in industryAll) {
            var industryItem = industryAll[i];
            for (var k1 in industryItem) {
                var item = industryItem[k1];
                if (item.primary === val1) {
                    key1 = k1;
                    for (var k2 in item.secondary) {
                        if (val2 === item.secondary[k2]) {
                            key2 = k2;
                            break;
                        }
                    }
                    break;
                }
            }
        }
        if (!key1 || !key2) {
            return "";
        }
        return key1 + '-' + key2;
    },
    industryToString(industry) {
        var list = industry.split('-');
        var key1 = list[0], key2 = list[1];
        var val1 = '', val2 = '';
        var industryAll = app.personal.info.industryAll;
        for (var i in industryAll) {
            var industryItem = industryAll[i];
            for (var k1 in industryItem) {
                if (key1 == k1) {
                    var item = industryItem[k1];
                    val1 = item.primary;
                    for (var k2 in item.secondary) {
                        if (k2 == key2) {
                            val2 = item.secondary[k2];
                            break;
                        }
                    }
                    break;
                }
            }
        }
        return val1 + ' - ' + val2;
    },

    doCancel() {
      var text = this.state.contentText+'';
      if (text === '是否放弃修改?') {
          this.setState({overlayShow: false, contentText: '是否保存修改?'});
      } else if (text === '是否保存修改?') {
          this.setState(Object.assign({
              isEditStatus: false,
              overlayShow: false,
          }, this.getStateFromPersonalInfo()));
          module.exports.rightButton = { title: '编辑', handler: this.toggleEdit};
          app.forceUpdateNavbar();
      }
    },
    doConfirm() {
        var text = this.state.contentText+'';
        if (text === '是否放弃修改?') {
            app.navigator.pop();
        } else if (text === '是否保存修改?') {
            this.setState({overlayShow: false});
            this.updatePersnalInfo();
        }
    },
    updatePersnalInfo() {
        var detailsMap = this.setData();
        var param = {
            userID: app.personal.info.userID,
            detail: detailsMap,
        };
        POST(app.route.ROUTE_UPDATE_PERSONAL_INFO, param, this.updatePersnalInfoSuccess, this.updatePersnalInfoError, true);
    },
    updatePersnalInfoSuccess(data) {
        if (data.success) {
            Toast('修改成功');
            this.setPersonalInfo();
            this.setState({isEditStatus: false});
            module.exports.rightButton = { title: '编辑', handler: this.toggleEdit};
            app.forceUpdateNavbar();
        } else {
            Toast(data.msg);
        }
    },
    updatePersnalInfoError(error) {
    },
    setData() {
      var sexCode = 0;
      var sexText = this.state.sex+'';
      if (sexText === '男') {
          sexCode = 1;
      }
      var ageGroup = 0;
      var ageText = this.state.ageText+'';
      if (ageText === "60后") {
          ageGroup = 0;
      }
      if (ageText === '70后') {
          ageGroup = 1;
      }
      if (ageText === '80后') {
          ageGroup = 2;
      }
      if (ageText === '90后') {
          ageGroup = 3;
      }
      if (ageText === '00后') {
          ageGroup = 4;
      }

      var education = 0;
      var degreeText = this.state.degreeText+'';
      if (degreeText === '高中') {
          education = 0;
      }
      if (degreeText === '专科') {
          education = 1;
      }
      if (degreeText === '本科') {
          education = 2;
      }
      if (degreeText === '硕士') {
          education = 3;
      }
      if (degreeText === '博士') {
          education = 4;
      }
      if (degreeText === '博士后') {
          education = 5;
      }
      var detailsMap = {};
      detailsMap['name'] = this.state.name;
      detailsMap['sex'] = sexCode;
      detailsMap['city'] = this.state.city;
      detailsMap['industry'] = this.state.industry;
      detailsMap['company'] = this.state.company;
      detailsMap['post'] = this.state.post;
      detailsMap['ageGroup'] = ageGroup;
      detailsMap['education'] = education;
      detailsMap['headImg'] = this.state.headImgSource.uri||'';
      return detailsMap;
    },
    render() {
        return (
            <View style={{flex: 1,}}>
                <ScrollView>
                    <View style={styles.containerStyle}>
                        <TouchableOpacity
                            onPress={this.state.isEditStatus ? this.setHeadIcon : null}
                            activeOpacity={!this.state.isEditStatus ? 1 : DEFAULT_OPACITY}
                            style={styles.headStyle} >
                            <Text style={styles.headText}>{this.state.isEditStatus ? '设置头像' : '头像'}</Text>
                            <View>
                                <Image
                                    resizeMode='cover'
                                    source={this.state.headImgSource}
                                    style={styles.headIcon}  />
                            </View>
                        </TouchableOpacity>
                        <Text style={{width: sr.w, height: 1,backgroundColor: '#DDDDDD',}}>
                        </Text>
                        <View style={styles.itemBgStyle} >
                            <Text style={styles.headText}>真实姓名</Text>
                            { !this.state.isEditStatus ?
                                <Text style={styles.contentText}>{this.state.name}</Text>
                                :
                                <TextInput
                                    onChangeText={(text) => this.setState({name: text})}
                                    value={this.state.name}
                                    style={styles.text_input} />
                            }
                        </View>
                        <Text style={styles.lowSeprator} />
                        <TouchableOpacity
                            activeOpacity={!this.state.isEditStatus ? 1 : DEFAULT_OPACITY}
                            onPress={this.state.isEditStatus ? this._onPressHandle.bind(this,'sex') : null}>
                            <View style={styles.itemBgStyle}>
                                <Text style={styles.headText}>性别</Text>
                                <Text style={styles.contentText}>
                                    {this.state.sex}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.highSeprator} />
                        <TouchableOpacity
                            activeOpacity={!this.state.isEditStatus ? 1 : DEFAULT_OPACITY}
                            onPress={this.state.isEditStatus ? this._onPressHandle.bind(this, 'city') : null}>
                            <View style={styles.itemBgStyle}>
                                <Text style={styles.headText}>所在城市</Text>
                                <Text style={styles.contentText}>
                                    {this.state.city}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.lowSeprator} />
                        <TouchableOpacity
                            activeOpacity={!this.state.isEditStatus ? 1 : DEFAULT_OPACITY}
                            onPress={this.state.isEditStatus ? this._onPressHandle.bind(this, 'career') : null}>
                            <View style={styles.itemBgStyle}>
                                <Text style={styles.headText}>行业</Text>
                                <Text style={styles.contentText}>
                                    {this.industryToString(this.state.industry)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.lowSeprator} />
                        <View style={styles.itemBgStyle}>
                            <Text style={styles.headText}>任职机构</Text>
                            { !this.state.isEditStatus ?
                                <Text style={styles.contentText}>{this.state.company}</Text>
                                :
                                <TextInput
                                      onChangeText={(text) => this.setState({company: text})}
                                      value={this.state.company}
                                      style={styles.text_input} />
                            }
                        </View>
                        <Text style={styles.lowSeprator} />
                        <View style={styles.itemBgStyle}>
                            <Text style={styles.headText}>职位</Text>
                            { !this.state.isEditStatus ?
                                <Text style={styles.contentText}>{this.state.post}</Text>
                                :
                                <TextInput
                                        onChangeText={this.setPostText}
                                        value={this.state.post}
                                        style={styles.text_input} />
                            }
                        </View>
                        <Text style={styles.lowSeprator} />
                        <TouchableOpacity
                            activeOpacity={!this.state.isEditStatus ? 1 : DEFAULT_OPACITY}
                            onPress={this.state.isEditStatus ? this._onPressHandle.bind(this,'age') : null}>
                            <View style={styles.itemBgStyle}>
                                <Text style={styles.headText}>年龄层</Text>
                                <Text style={styles.contentText}>
                                    {this.state.ageText}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.lowSeprator} />
                        <TouchableOpacity
                            activeOpacity={!this.state.isEditStatus ? 1 : DEFAULT_OPACITY}
                            onPress={this.state.isEditStatus ? this._onPressHandle.bind(this,'degree') : null}>
                            <View style={styles.itemBgStyle}>
                                <Text style={styles.headText}>学历</Text>
                                <Text style={styles.contentText}>
                                    {this.state.degreeText}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View>
                    {
                      this.state.overlayShow &&
                      <MessageBox
                          content={this.state.contentText}
                          doCancel={this.doCancel}
                          doConfirm={this.doConfirm}
                          />
                    }
                </View>
                <View style={{position:'absolute', bottom: 0, left: 0,}}>
                    <Picker
                        style={{height: sr.th/3,}}
                        ref={picker => this.picker = picker}
                        showDuration={500}
                        showMask={false}
                        pickerBtnText={'确  定'}
                        pickerCancelBtnText={'取  消'}
                        selectedValue={this.state.defaultSelectValue}
                        pickerData={this.state.pickerData}
                        onPickerDone={(value) => this.setChooseValue(value)}
                        />
                </View>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    containerStyle: {
        height: sr.h-55,
        width: sr.w,
        flexDirection: 'column',
        backgroundColor: '#DDDDDD',
    },
    highSeprator: {
        width: sr.w,
        height: 20,
        backgroundColor: '#DDDDDD',
    },
    lowSeprator: {
        width: sr.w,
        height: 1,
        backgroundColor: '#DDDDDD',
    },
    headStyle: {
        width: sr.w,
        height: 90,
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    headText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 20,
        color: '#AAAAAA',
        alignSelf : 'center',
    },
    contentText: {
        flex: 3,
        fontSize: 16,
        marginLeft: 20,
        color: 'black',
        alignSelf : 'center',
    },
    headIcon: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginRight: 40,
        marginTop: 5,
        alignSelf : 'center',
    },
    text_input: {
        height: 40,
        width: sr.w-100,
        paddingLeft: 24,
        fontSize: 16,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
    },
    itemBgStyle: {
        width: sr.w,
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    icon_go: {
        height: 15,
        marginRight: 10,
        alignSelf: 'center',
        justifyContent : 'flex-end',
    },
    overlayContainer: {
        width: sr.w,
        height: sr.h/3,
        backgroundColor: 'gray'
    },
});
