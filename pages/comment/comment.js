// pages/comment/comment.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:"",
    productId:"",
    shopId:"",
    starRating:0,
    comment:"",
    isAnonyArr: { name: "aa", checked: true },  
    isAnony:0  // 0：是   1：否
  },
  //初始化页面
  initData: function (options){
    this.setData({
      orderId: options.orderId,
      shopId: options.shopId,
      productId: options.productId
    })
  },
  //评分
  setww:function(e){
    var _this = this, index = e.currentTarget.dataset.index;
    this.setData({
      starRating: index+1
    })
  },
  //提交评分
  subComment(){
    if(this.data.starRating){

    }
    util.http(util.urls.urls_saveUpdAppraise(), { 
      shopId: this.data.shopId,
      productId: this.data.productId,
      orderId: this.data.orderId,
      starRating: this.data.starRating,
      comment: this.data.comment,
      isAnony: this.data.isAnony
    }, "POST", (res) => {
      wx.showToast({
        title: "提交成功"
      })
      wx.navigateBack({
        delta: 1
      })
    })
  },
  //设置输入框的bindinput
  bindinput:function(e){
    this.setData({
      comment: e.detail.value
    })
  },
  //设置是否隐匿
  checkboxChange:function(e){
    if (e.detail.value.length>0){
      this.data.isAnony=1
    }else{
      this.data.isAnony=0
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if (app.globalData.userInfo.unionId) {
      _this.initData(options)
    } else {
      app.getUnionId(function () {
        _this.initData(options)
      })
    }
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