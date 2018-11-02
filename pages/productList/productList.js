// pages/productList/productList.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[]
  },
  //查询商品
  getProductList: function(callback){
    var _this=this;
    util.http(util.urls.urls_productList(), { shopId:app.globalData.userInfo.shopId}, "POST", (res) => {
      _this.setData({
        productList: res
      })
      callback && callback()
    })
  },
  //新增商品
  addBtnFun:function(){
    wx.navigateTo({
      url:"/pages/saveUpdProduct/saveUpdProduct"
    })
  },
  //修改商品
  saveBtnFun:function(item){
    var itemD = item.currentTarget.dataset.item;
    wx.navigateTo({
      url: "/pages/saveUpdProduct/saveUpdProduct?id=" + itemD.id + "&productName=" + itemD.productName + "&productMoney=" + itemD.productMoney + "&productDuration=" + itemD.productDuration + "&productCount=" + itemD.productCount + "&productDesc=" + itemD.productDesc + "&shopId=" + itemD.shopId
    })
  },
  //删除商品
  delBtnFun:function(e){
    var _this = this, id = item.currentTarget.dataset.id;;
    util.http(util.urls.urls_deleteProduct(), {
      id: id
    }, "POST", (res) => {
      wx.showToast({
        title: "删除成功"
      })
      _this.getProductList()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("回显")
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