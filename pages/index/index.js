//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    translate: {},
    textarea: "",
    j: 1,//帧动画初始图片
    isSpeaking: false,//是否正在说话
    voices: [],//音频数组
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











  //初始化去创建录音组件
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
  },

  // onLoad: function () {
  //   console.log('onLoad')
  //   var that = this
  //   //调用应用实例的方法获取全局数据
  //   app.getUserInfo(function (userInfo) {
  //     //更新数据
  //     that.setData({
  //       userInfo: userInfo
  //     })
  //   })
  // },

  data: {

  },
  onLoad: function () {
  },
  //手指按下
  touchdown: function () {
    console.log("手指按下了...")
    console.log("new date : " + new Date)
    var _this = this;
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })
    //开始录音
    wx.startRecord({
      success: function (res) {
        //临时路径,下次进入小程序时无法正常使用tempFilePath为录音文件
        var tempFilePath = res.tempFilePath
        console.log("tempFilePath: " + tempFilePath)

        wx.uploadFile({
          url: 'http://127.0.0.1:8080/', //仅为示例，非真实的接口地址
          filePath: tempFilePath,
          name: 'file',
          success: function (res) {
            var data = res.data



          }
        })

      },
      fail: function (res) {
        //录音失败
        wx.showModal({
          title: '提示',
          content: '录音的姿势不对!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              return
            }
          }
        })
      }
    })
  },
  //手指抬起
  touchup: function () {
    console.log("手指抬起了...")
    this.setData({
      isSpeaking: false,
    })
    clearInterval(this.timer)//录音喇叭图标隐藏
    wx.stopRecord()
  },
})


//麦克风帧动画
function speaking() {
  var _this = this;
  //话筒帧动画
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}