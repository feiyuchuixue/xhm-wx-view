// pages/order-details/order-details.js
const app = getApp()
const WXAPI = require('../../wxapi/main')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderId: "",
    orderSlaveList: [],
    orderMaster: [],
    fileUrl: "",
    paySign: "",
    time_stamp:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderId: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    that.getOrder(that.data.orderId);
  },
  getOrder: function(orderId) {
    const that = this;
    var orderList = [];
    var order = [];
    var fileUrl = '';
    var pay_sign = "";
    var time_stamp1 = "";
    WXAPI.getOrderById({
      orderMasterId: orderId
    }).then(function(res) {
      wx.hideLoading()
      if (res.recode == 0) {
        console.log(res);
        for (var i = 0; i < res.result.orderSlaveList.length; i++) {
          orderList.push(res.result.orderSlaveList[i]);
        }
        order = res.result.orderMaster;
        fileUrl = res.result.fileUrl;
        if (order.orderStatus == 1) {
          pay_sign = res.result.paySign;
          time_stamp1 = res.result.timeStamp;
        }
        that.setData({
          orderSlaveList: orderList,
          orderMaster: order,
          fileUrl: fileUrl,
          paySign: pay_sign,
          time_stamp: time_stamp1,
        });

      }
    })

  },
  orderPay: function(e) {
    // var timestamp = Date.parse(new Date());
    // timestamp = timestamp / 1000;
    var timestamp = this.data.time_stamp;
    var nonce_str = this.data.orderMaster.wxNonceStr;
    var pack_age = 'prepay_id=' + this.data.orderMaster.wxPrepayId;
    var pay_sign = this.data.paySign;
    console.log(pay_sign);
    wx.requestPayment({
      'timeStamp': timestamp.toString(),
      'nonceStr': nonce_str,
      'package': pack_age,
      'signType': 'MD5',
      'paySign': pay_sign,
      'success': function(res) {
        console.log(res);
      },
      'fail': function(res) {
        console.log(res);
      },
      'complete': function(res) {
        if (res.errMsg == 'requestPayment:ok') {
          wx.showModal({
            title: '提示',
            content: '支付成功-点击确认跳转商城列表',
            showCancel: false
          });
          //跳转订单列表
          wx.switchTab({
            url: '/pages/goods-mall/goods-mall',
          })
        }
      }
    })
  },
  ordeeReceive:function(e){
    const that = this;
    const orderId = that.data.orderId;
    wx.showModal({
      title: '是否确认收货？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          WXAPI.updOrderStatus({
            orderId: orderId
          }).then(function (res) {
            if (res.recode == 0) {
              wx.navigateTo({
                url: '/pages/order-list/order-list',
              })
              wx.navigateTo({
                url: '/pages/order-list/order-list',
              })
              wx.navigateBack({
                delta: 2
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }


})