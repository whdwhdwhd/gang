// pages/saveUpdProduct/saveUpdProduct.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{}
  },
  //数据提交
  formSubmit: function (e) {
    var _this = this, saveData = e.detail.value;
    saveData.shopId = app.globalData.userInfo.shopId;
    //验证必填项
    if (this.validateSubData(saveData)) {
      util.http(util.urls.urls_product_saveUpdProduct(), saveData, "POST", (res) => {
        wx.showToast({
          title: "保存成功"
        })
        setTimeout(function(){
          wx.navigateTo({
            url: "/pages/productList/productList?isRefresh=true"
          })
          // wx.navigateBack({
          //   delta:1
          // })
        },1000)
      })
    }
  },
  validateSubData: function (data) {
    if (!data.productName) {
      return this.wxShowToast("请输入服务名称");
    } else if (!data.productMoney) {
      return this.wxShowToast("请输入服务金额/元");
    } else if (!data.productDuration) {
      return this.wxShowToast("请输入服务时长/分");
    } else if (!data.productCount) {
      return this.wxShowToast("请输入服务次/人");
    } else if (!data.productDesc) {
      return this.wxShowToast("请输入服务描述");
    }
    return true;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      formData: options
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