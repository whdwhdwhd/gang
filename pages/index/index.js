//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo){
      app.globalData.userInfo.nickName = e.detail.userInfo.nickName;
      app.globalData.userInfo.avatarUrl = e.detail.userInfo.avatarUrl;
      wx.switchTab({
        url: '/pages/home/home'
      })
    }
  }
})
