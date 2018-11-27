// pages/shopOrder/shopOrder.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageNum: 0,
    shopOrderList:[]
  },
  //门店查找预约
  getShopOrder:function(){
    var _this = this;
    util.http(util.urls.urls_findPageByShopId(), { shopId: app.globalData.userInfo.shopId }, "POST", (res, count) => {
      _this.setData({
        shopOrderList: [..._this.data.shopOrderList,...res],
        pageNum: count / 10
      })
    })
  },
  //跳转详情
  confirmService:function(e){
    var _this = this,data=e.currentTarget.dataset.item;
    util.http(util.urls.urls_confirmReservation(), { id: data.id }, "POST", (res) => {
      _this.getShopOrder()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopOrder()
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
    var _this = this;
    if (this.data.pageNum > this.data.page) {
      this.data.page++
      this.getShopOrder(this.data.page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})