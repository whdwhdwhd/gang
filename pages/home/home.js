// pages/home/home.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地图
    id: 0,
    latitude: 23.099994,
    longitude: 113.324520,
    width: 50,
    height: 50,
    //列表
    homeProductList:[]
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  //跳转到详情
  detailsBtnFun:function(e){
    var item=e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "/pages/shopDetails/shopDetails?id=" + item.id + "&shopId=" + item.shopId
    })
  },
  //查询商品
  getProductList: function (callback) {
    var _this = this;
    util.http(util.urls.urls_productList(), { shopId: app.globalData.userInfo.shopId }, "POST", (res) => {
      _this.setData({
        homeProductList: res
      })
      callback && callback()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if (app.globalData.userInfo.unionId) {
      _this.getProductList()
    } else {
      app.getUnionId(function () {
        _this.getProductList()
      })
    }
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