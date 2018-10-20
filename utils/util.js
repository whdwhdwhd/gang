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
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    data: data,
    method: method,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      if(res.data.code===200){
        successFun && successFun(res.data.data)
      }else{
        failFun && failFun(res.data)
      }
      wx.hideLoading()
    },
    fail(err){
      wx.hideLoading()
      failFun && failFun(err)
    }
  })
}
//获取缩列图
const getThumbnail=function(url){
  if (!url){return}
  var thumbnailUrl = "", url1 = "", url2 = "", index = url.lastIndexOf("/");
  url1 = url.substring(0, index+1);
  url2 = url.substr(index+1);
  return url1 + "A_" + url2;
}
//接口综合
const portUrl = "http://172.30.1.21:8099/";
const urls={
  //获取openId
  urls_getOpenId(){return portUrl + "login/findOpenId";},
  //获取店铺
  urls_getShopType(){return portUrl +"shopInfo/wantToJoin";},
  //新增/修改 商铺
  urls_saveUpdShopInfo() { return portUrl + "shopInfo/saveUpdShopInfo"; },
  //上传图片
  urls_upload() { return portUrl + "file/upload"; }
}
module.exports = {
  formatTime: formatTime,
  getThumbnail: getThumbnail,
  http:http,
  portUrl: portUrl,
  urls: urls
}
