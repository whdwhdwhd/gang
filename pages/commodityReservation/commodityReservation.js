// pages/commodityReservation/commodityReservation.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    shopId:"",
    product:{},
    shopInfo:{},
    dateNodeDtoList:[],
    tabsInd:0,
    activetime:{week:0,time:0}
  },
  //设置显示下表
  setTabsIndFun:function(e){
    if (this.data.activetime.week !== e.currentTarget.dataset.ind) {
      this.setData({
        tabsInd: e.currentTarget.dataset.ind,
        "activetime.week": e.currentTarget.dataset.ind,
        "activetime.time": 0
      })
    }
  },
  //选中时间
  setActiveTimeFun:function(e){
    this.setData({
      "activetime.time": e.currentTarget.dataset.ind
    })
    console.log(this.data.activetime)
  },
  //预约
  appointmentBtnFun: function (e) {
    var _this = this, formId = e.detail.formId;
    util.http(util.urls.urls_saveUpdReservation(), { 
      formId: formId,
      productId: this.data.id,
      shopId: this.data.shopId,
      serviceDateStr: this.data.dateNodeDtoList[this.data.activetime.week].dateDay,
      serviceWeek: this.data.dateNodeDtoList[this.data.activetime.week].weekDay,
      servicePeriod: this.data.dateNodeDtoList[this.data.activetime.week].dateInterMap[this.data.activetime.time]
      }, "POST", (res) => {
        wx.showToast({
          title: "预约成功"
        })
    })
  },
  //查寻商品进入预约
  getShopInfo:function(){
    var _this = this;
    util.http(util.urls.urls_reservProduct(), { id: this.data.id }, "POST", (res) => {
      console.log(res)
      _this.setData({
        product: res.product,
        shopInfo: res.shopInfo,
        dateNodeDtoList: res.dateNodeDtoList
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      shopId: options.shopId
    })
    this.getShopInfo();
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