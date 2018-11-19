// pages/map/map.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地图
    id: 0,
    latitude: 0,
    longitude: 0,
    markers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myLat = app.globalData.userLocation.latitude, myLng = app.globalData.userLocation.longitude;
    this.data.markers[0]={
      id:0,
      latitude: options.lat,
      longitude: options.lng,
      title: options.shopName,
      callout:{
        content: options.shopName
      }
    }
    this.setData({
      latitude: myLat,
      longitude: myLng,
      markers: this.data.markers
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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