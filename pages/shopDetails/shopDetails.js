// pages/shopDetails/shopDetails.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo:{},
    commentList:[],
    homeProductList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //跳转地图
  jumpMap:function(){
    wx.navigateTo({
      url: "/pages/map/map?lat=" + this.data.shopInfo.lat + "&lng=" + this.data.shopInfo.lng + "&shopName=" + this.data.shopInfo.shopName
    })
  },
  //查询商铺评论和商铺信息
  getShopComment: function (id) {
    var _this = this;
    util.http(util.urls.urls_findAppraiseByShopId(), { shopId: id }, "POST", (res) => {
      _this.setData({
        commentList: res
      })
    })
  },
  //跳转到详情
  detailsBtnFun: function (e) {
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "/pages/commodityReservation/commodityReservation?id=" + item.id + "&shopId=" + item.shopId
    })
  },
  //查询商品
  getProductList: function (id) {
    var _this = this;
    util.http(util.urls.urls_findShopInfoAllById(), { id: id }, "POST", (res) => {
      _this.setData({
        homeProductList: res.productList,
        shopInfo: util.setObjImgSrc(res.shopInfo,"shopImagePath")
      })
    })
  },
  onLoad: function (options) {
    var _this = this;
    if (app.globalData.userInfo.unionId) {
      _this.getProductList(options.id)
      _this.getShopComment(options.id)
    } else {
      app.getUnionId(function () {
        _this.getProductList(options.id)
        _this.getShopComment(options.id)
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