const app = getApp()
const WXAPI = require('../../wxapi/main')

Page({
  data: {
    totalScoreToPay: 0,
    goodsList: [],
    sum: 0,
    goodsJsonStr: "",
    orderType: "", //订单类型，购物车下单或立即支付下单，默认是购物车，

    hasNoCoupons: true,
    coupons: [],
    goods: [],
    goodsObj:[],

  },
  onShow: function() {
    const that = this;
    let shopList = [];
    //立即购买下单                                                                                                         
    if ("buyNow" == that.data.orderType) {
      var buyNowInfoMem = wx.getStorageSync('buyNowInfo');
      that.data.kjId = buyNowInfoMem.kjId;
      if (buyNowInfoMem && buyNowInfoMem.shopList) {
        shopList = buyNowInfoMem.shopList
        that.goodsOrder(shopList);
      }
    } else {
      //购物车下单
      var shopCarInfoMem = wx.getStorageSync('shopCarInfo');
      console.log(shopCarInfoMem);
      that.data.kjId = shopCarInfoMem.kjId;
      if (shopCarInfoMem && shopCarInfoMem.shopList) {
        // shopList = shopCarInfoMem.shopList
        shopList = shopCarInfoMem.shopList.filter(entity => {
          return entity.active;
        });
        that.goodsOrder(shopList);
      }
    }
  },
  onLoad: function(e) {
    let _data = {}
    if (e.orderType) {
      _data.orderType = e.orderType
    }
    this.setData(_data);
  },
  goodsOrder: function(shopList) {
    var that = this;
    var goods = [];
    var goodsObj = [];
    var heji = 0;
    var fileUrl = '';
    for (var i = 0; i < shopList.length; i++) {
      var obj = new Object();
      obj.goodsId = shopList[i].goodsId;
      obj.goodsNumber = shopList[i].number;
      goodsObj.push(obj);
    }
    if (goodsObj) {
      WXAPI.goodsOrserList({
        goList: JSON.stringify(goodsObj)
      }).then(function(res) {
        wx.hideLoading()
        if (res.recode == 0) {
          console.log(res);
          for (var j = 0; j < res.result.goodsOrderList.length; j++) {
            goods.push(res.result.goodsOrderList[j]);
          }
          heji = res.result.sum;
          fileUrl = res.result.fileUrl;
        }
        that.setData({
          goodsList: goods,
          sum: heji,
          fileUrl: fileUrl,
          goodsObj: goodsObj,
        });
        that.createOrder();
      })

    }
  },
  createOrder: function(e) {
    var that = this;
    var remark = "";
    var shrName = "";
    var shrPhone = "";
    var shrAddr = "";
    if (e) {
      console.log(e)
      remark = e.detail.value.remark; // 备注信息
      shrName = e.detail.value.shrName;
      shrPhone = e.detail.value.shrPhone;
      shrAddr = e.detail.value.shrAddr;
      if (!shrName) {
        wx.hideLoading();
        wx.showModal({
          title: '错误',
          content: '请先填写您的收货人！',
          showCancel: false
        })
        return;
      }
      if (!shrPhone) {
        wx.hideLoading();
        wx.showModal({
          title: '错误',
          content: '请先填写您的收货电话！',
          showCancel: false
        })
        return;
      }
      if (!shrAddr) {
        wx.hideLoading();
        wx.showModal({
          title: '错误',
          content: '请先填写您的收货地址！',
          showCancel: false
        })
        return;
      }
      WXAPI.addOrder({
        userId: app.globalData.userInfo.id,
        openId: app.globalData.userInfo.userOpenId,
        shrName: shrName,
        shrPhone: shrPhone,
        shrAddr: shrAddr,
        goodsList: JSON.stringify(this.data.goodsObj),
        remark: remark
      }).then(function(res) {
        wx.hideLoading()
        //清空购物车
        wx.removeStorageSync('shopCarInfo');
        if (res.recode == 0) {
          console.log(res);
          wx.navigateTo({
            url: "/pages/order-details/order-details?id=" + res.result.orderMasterId
          })
        }
      })

    }

  }
})