const app = getApp()
const WXAPI = require('../../wxapi/main')
Page({
  data: {
    statusType: ["全部", "待付款", "待收货", "已完成"],
    hasRefund: false,
    currentType: 0,
    tabClass: ["", "", "", "", ""],
    page: 1,
    orderList: null,
    order: [],
    loadingMoreHidden: true,
  },
  
  onLoad: function(options) {
    if (options && options.type) {
      if (options.type == 99) {
        this.setData({
          hasRefund: true,
          currentType: options.type
        });
      } else {
        this.setData({
          hasRefund: false,
          currentType: options.type
        });
      }
    }
  },
  statusTap: function (e) {
    const curType = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.setData({
      currentType: curType,
      page: 1,
      order: []
    });
    this.onShow();
  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成

  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    this.setData({
      page: 1,
      order: []
    });
    this.onShow()
    wx.stopPullDownRefresh()

  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    var that = this;
    var page = that.data.page;
    var _count = page * 3;
    if (that.data.count  < _count - 3){
      that.setData({
        loadingMoreHidden: false
      }); 
      return;
    }else{
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
  onShow: function() {
    // 获取订单列表
    var that = this;
    var status = that.data.currentType;
    if (status == 0) {
      status = ''
    }
    var postData = {
      userId: app.globalData.userInfo.id,
      start: that.data.page,
      limit: 3,
      orderStatus: status,
    };
    var order = that.data.order;
    wx.showLoading({
      "mask": true
    })
    WXAPI.orderList(postData).then(function(res) {
      var _count = that.data.page * 3;
      if (res.recode == 0) {
        wx.hideLoading()
        if (res.result.count != 0) {
            for (var i = 0; i < res.result.orderList.length; i++) {
              order.push(res.result.orderList[i]);
            }
            that.setData({
              orderList: order,
              fileUrl: res.result.fileUrl,
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
  onHide: function() {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载

  },


})