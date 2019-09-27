//app.js
App({
  globalData: {
    pathURL: 'https://server.momjia.com/',
    // pathURL: 'http://192.168.1.185:8082/',
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
    return new Promise(function (resolve, reject) {
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

                  wx.request({
                    url: that.globalData.pathURL + 'xhm/userCon/getUserByOpenId',
                    data: {
                      userOpenId: that.globalData.openid
                    },
                    method: 'POST',
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success: function(ress) {
                      if (ress.data.recode == 0) {
                        console.log("调用加载1。。。 res =",ress)
                        that.globalData.userInfo = ress.data.result;
                        res.userId = ress.data.result.id;

                      } else {
                        console.log("调用加载2。。。 res =",ress)

                        that.goLoginPageTimeOut();
                      }
                      resolve(res)
                    }
                  });

              //    that.getUserInfo(res);

                }
              }
            });
          }
        }
      })


    })

  },
  getUserInfo: function(res) {
    let userId ="";
    console.log("调用加载中")
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
      success: function(ress) {
        if (ress.data.recode == 0) {
          console.log("调用加载1。。。 res =",ress)
          that.globalData.userInfo = ress.data.result;
          res.userId = ress.data.result.id;

        } else {
          console.log("调用加载2。。。 res =",ress)

          that.goLoginPageTimeOut();
        }
      }
    });

  },

  goLoginPageTimeOut: function() {
    var that = this;
    if (!that.globalData.userInfo){
      setTimeout(function() {
        wx.navigateTo({
          url: "/pages/authorize/authorize"
        })
      }, 1000)
    }
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
