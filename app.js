//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getJSON: function (url, data, callback) {
    // wx.showToast({
    //   title: '加载中',
    //   icon: 'loading',
    //   duration: 10000 
    // });
    wx.showNavigationBarLoading();
    const baseurl = this.globalData.baseurl;
    wx.request({
      url: baseurl + url,
      data: data,
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideNavigationBarLoading();
        if (res.statusCode == 200) {
          callback.call(null, res.data);//调用成功的回调函数
        } else {
          wx.showModal({
            title: '提示',
            content: '翻译系统异常，请稍后再试！',
            showCancel: false
          })
          //请求错误
        }
      },
      fail: function () {//接口调用失败的回调函数
        wx.showModal({
          title: '提示',
          content: '网络异常，请稍后再试！',
          showCancel: false
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    // baseurl: "http://three.lovtun.com:8088", //服务器域名地址  
    baseurl: "http://127.0.0.1:8080",  //本地测试
  }
})