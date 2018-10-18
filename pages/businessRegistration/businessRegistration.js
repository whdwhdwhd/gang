// pages/businessRegistration/businessRegistration.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_img:"",
    shopTypeArr:[]
  },
  //店铺类型
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //数据提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  //图片上传
  shopImgUpload:function(){
    var _this=this;
    wx.chooseImage({
      count: 1,
      // sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: "",
            filePath: tempFilePaths[i],
            name: 'uploadfile_ant',
            formData: {
              // 'imgIndex': i
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              wx.hideToast();
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }
      }
    })
  },
  //店铺类型
  shopType:function(){
    
    util.http(util.urls.urls_getShopType(), {}, "GET", (res)=>{
      this.shopTypeArr=res;
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.shopType()
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