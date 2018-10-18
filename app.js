//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var _this=this,logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    this.getlocationFun(function(){
      _this.getSettingUserInfoFun()
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
      type: 'wgs84',
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
        console.log(res)
        _this.globalData.userInfo.nickName = res.userInfo.nickName;
        _this.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl;
      }
    })
  },
  globalData: {
    userInfo: {
      nickName:"",
      avatarUrl:""
    },
    userLocation:{
      latitude:"",
      longitude:""
    }
  }
})