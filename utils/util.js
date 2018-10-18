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
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    data: data,
    method: method,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      if(res.code===200){
        successFun && successFun(res.data)
      }else{
        failFun && failFun(res)
      }
    },
    fail(err){
      failFun && failFun(err)
    }
  })
}
//接口综合
const portUrl= "http://172.30.1.21:8099/";
const urls={
  //获取openId
  urls_getOpenId(){return portUrl + "login/findOpenId";},
  //获取店铺
  urls_getShopType(){return portUrl +"/shopInfo/wantToJoin";}
}
module.exports = {
  formatTime: formatTime,
  http:http,
  urls: urls
}
