const WXAPI = require('../../wxapi/main')
const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logo: '',
    userName: '',
  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      parentId: options.id
    });
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      wx.getUserInfo({
        success: function(e) {
          that.setData({
            userName: e.userInfo.nickName,
            logo: e.userInfo.avatarUrl
          });
          that.queryUsreInfo();
        }
      })
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

  //获取用户信息接口
  queryUsreInfo: function() {
    var a = this.data.parentId;
    console.log(a);
    if (a) {
      wx.request({
        url: app.globalData.pathURL + 'xhm/userGroup/addUser',
        data: {
          userUnionId: app.globalData.unionid,
          userOpenId: app.globalData.openid,
          userName: this.data.userName,
          userLogo: this.data.logo,
          parentId: this.data.parentId
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (data) {
          if (data.data.recode == 0) {
            app.globalData.userInfo = data.data.result;
          }
          console.log("插入小程序登录用户信息成功！");
        }
      });
    } else {
      wx.request({
        url: app.globalData.pathURL + 'xhm/userCon/wxLogin',
        data: {
          unionid: app.globalData.unionid,
          openid: app.globalData.openid,
          name: this.data.userName,
          logo: this.data.logo
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (data) {
          if (data.data.recode == 0) {
            app.globalData.userInfo = data.data.result;
          }
          console.log("插入小程序登录用户信息成功！");
        }
      });
    }
  },

})