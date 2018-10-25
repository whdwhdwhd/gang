// pages/home/home.js
var util = require('../../utils/util.js')
var isEmptyObject = function (e) {
  var temp;
  for (temp in e)
    return !1;
  return !0
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    latitude: 23.099994,
    longitude: 113.324520,
    width: 50,
    height: 50
  },
  //登录获取code
  login: function () {
    wx.login({
      success: function (res) {
        console.log(res.code)
        //发送请求
        // wx.request({
        //   url: 'test.php', //接口地址
        //   data: { code: res.code },
        //   header: {
        //     'content-type': 'application/json' //默认值
        //   },
        //   success: function (res) {
        //     console.log(res.data)
        //   }
        // })
      }
    })
  },
  //授权
  checkSettingStatu: function (cb) {
    var that = this;
    debugger
    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
    wx.getSetting({
      success: function success(res) {
        debugger
        var authSetting = res.authSetting;
        if (isEmptyObject(authSetting)) {
          //第一次

        } else {
          // 没有授权的提醒
          if (authSetting['scope.userInfo'] === false) {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: function success(res) {
                      console.log()
                    }
                  });
                }
              }
            })
          } else if (authSetting['scope.userInfo'] === true) {
            //该处用户获取用户的一些授权信息
            if (that.data.userInfo) {
              var nickname = that.data.userInfo.nickName;
              var gender = that.data.userInfo.gender
              //性别 0：未知、1：男、2：女
              if (gender == 1) {
                gender = "True"
              } else if (gender == 2) {
                gender = "False"
              } else {
                gender = "True"
              }

            }
          }
        }
      }
    })
  },
  //调试
  debugging(){
    var that = this;
    if (getApp().globalData.userInfo) {
      this.setData({
        userInfo: getApp().globalData.userInfo
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      getApp().userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    } else {
      wx.getLocation({
        type: 'wgs84',
        success: res => {
          debugger
          console.log(res)
        },
        fail: function () {

        }
      })
      wx.getUserInfo({
        success: res => {
          debugger
          console.log(res)
          getApp().globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
          that.checkSettingStatu();
        },
        fail: function () {
          wx.showModal({
            title: '用户未授权',
            content: '如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
            showCancel: false,
            success: function (resbtn) {
              debugger
              if (resbtn.confirm) {
                debugger
                wx.openSetting({
                  success: function success(resopen) {
                    debugger
                    //  获取用户数据
                    that.checkSettingStatu();
                  }
                });
              }
            }
          })
        }
      })
    }
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.login()
    // this.debugging()
    // getApp().globalData.urls_getOpenId()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.request({
    //   url: 'http://172.30.1.21:8099/shopInfo/saveUpdShopInfo?shopName=贷款的时贷款的时刻', //仅为示例，并非真实的接口地址
    //   data: {
       
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   },
    //   fail(err){
    //     console.log(err)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})