const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    inputShowed: false, // 是否显示搜索框
    inputVal: "", // 搜索框内容

    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    categories: [],
    goods: [],

    scrollTop: 0,
    loadingMoreHidden: true,

    coupons: [],

    curPage: 1,
    pageSize: 10,
    cateScrollTop: 0
  },

  tabClick: function (e) {
    let offset = e.currentTarget.offsetLeft;
    if (offset > 150) {
      offset = offset - 150
    } else {
      offset = 0;
    }
    this.setData({
      curPage: 1,
      cateScrollTop: offset
    });
    this.getGoodsList();
  },
  //事件处理函数
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  toDetailsTap: function (e) {
 
    wx.navigateTo({
      url: "/pages/goods-details/goods-details?id=" + e.currentTarget.dataset.id
    })
  },
  bindTypeTap: function (e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  onLoad: function (e) {
    this.getGoodsList();
    wx.showShareMenu({
      withShareTicket: true
    })
    const that = this
    if (e && e.scene) {
      const scene = decodeURIComponent(e.scene)
      if (scene) {
        wx.setStorageSync('referrer', scene.substring(11))
      }
    }
    /**
     * 设置小程序标题头
     */
    wx.setNavigationBarTitle({
      title: '商城'
    })
  },
  // onPageScroll(e) {
  //   let scrollTop = this.data.scrollTop
  //   this.setData({
  //     scrollTop: e.scrollTop
  //   })
  // },
  getGoodsList: function (append) {
    var that = this;
    wx.showLoading({
      "mask": true
    })
    console.log(app.globalData.userInfo);
    WXAPI.goods({
      name: that.data.inputVal,
      start: this.data.curPage,
      limit: this.data.pageSize
    }).then(function (res) {
      wx.hideLoading()
      if (res.result.goodsList.length == 0 ) {
        let newData = {
          loadingMoreHidden: false
        }
        if (!append) {
          newData.goods = []
        }
        that.setData(newData);
        return
      }
      let goods = [];
      if (append) {
        goods = res.result.goodsList
      }
      let fileUrl = res.result.fileUrl;

      for (var i = 0; i < res.result.goodsList.length; i++) {
        goods.push(res.result.goodsList[i]);
      }
      that.setData({
        loadingMoreHidden: true,
        goods: goods,
        fileUrl: fileUrl,
      });
    })
  },


  onShareAppMessage: function () {
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },

  toSearch: function () {
    this.setData({
      curPage: 1
    });
    this.getGoodsList();
  },
  onReachBottom: function () {
    this.setData({
      curPage: this.data.curPage + 1
    });
    this.getGoodsList( true)
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    this.setData({
      curPage: 1
    });
    this.getGoodsList()
    wx.stopPullDownRefresh()
  },
  // 以下为搜索框事件
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  goShopCar: function () {
    wx.navigateTo({
      url: "/pages/shop-cart/shop-cart"
    });
  },

})