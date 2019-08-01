const WXAPI = require('../../wxapi/main')
const app = getApp();
const WxParse = require('../../wxParse/wxParse.js');
const regeneratorRuntime = require('../../utils/runtime')
const CONFIG = require('../../config.js')
const SelectSizePrefix = "选择："


Page({
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    goodsDetail: {},
    swiperCurrent: 0,
    hasMoreSelect: false,
    selectSize: SelectSizePrefix,
    selectSizePrice: 0,
    totalScoreToPay: 0,
    shopNum: 0,
    hideShopPopup: true,
    buyNumber: 1,
    buyNumMin: 1,
    buyNumMax: 100,

    propertyChildIds: "",
    propertyChildNames: "",
    canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
    shopCarInfo: {},
    shopType: "addShopCar", //购物类型，加入购物车或立即购买，默认为加入购物车
    currentPages: undefined,

    openShare: false,
    isIMG:true,
    isVIDEO:false,
  },

  //事件处理函数
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
    async onLoad(e) {
    if (e && e.scene) {
      const scene = decodeURIComponent(e.scene) 
      if (scene) {
        e.id = scene.split(',')[0]
        wx.setStorageSync('referrer', scene.split(',')[1])
      }
    }
    this.data.goodsId = e.id
    const that = this
    this.data.kjJoinUid = e.kjJoinUid
    // 获取购物车数据
      wx.getStorage({
        key: 'shopCarInfo',
        success: function (res) {
          that.setData({
            shopCarInfo: res.data,
            shopNum: res.data.shopNum,
            curuid: wx.getStorageSync('uid')
          });
        }
      })
  },
  onShow() {
    this.getGoodsDetailAndKanjieInfo(this.data.goodsId)
  },
  async getGoodsDetailAndKanjieInfo(goodsId) {
    const that = this;
    const goodsDetailRes = await WXAPI.goodsDetail(goodsId)
    if (goodsDetailRes.recode == 0) {
      var img = goodsDetailRes.result.goods.goodsImg;
      var imgArr = [];
      let _data = {
        goodsName: goodsDetailRes.result.goods.goodsName,//名称描述
        goodsDescribe: goodsDetailRes.result.goods.goodsDescribe,//描述
        goodsImg : goodsDetailRes.result.goods.goodsImg,//图片
        goodsPrice: goodsDetailRes.result.goods.goodsPrice,//原价
        goodsCurrentPrice: goodsDetailRes.result.goods.goodsCurrentPrice,//现价
        goodsVideo: goodsDetailRes.result.goods.goodsVideo,//视频
        goodsDetails: goodsDetailRes.result.goods.goodsDetails,//详情
        fileUrl: goodsDetailRes.result.fileUrl,
        imgArr : img.split(","),
      }
      var selectSizeTemp = SelectSizePrefix;
      that.setData(_data);
      WxParse.wxParse('article', 'html', goodsDetailRes.result.goods.goodsDetails, that, 5);

    }
  },
  goShopCar: function () {
    wx.navigateTo({
      url: "/pages/shop-cart/shop-cart",
    });
  },
  onShowVideo:function(){

    this.setData({
      isIMG: false,
      isVIDEO: true,
    })
     
    
  },
  onShowImg: function () {
    this.setData({
      isIMG: true,
      isVIDEO: false,
    })
  },
  /**
   * 加入购物车
   */
  toAddShopCar: function () {
    this.setData({
      shopType: "addShopCar",
      selectSizePrice: this.data.goodsCurrentPrice
    })
    this.bindGuiGeTap();
  },
  /**
   * 立即购买
   */
  tobuy: function () {
    this.setData({
      shopType: "tobuy",
      selectSizePrice: this.data.goodsCurrentPrice
    });
    this.bindGuiGeTap();
  },
  /**
 * 购买数量选择弹出框
 */
  bindGuiGeTap: function () {
    this.setData({
      hideShopPopup: false
    })
  },
  /**
   * 购买数量选择弹出框隐藏
   */
  closePopupTap: function () {
    this.setData({
      hideShopPopup: true
    })
  },
  /**
   * 减少购买数量
   */
  numJianTap: function () {
    if (this.data.buyNumber > this.data.buyNumMin) {
      var currentNum = this.data.buyNumber;
      currentNum--;
      this.setData({
        buyNumber: currentNum
      })
    }
  },
  /**
   * 增加购买数量
   */
  numJiaTap: function () {
      var currentNum = this.data.buyNumber; 
      currentNum++;
      this.setData({
        buyNumber: currentNum
      })
  },
  /**
   * 选择商品规格
   * @param {Object} e
   */
  labelItemTap: function (e) {
    var that = this;
    // 取消该分类下的子栏目所有的选中状态
    var childs = that.data.goodsDetail.properties[e.currentTarget.dataset.propertyindex].childsCurGoods;
    for (var i = 0; i < childs.length; i++) {
      that.data.goodsDetail.properties[e.currentTarget.dataset.propertyindex].childsCurGoods[i].active = false;
    }
    // 设置当前选中状态
    that.data.goodsDetail.properties[e.currentTarget.dataset.propertyindex].childsCurGoods[e.currentTarget.dataset.propertychildindex].active = true;
    // 获取所有的选中规格尺寸数据
    var needSelectNum = that.data.goodsDetail.properties.length;
    var curSelectNum = 0;
    var propertyChildIds = "";
    var propertyChildNames = "";
    for (var i = 0; i < that.data.goodsDetail.properties.length; i++) {
      childs = that.data.goodsDetail.properties[i].childsCurGoods;
      for (var j = 0; j < childs.length; j++) {
        if (childs[j].active) {
          curSelectNum++;
          propertyChildIds = propertyChildIds + that.data.goodsDetail.properties[i].id + ":" + childs[j].id + ",";
          propertyChildNames = propertyChildNames + that.data.goodsDetail.properties[i].name + ":" + childs[j].name + "  ";
        }
      }
    }
    var canSubmit = false;
    if (needSelectNum == curSelectNum) {
      canSubmit = true;
    }
    // 计算当前价格
    if (canSubmit) {
      WXAPI.goodsPrice({
        goodsId: that.data.goodsDetail.basicInfo.id,
        propertyChildIds: propertyChildIds
      }).then(function (res) {
        let _price = res.data.price
        if (that.data.shopType == 'toPingtuan') {
          _price = res.data.pingtuanPrice
        }
        that.setData({
          selectSizePrice: _price,
          totalScoreToPay: res.data.score,
          propertyChildIds: propertyChildIds,
          propertyChildNames: propertyChildNames,
          buyNumMax: 100,
          buyNumber: (res.data.stores > 0) ? 1 : 0
        });
      })
    }


    this.setData({
      goodsDetail: that.data.goodsDetail,
      canSubmit: canSubmit
    })
  },
  /**
   * 加入购物车
   */
  addShopCar: function () {
    if (this.data.buyNumber < 1) {
      wx.showModal({
        title: '提示',
        content: '购买数量不能为0！',
        showCancel: false
      })
      return;
    }
    //组建购物车
    var shopCarInfo = this.bulidShopCarInfo();

    this.setData({
      shopCarInfo: shopCarInfo,
      shopNum: shopCarInfo.shopNum
    });

    // 写入本地存储
    wx.setStorage({
      key: 'shopCarInfo',
      data: shopCarInfo
    })
    this.closePopupTap();
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })

    //shopCarInfo = {shopNum:12,shopList:[]}
  },
  /**
   * 立即购买
   */
  buyNow: function (e) {
    let that = this
    let shoptype = e.currentTarget.dataset.shoptype
    if (this.data.goodsDetail.properties && !this.data.canSubmit) {
      this.bindGuiGeTap();
    }
    if (this.data.buyNumber < 1) {
      wx.showModal({
        title: '提示',
        content: '购买数量不能为0！',
        showCancel: false
      })
      return;
    }
    //组建立即购买信息
    var buyNowInfo = this.buliduBuyNowInfo();
    // 写入本地存储
    wx.setStorage({
      key: "buyNowInfo",
      data: buyNowInfo
    })
    this.closePopupTap();
      wx.navigateTo({
        url: "/pages/to-order/to-order?orderType=buyNow"
      })


  },
  /**
   * 组建购物车信息
   */
  bulidShopCarInfo: function () {
    // 加入购物车
    var shopCarMap = {};
    shopCarMap.goodsId = this.data.goodsId;
    shopCarMap.pic = this.data.goodsImg;
    shopCarMap.name = this.data.goodsName;
    shopCarMap.price = this.data.goodsCurrentPrice;
    shopCarMap.left = "";
    shopCarMap.active = true;
    shopCarMap.number = this.data.buyNumber;
    shopCarMap.fileUrl = this.data.fileUrl;

    var shopCarInfo = this.data.shopCarInfo;
    if (!shopCarInfo.shopNum) {
      shopCarInfo.shopNum = 0;
    }
    if (!shopCarInfo.shopList) {
      shopCarInfo.shopList = [];
    }
    var hasSameGoodsIndex = -1;
    for (var i = 0; i < shopCarInfo.shopList.length; i++) {
      var tmpShopCarMap = shopCarInfo.shopList[i];
      if (tmpShopCarMap.goodsId == shopCarMap.goodsId && tmpShopCarMap.propertyChildIds == shopCarMap.propertyChildIds) {
        hasSameGoodsIndex = i;
        shopCarMap.number = shopCarMap.number + tmpShopCarMap.number;
        break;
      }
    }

    shopCarInfo.shopNum = shopCarInfo.shopNum + this.data.buyNumber;
    if (hasSameGoodsIndex > -1) {
      shopCarInfo.shopList.splice(hasSameGoodsIndex, 1, shopCarMap);
    } else {
      shopCarInfo.shopList.push(shopCarMap);
    }
    shopCarInfo.kjId = this.data.kjId;
    return shopCarInfo;
  },
  /**
   * 组建立即购买信息
   */
  buliduBuyNowInfo: function () {
    var shopCarMap = {};
    shopCarMap.goodsId = this.data.goodsId;
    shopCarMap.name = this.data.goodsName;
    shopCarMap.name = this.data.goodsName;
    shopCarMap.left = "";
    shopCarMap.active = true;
    shopCarMap.number = this.data.buyNumber;


    var buyNowInfo = {};
    if (!buyNowInfo.shopNum) {
      buyNowInfo.shopNum = 0;
    }
    if (!buyNowInfo.shopList) {
      buyNowInfo.shopList = [];
    }
    buyNowInfo.shopList.push(shopCarMap);
    buyNowInfo.kjId = this.data.kjId;
    return buyNowInfo;
  },
  reputation: function (goodsId) {
    var that = this;
    WXAPI.goodsReputation({
      goodsId: goodsId
    }).then(function (res) {
      if (res.recode == 0) {
        that.setData({
          reputation: res.data
        });
      }
    })
  },
  pingtuanList: function (goodsId) {
    var that = this;
    WXAPI.pingtuanList(goodsId).then(function (res) {
      if (res.code == 0) {
        that.setData({
          pingtuanList: res.data
        });
      }
    })
  }, 
  joinPingtuan: function (e) {
    let pingtuanopenid = e.currentTarget.dataset.pingtuanopenid
    wx.navigateTo({
      url: "/pages/to-pay-order/index?orderType=buyNow&pingtuanOpenId=" + pingtuanopenid
    })
  },
  goIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  openShareDiv() {
    this.setData({
      openShare: true
    })
  },
  closeShareDiv() {
    this.setData({
      openShare: false
    })
  },
  toPoster: function (e) { // 千万生成海报界面
    wx.navigateTo({
      url: "/pages/goods-details/poster?goodsid=" + e.currentTarget.dataset.goodsid
    })
  }
})