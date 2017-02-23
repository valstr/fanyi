//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    translate: {},
    textarea: "",
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.query) {
      app.getJSON("/Translate/youdao/translate", e.detail.value, function (res) {
        console.log(res.error_code);
        if (res.errorCode == 0) {
          that.setData({
            translate: res
          })
        } else if (res.errorCode == 20) {
          wx.showModal({
            title: '提示',
            content: '要翻译的文本过长！',
            showCancel: false
          })
        } else if (res.errorCode == 60) {
          wx.showModal({
            title: '提示',
            content: ' 无词典结果，仅在获取词典结果生效！',
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '翻译系统异常，请稍后再试！',
            showCancel: false
          })
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '翻译内容为空，请输入！',
        showCancel: false
      })
    }
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  //点击录音
  startRecord: function () {
    wx.startRecord(
      
    )
  },
  chendRecord: function () {
    //设置0.1秒执行结束录音
    setTimeout(function () {
      //结束录音  
      wx.stopRecord()
    }, 100)
  }
})
