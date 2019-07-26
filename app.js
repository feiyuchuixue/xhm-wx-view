//app.js
App({
  globalData: {
    pathURL: 'https://server.momjia.com/',
    userInfo: null,
    isConnected: true,
    openid:null,
    unionid:null,
    appid:'wxa6ff759682482521',
    secret:'11ea62781d3c77e00417caf7603c5506',
    host:"https://server.momjia.com/xhm/"
  },
  //设置用户登录状态
  navigateToLogin: false,
  onLaunch: function () {
    this.queryOpenId();
    this.checkLoginStatus()
  },
  checkLoginStatus() { // 检测登录状态
    if (this.globalData.userInfo==null){
      this.goLoginPageTimeOut()
    }
  },
  queryOpenId: function () {
    var that = this;
    wx.login({
      success: function (e) {
        if (e.code) {
          var d = that.globalData;
          var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + e.code + '&grant_type=authorization_code'
          wx.request({
            url: l,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              console.log(res)
              that.globalData.openid = res.data.openid;
              that.globalData.unionid= '11111111111111111';
            }
          });
        }
      }
    })
  },
  goLoginPageTimeOut: function () {
    if (this.navigateToLogin) {
      return
    }
    this.navigateToLogin = true
    setTimeout(function () {
      //open
      wx.navigateTo({
        url: "/pages/authorize/authorize"
      })
    }, 1000)
  },
})
