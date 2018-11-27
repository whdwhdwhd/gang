//app.js
var util = require('utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var _this=this;
    // this.getUnionId();
    this.getlocationFun(function(){
      _this.getSettingUserInfoFun()
    })
    
  },
  //获取unionId
  getUnionId:function(callback){
    var _this=this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        util.http(util.urls.urls_getOpenId(), { jsCode: res.code }, "POST", (res) => {
          _this.globalData.userInfo.unionId = res.unionId;
          wx.setStorageSync('unionId', res.unionId);
          if (res.shopInfo){
            _this.globalData.userInfo.shopInfo = res.shopInfo;
            _this.globalData.userInfo.shopId = res.shopInfo.id;
          }
          callback && callback()
        })
      }
    })
  },
  //获取地理位置权限
  getSettingLocationFun(){
    var _this = this;
    // 获取地理位置
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '警告',
            showCancel: false,
            content: '检测到您没打开本应用的定位权限，是否去设置打开？',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting["scope.userLocation"]) {////如果用户重新同意了授权登录
                      _this.getlocationFun()
                    }else{
                      _this.getSettingLocationFun()
                    }
                  },
                  fail:(err)=>{
                    _this.getSettingLocationFun()
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  //获取地理位置和用户信息
  getlocationFun: function (callback) {
    var _this=this;
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        _this.globalData.userLocation.latitude = res.latitude;
        _this.globalData.userLocation.longitude = res.longitude;
        callback()
      },
      fail:err => {
        _this.getSettingLocationFun()
      }
    })
  },
  //获取用户信息权限
  getSettingUserInfoFun() {
    var _this = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          _this.getUserInfoFun()
        }else{
          wx.redirectTo({
            url:"/pages/index/index"
          })
        }
      }
    })
  },
  //获取用户信息
  getUserInfoFun: function () {
    var _this = this;
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      success: res => {
        _this.globalData.userInfo.nickName = res.userInfo.nickName;
        _this.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl;
      }
    })
  },
  globalData: {
    userInfo: {
      nickName:"",
      avatarUrl:"",
      unionId:"",
      shopInfo:{},
      shopId:""
    },
    userLocation:{
      latitude:"",
      longitude:""
    }
  }
})