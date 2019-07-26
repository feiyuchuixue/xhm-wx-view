//mine.js
//获取应用实例
const app = getApp()

Page({
  data: {
   // tabs: ["推荐", "宝妈团", "出游", "专栏"],
    tabs: ["推荐", "1", "2", "3"],
    activeIndex: 0,
    sliderOffset: 0,

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
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.mTabWidth = res.windowWidth / that.data.tabs.length;
      }
    });
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindChange: function (e) {
    var that = this;
    var curIndex = e.detail.current;
    that.setData({
      sliderOffset: curIndex * that.mTabWidth,
      activeIndex: curIndex
    });
  },
  tabClick: function (e) {
    var that = this;
    var cIndex = e.currentTarget.id;
    that.setData({
      sliderOffset: cIndex * that.mTabWidth,
      activeIndex: cIndex
    });
  },
  //搜索框
  handleMainSearchInput(event){
    console.log("init  handleTopicsInput...")
    wx.navigateTo({
      url: '/pages/mainSearch/mainSearch',
    })
  },
})
