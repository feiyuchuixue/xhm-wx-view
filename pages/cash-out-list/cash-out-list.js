const app = getApp()
const WXAPI = require('../../wxapi/main')
Page({
  data: {
    
    hasRefund: false,
    currentType: 0,
    tabClass: ["", "", "", "", ""],
    page: 1,
    limit: 10,
    orderList: null,
    order: [],
    loadingMoreHidden: true,
  },

  onLoad: function (options) {

  },

  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    this.setData({
      page: 1,
      order: []
    });
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    this.setData({
      page: 1,
      order: []
    });
    this.onShow()
    wx.stopPullDownRefresh()

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    var that = this;
    var page = that.data.page;
    var _count = page * that.data.limit;
    if (that.data.count < _count - that.data.limit) {
      that.setData({
        loadingMoreHidden: false
      });
      return;
    } else {
      wx.showLoading({
        title: '玩命加载中',
      });
      that.setData({
        page: page + 1,
      });
      that.onShow();
      wx.hideLoading();
    }

  },
  onShow: function () {
    // 获取订单列表
    var that = this;
    var postData = {
      userId: app.globalData.userInfo.id,
      start: that.data.page,
      limit: that.data.limit,
    };
    var order = that.data.order;
    wx.showLoading({
      "mask": true
    })
    WXAPI.cashOutList(postData).then(function (res) {
      var _count = that.data.page * that.data.limit;
      if (res.recode == 0) {
        wx.hideLoading()
        if (res.result.count != 0) {
          for (var i = 0; i < res.result.list.length; i++) {
            order.push(res.result.list[i]);
          }
          that.setData({
            orderList: order,
            loadingMoreHidden: true,
            count: res.result.count
          });
        } else {
          that.setData({
            orderList: null
          });
        }

      }
    })
  },
  onHide: function () {
    this.setData({
      page: 1,
      order: []
    });
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },


})