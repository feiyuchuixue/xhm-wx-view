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
    host:"https://server.momjia.com/xhm/",
    os:'android'
  },
  onLaunch: function() {
    this.queryOpenId();

  },

  queryOpenId: function() {
    var that = this;
    wx.login({
      success: function(e) {
        if (e.code) {
          wx.request({
            url: that.globalData.pathURL + 'xhm/getOpenId/getOpenId',
            data: {
              code: e.code
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              if (res.data.recode == 0) {
                that.globalData.openid = res.data.result.openId;
                that.getUserInfo();
              }
            }
          });
        }
      }
    })
  },
  getUserInfo: function() {
    var that = this;
    wx.request({
      url: that.globalData.pathURL + 'xhm/userCon/getUserByOpenId',
      data: {
        userOpenId: that.globalData.openid
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.recode == 0) {
          console.log(res)
          that.globalData.userInfo = res.data.result;
        } else {
          that.goLoginPageTimeOut();
        }
      }
    });
  },
  goLoginPageTimeOut: function() {
    setTimeout(function() {
      wx.navigateTo({
        url: "/pages/authorize/authorize"
      })
    }, 1000)
  },
  getOs:function () {
    let _this =this;
    wx.getSystemInfo({
      success:function(res){
        console.log("res 系统信息==",res)
        if(res.platform == "devtools"){
          _this.globalData.os ='devtools'
        }else if(res.platform == "ios"){
          _this.globalData.os ='ios'

        }else if(res.platform == "android"){
          _this.globalData.os ='android'
        }
      }
    })

    console.log("os is " +  _this.globalData.os);
  }
})
