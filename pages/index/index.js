//mine.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [
      {
        txt: '推荐'
      },
      {
        txt: '附近'
      },
      {
        txt: '视频'
      },
      {
        txt: '音频'
      },
      {
        txt: '课程'
      },
      {
        txt: '排湿汤'
      },
      {
        txt: '暖身茶'
      },
      {
        txt: '推荐'
      },
      {
        txt: '课程'
      },
    ],
    article: [
      {
        img: '/image/aaa.jpg',
        txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
        name: '崔迪houai1314',
        pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
        count:'12554'
      },
      {
        img: '/image/bbb.jpg',
        txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题sadfsdf',
        name: '崔迪houai1314',
        pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
        count: '12554'
      },
      {
        img: '/image/s1.jpg',
        txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
        name: '崔迪houai1314',
        pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
        count: '12554'
      },
      {
        img: '/image/aaa.jpg',
        txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题sadf',
        name: '崔迪houai1314',
        pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
        count: '12554'
      },
      {
        img: '/image/bbb.jpg',
        txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题sdfsdf',
        name: '崔迪houai1314',
        pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
        count: '12554'
      },
      {
        img: '/image/s1.jpg',
        txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
        name: '崔迪houai1314',
        pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
        count: '12554'
      }
    ],
  },
  kecheng1() {
    wx.navigateTo({
      url: '/pages/page1/index'
    })
  },
  kecheng2() {
    wx.navigateTo({
      url: '/pages/page2/index'
    })
  },
  kecheng3() {
    wx.navigateTo({
      url: '/pages/page3/index'
    })
  },

  onShareAppMessage: function () {
    return {
      title: '分享标题：听会儿中医最新课程',
      path: ''
    }
  },
  suo: function (e) {
    wx.navigateTo({
      url: '../index/index',
    })
  },




  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
