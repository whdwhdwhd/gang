// pages/home/home.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //列表
    page:1,
    pageNum:0,
    homeProductList: [],
    homeAdTit: '',
    homeAd: [],
    indicatorDots: true,
    autoplay: true,
    circular:true,
    interval: 5000,
    duration: 1000,
    checkFormIdsStr:""
  },
  //首页广告   
  getHomeAd: function () {
    var _this = this;
    util.http(util.urls.urls_homeAd(), {}, "POST", (res) => {
      var arr = [];
      for (var key in res) {
        if (key.indexOf("ad_")!=-1){
          res[key] = util.portUrl + res[key];
          arr.push(res[key]);
        }
      }
      _this.setData({
        homeAdTit: res.adTitle,
        homeAd: arr
      })
    })
  },
  //跳转到详情
  detailsBtnFun: function (e) {
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "/pages/shopDetails/shopDetails?id=" + item.id
    })
  },
  //查询商品
  getProductList: function (page) {
    var _this = this;
    util.http(util.urls.urls_findPageShopInfo(), { userLng: app.globalData.userLocation.latitude, userLat: app.globalData.userLocation.longitude, page: page }, "POST", (res, count) => {
      util.setArrImgSrc(res,"shopImagePath")
      _this.setData({
        homeProductList: [..._this.data.homeProductList,...res],
        pageNum: count/10
      })
    })
  },
  //查看formIds是否超时
  checkFormIds:function(){
    util.http(util.urls.urls_checkFormIds(), {}, "POST", (res) => {
      if (res.code!=0){
        this.setData({
          checkFormIdsStr: res.data
        })
      }
    })
  },
  onMyEvent: function (e) {
    var formIds = e.detail.formIdString;
    util.http(util.urls.urls_updateFormIds(), { formIds: formIds }, "POST", (res) => {
      this.setData({
        checkFormIdsStr: ""
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if (app.globalData.userInfo.unionId) {
      _this.checkFormIds()
      _this.getProductList(_this.data.page)
      _this.getHomeAd()
    } else {
      app.getUnionId(function () {
        _this.checkFormIds()
        _this.getProductList(_this.data.page)
        _this.getHomeAd()
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
    var _this=this;
    if (this.data.pageNum > this.data.page){
      this.data.page++
      this.getProductList(this.data.page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})