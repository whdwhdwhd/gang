// pages/order/order.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageNum: 0,
    tabs: [
      {
        name: "全部"
      },
      {
        name: "待服务"
      },
      {
        name: "待评价"
      }
    ],     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    orderList:{
      "0": [],
      "1": [],
      "2":[]
    },
    scrollT:0
  },
  //获取用户订单
  getOrderLIst:function(){
    var _this = this;
    util.http(util.urls.urls_findPageByFwStatus(), { serviceStatus: this.data.activeIndex }, "POST", (res, count) => {
      switch (_this.data.activeIndex){
        case 0:
          _this.setData({
            'orderList.0': [..._this.data.orderList[0],...res],
            pageNum: count / 10
          })
        break;
        case 1:
          _this.setData({
            'orderList.1': [..._this.data.orderList[1], ...res],
            pageNum: count / 10
          })
          break;
        case 2:
          _this.setData({
            'orderList.2': [..._this.data.orderList[2], ...res],
            pageNum: count / 10
          })
          break;
      }
    })
  },
  //取消预约
  cancelReservation:function(e){
    var _this = this, data = e.currentTarget.dataset.item;
    wx.showModal({
      title: '取消预约',
      confirmColor:"#512DA8",
      content: '确认取消预约？',
      success(res) {
        if (res.confirm) {
          util.http(util.urls.urls_cancelReservation(), { id: data.id }, "POST", (res) => {
            _this.getOrderLIst()
          })
        }
      }
    })
  },
  //去评价  /pages/comment/comment
  jumpComment: function (e) {
    var _this = this, data = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "/pages/comment/comment?shopId=" + data.shopId + "&productId=" + data.productId + "&orderId=" + data.id
    })
  },
  //滚动
  bindscrolltolower:function(e){
    var _this = this;
    if (this.data.pageNum > this.data.page) {
      this.data.page++
      this.getOrderLIst(this.data.page)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          //计算相关宽度
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68//计算内容区高度，rpx -> px计算
        });
      }
    });
    this.getOrderLIst();
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
  
  },
  bindChange: function (e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
    this.data.page=1;
    this.data.orderList[this.data.activeIndex]=[];
    this.getOrderLIst();
  },
  navTabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log("navTabClick:" + e.currentTarget.id);
  }
})