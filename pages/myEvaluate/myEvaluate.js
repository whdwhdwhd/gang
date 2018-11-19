// pages/myEvaluate/myEvaluate.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:[]
  },
  getMyEvaluate:function(){
    var _this=this;
    util.http(util.urls.urls_findAppraiseByUserId(), {}, "POST", (res) => {
      _this.setData({
        commentList: res
      })
    })
  },
  //删除评论
  delCommentFun:function(e){
    var _this=this,id = e.currentTarget.dataset.id, index = e.currentTarget.dataset.index;
    util.http(util.urls.urls_deleteAppraise(), {
      id:id
    }, "POST", (res) => {
      _this.data.commentList.splice(index,1)
      _this.setData({
        commentList: _this.data.commentList
      })
      wx.showToast({
        title: "删除成功"
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyEvaluate()
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