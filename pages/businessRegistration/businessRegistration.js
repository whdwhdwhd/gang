// pages/businessRegistration/businessRegistration.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopTypeArr:[],   //店铺
    shopTypeArrIndex:"",
    region:[],   //省市县
    startTime: "",  //开始时间
    endTime:"",  //结束时间
    aShopImagePath: "", //文件路经
    shopImagePath:"", //文件路经
    shopImageP:"",
    shopImageName:"",  //文件名称
    startTimeArray: [["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ], ["00", "30"]],
    endTimeArray: [["13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24" ], ["00", "30"]]
  },
  //开始时间
  bindTimeStartChange(e){
    this.setData({
      startTime: this.data.startTimeArray[0][e.detail.value[0]] + ":" + this.data.startTimeArray[1][e.detail.value[1]]
    })
  },
  //结束时间
  bindTimeEndChange(e) {
    this.setData({
      endTime: this.data.endTimeArray[0][e.detail.value[0]] + ":" + this.data.endTimeArray[1][e.detail.value[1]]
    })
  },
  //店铺类型
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      shopTypeArrIndex: e.detail.value
    })
  },
  //省市县
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //数据提交
  formSubmit: function (e) {
    var _this = this, saveData = e.detail.value;
    saveData.unionId = app.globalData.userInfo.unionId;
    saveData.shopImagePath = this.data.shopImageP;
    saveData.shopImageName = this.data.shopImageName;
    saveData.shopProvince = this.data.region[0] ? this.data.region[0]:"";
    saveData.shopCity = this.data.region[1] ? this.data.region[1] : "";
    saveData.shopCounty = this.data.region[2] ? this.data.region[2] : "";
    saveData.addressAll = saveData.shopProvince + saveData.shopCity + saveData.shopCounty + saveData.shopAddress;
    saveData.shopTimeStart = this.data.startTime;
    saveData.shopTimeEnd = this.data.endTime;
    console.log(saveData)
    //验证必填项
    if (this.validateSubData(saveData)){
      util.http(util.urls.urls_saveUpdShopInfo(), saveData, "POST", (res) => {
        app.globalData.userInfo.shopId = res.id;
        wx.showToast({
          title: "保存成功"
        })
        wx.navigateTo({
          url: "/pages/my/my"
        })
      })
    }
  },
  validateSubData:function(data){
    if (!data.shopImagePath){
      return this.wxShowToast("请上传店铺图");
    } else if (!data.shopName){
      return this.wxShowToast("请输入店铺名称");
    } else if (!data.shopType) {
      return this.wxShowToast("请输入店铺类型");
    } else if (!data.shopLxr) {
      return this.wxShowToast("请输入联系人");
    } else if (!(data.shopPhone || data.shopLandline)) {
      return this.wxShowToast("请输入手机号码或座机号码");
    } else if (!data.shopProvince) {
      return this.wxShowToast("请选择所在地区");
    } else if (!data.shopAddress) {
      return this.wxShowToast("请输入详细地址");
    } else if (!(data.shopTimeStart && data.shopTimeEnd)) {
      return this.wxShowToast("请选择工作时间");
    }
    return true;
  },
  wxShowToast:function(txt){
    wx.showToast({
      icon: "none",
      title: txt
    })
    return false;
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
        var tempFilePaths = res.tempFilePaths[0];
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        wx.uploadFile({
          url: util.urls.urls_upload(),
          filePath: tempFilePaths,
          name: 'file',
          formData: {
            isYs:1 
            // 'imgIndex': i
          },
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            var data=JSON.parse(res.data);
            if (data.code=="0"){
              _this.setData({
                aShopImagePath: util.getThumbnail(util.portUrl + data.data.fileDir),
                shopImagePath: util.portUrl+data.data.fileDir,
                shopImageP:data.data.fileDir,
                shopImageName: data.data.fileName
              })
            }else{
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
            wx.hideToast();
          }
        });
      }
    })
  },
  //店铺类型
  shopType:function(){
    var _this=this;
    util.http(util.urls.urls_getShopType(), {}, "GET", (res)=>{
      this.setData({
        shopTypeArr: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if (app.globalData.userInfo.unionId) {
      _this.shopType()
    } else {
      app.getUnionId(function () {
        _this.shopType()
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