// pages/goods/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://kxdev.houaihome.com/test_img/aa.jpg',
      'http://kxdev.houaihome.com/test_img/bb.jpg',
      'http://kxdev.houaihome.com/test_img/cc.jpg',
      'http://kxdev.houaihome.com/test_img/dd.jpg'
    ],
    introduce:[
      'http://kxdev.houaihome.com/test_img/g1.jpg',
      'http://kxdev.houaihome.com/test_img/g2.jpg',
      'http://kxdev.houaihome.com/test_img/g3.jpg'
    ],
    video:'http://kxdev.houaihome.com/test_img/ee.jpg',
    iconCart:[
      {
        src:'/image/ico_1.png'
      },
      {
        src: '/image/ico_2.png'
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
