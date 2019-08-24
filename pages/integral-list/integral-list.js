const app = getApp()
const WXAPI = require('../../wxapi/main')
Page({
  data: {
    statusType: ["未到账", "已到账"],
    hasRefund: false,
    currentType: 0,
    tabClass: ["", "", "", "", ""],
    page: 1,
    limit: 10,
    orderList: null,
    order: [],
    loadingMoreHidden: true,
    user: null,
    form_info:"",
    keyongjifen:0
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
  statusTap: function(e) {
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
    this.setData({
      page: 1,
      order: []
    });
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
    var limit = that.data.limit;
    var _count = page * limit;
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
  onShow: function() {
    // 获取订单列表
    var that = this;
    var status = that.data.currentType;
    var postData = {
      userId: app.globalData.userInfo.id,
      start: that.data.page,
      limit: that.data.limit,
      type: status,
    };
    var order = that.data.order;
    wx.showLoading({
      "mask": true
    })
    WXAPI.detailsList(postData).then(function(res) {
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
            count: res.result.count,
            user: res.result.user,
            keyongjifen: res.result.user.userIntegral
          });
        } else {
          that.setData({
            orderList: null
          });
        }

      }
    })
  },

  addMoney: function(e) {
    var that = this;
    var amount = 0;
    amount = e.detail.value.amount;
    if (amount < 1000) {
      wx.hideLoading();
      wx.showModal({
        title: '错误',
        content: '提现至少1000积分',
        showCancel: false
      })
      return;
    }
    if (that.data.keyongjifen < amount){
      wx.hideLoading();
      wx.showModal({
        title: '错误',
        content: '可用积分不足',
        showCancel: false
      })
      return;
    }
    var postData = {
      userId: app.globalData.userInfo.id,
      cashOutScore: amount,
    };
    wx.showModal({
      title: '是否提现' + amount + '积分？',
      success: function(res) {
        if (res.confirm) {
          WXAPI.addCashOut(postData).then(function(res) {
            if (res.recode == 1) {
              wx.showToast({
                title: '提现成功',
              })
              that.setData({
                form_info: '',
                page: 1,
                order: [],
              });
              setTimeout(function () {
                that.onShow();
              }, 2000)
            } else {
              wx.showToast({
                title: '提现失败请重试',
              })
              that.setData({
                page: 1,
                order: []
              });
              setTimeout(function () {
                that.onShow();
              }, 2000)
            }
          })

        }
      }
    })
  },
  userCashOutList: function () {
    wx.navigateTo({
      url: "/pages/cash-out-list/cash-out-list" 
    })
    // 生命周期函数--监听页面隐藏

  },


  onHide: function() {
    this.setData({
      page: 1,
      order: []
    });
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载

  },
 


})