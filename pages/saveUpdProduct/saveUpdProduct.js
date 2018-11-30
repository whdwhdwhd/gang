// pages/saveUpdProduct/saveUpdProduct.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{},
    timeArray:[30,45,60,90,120],
    timeIndex:0,
    countArray:[1,2,3,4,5,6,7,8,9,10],
    countIndex:0
  },
  bindTimeChange:function(e){
    this.setData({
      timeIndex: e.detail.value,
      "formData.productDuration": this.data.timeArray[e.detail.value]
    })
  },
  bindCountChange: function (e) {
    this.setData({
      countIndex: e.detail.value,
      "formData.productCount": this.data.countArray[e.detail.value]
    })
  },
  //数据提交
  formSubmit: function (e) {
    var _this = this, saveData = e.detail.value;
    saveData.shopId = app.globalData.userInfo.shopId;
    saveData.productDuration = this.data.formData.productDuration;
    saveData.productCount = this.data.formData.productCount;
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
        },1000)
      })
    }
  },
  validateSubData: function (data) {
    var _this=this;
    if (!data.productName) {
      return _this.wxShowToast("请输入服务名称");
    } else if (!data.productMoney) {
      return _this.wxShowToast("请输入服务金额/元");
    } else if (data.productMoney) {
      if (isNaN(Number(data.productMoney))){
        return _this.wxShowToast("请输入数字");
      }
    } else if (!data.productDuration) {
      return _this.wxShowToast("请选择服务时长/分");
    } else if (!data.productCount) {
      return _this.wxShowToast("请选择服务次/人");
    } else if (!data.productDesc) {
      return _this.wxShowToast("请输入服务描述");
    }
    return true;
  },
  wxShowToast: function (txt) {
    wx.showToast({
      icon: "none",
      title: txt
    })
    return false;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timeInd = this.data.timeArray.indexOf(parseInt(options.productDuration));
    var countInd = this.data.countArray.indexOf(parseInt(options.productCount));
    this.setData({
      formData: options,
      timeIndex: timeInd === -1 ? 0 : timeInd,
      countIndex: countInd === -1 ? 0 : countInd
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