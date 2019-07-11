// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    user: [
      {
        name: '崔迪',
        head: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
      }
    ],
    num: [
      {
        count: '0',
        txt: '关注'
      },
      {
        count: '1',
        txt: '粉丝'
      },
      {
        count: '2',
        txt: '收藏'
      },
      {
        count: '3',
        txt: '开车'
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
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
  //跳转到上传页面
  createArticle:function (e) {
    console.log("init this function createArticle ...")
    wx.navigateTo({
      url: '/pages/article/create',
    })


  }

})
