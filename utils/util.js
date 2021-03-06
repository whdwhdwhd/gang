const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const http = function (url, data, method, successFun, failFun){
  wx.showLoading({
    mask:true,
  })
  if (url.indexOf("login/findOpenId")==-1){
    data.unionId = wx.getStorageSync('unionId');
  }
  if (url.indexOf("sysUser/checkFormIds") != -1){
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: data,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        successFun && successFun(res.data)
        wx.hideLoading()
      },
      fail(err) {
        wx.hideLoading()
        failFun && failFun(err)
      }
    })
  }else{
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: data,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code === 0) {
          successFun && successFun(res.data.data, res.data.count)
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            confirmColor: "#512DA8",
            content: res.data.msg
          })
          failFun && failFun(res.data)
        }
        wx.hideLoading()
      },
      fail(err) {
        wx.hideLoading()
        failFun && failFun(err)
      }
    })
  }
  
}
//获取缩列图
const getThumbnail=function(url){
  if (!url){return}
  var thumbnailUrl = "", url1 = "", url2 = "", index = url.lastIndexOf("/");
  url1 = url.substring(0, index+1);
  url2 = url.substr(index+1);
  return url1 + "A_" + url2;
}
//处理图片路径
const setArrImgSrc = function (data, str, isCompress){
  for (var i = 0; i < data.length;i++){
    if (isCompress) {
      data[i][str] = getThumbnail(portUrl + data[i][str]);
    }else{
      data[i][str] = portUrl + data[i][str];
    }
  }
  return data
}
//处理图片路径
const setObjImgSrc = function (data, str, isCompress) {
  if (isCompress){
    data[str] = getThumbnail(portUrl + data[str]);
  }else{
    data[str] = portUrl + data[str];
  }
  return data
}
//接口综合  http://47.104.201.33:8080/  阿里  http://192.168.3.116:8080/  本地  https://yuexiang360.cn/   线上
const portUrl = "http://192.168.3.116:8080/";  
const urls={
  //获取openId
  urls_getOpenId(){return portUrl + "login/findOpenId";},
  //获取店铺
  urls_getShopType(){return portUrl +"shopInfo/wantToJoin";},
  //新增/修改 商铺
  urls_saveUpdShopInfo() { return portUrl + "shopInfo/saveUpdShopInfo"; },
  //上传图片
  urls_upload() { return portUrl + "file/upload"; },
  //查询商品列表
  urls_productList() { return portUrl + "product/findProductList" },
  //门店服务页面--->点击门店查看所有信息
  urls_findShopInfoAllById() { return portUrl + "shopInfo/findShopInfoAllById"; },
  //新增/修改商品信息
  urls_product_saveUpdProduct() { return portUrl + "product/saveUpdProduct" },
  //查询商品信息
  urls_findProductById() { return portUrl +"product/findProductById"},
  //删除商品信息
  urls_deleteProduct() { return portUrl + "product/deleteProduct" },
  //新增评论
  urls_saveUpdAppraise() { return portUrl + "appraise/saveUpdAppraise" },
  //刪除评论
  urls_deleteAppraise() { return portUrl + "appraise/deleteAppraise" },
  //根据ID查找评论
  urls_findAppraiseById() { return portUrl + "appraise/findAppraiseById" },
  //根据商品ID查找评论
  urls_findAppraiseByProductId() { return portUrl + "appraise/findAppraiseByProductId" },
  //根据商鋪ID查找评论
  urls_findAppraiseByShopId() { return portUrl + "appraise/findAppraiseByShopId" },
  //点击商品进入预约的界面
  urls_reservProduct() { return portUrl + "product/reservProduct" },
  //新增预约
  urls_saveUpdReservation() { return portUrl + "reservation/saveUpdReservation" },
  //查找附近的商鋪信息
  urls_findPageShopInfo() { return portUrl + "shopInfo/findPageShopInfo" },
  //取消预约
  urls_cancelReservation() { return portUrl + "reservation/cancelReservation" },
  //确认已服务
  urls_confirmReservation() { return portUrl + "reservation/confirmReservation" },
  //根据门店查找订单
  urls_findPageByShopId() { return portUrl + "reservation/findPageByShopId" },
  //首页广告
  urls_homeAd() { return portUrl + "login/homeAd" },
  //审核门店
  urls_reviewShopInfo() { return portUrl + "shopInfo/reviewShopInfo" },
  //查看商鋪信息
  urls_findShopInfoById() { return portUrl + "shopInfo/findShopInfoById" },
  //关闭门店
  urls_shutDownShopInfo() { return portUrl + "shopInfo/shutDownShopInfo" },
  //我的评价
  urls_findAppraiseByUserId() { return portUrl + "appraise/findAppraiseByUserId" },
  //关于我们
  urls_usInfo() { return portUrl + "aboutUs/usInfo" },
  //全部、待服务、待评价
  urls_findPageByFwStatus() { return portUrl + "reservation/findPageByFwStatus" },
  //保存店家的formId
  urls_updateFormIds() { return portUrl + "sysUser/updateFormIds" },
  //查看formIds是否超时
  urls_checkFormIds() { return portUrl + "sysUser/checkFormIds" },
  //查看门店信息
  urls_findShopInfoById() { return portUrl + "shopInfo/findShopInfoById" },
  //点击我的，获取问候语 
  urls_myGreetings() { return portUrl + "aboutUs/myGreetings" },
  //更新头像、名称
  urls_updateImgInfo() { return portUrl + "sysUser/updateImgInfo" },
  
}
module.exports = {
  formatTime: formatTime,
  getThumbnail: getThumbnail,
  http:http,
  portUrl: portUrl,
  setArrImgSrc: setArrImgSrc,
  setObjImgSrc: setObjImgSrc,
  urls: urls
}
