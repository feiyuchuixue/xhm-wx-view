// pages/topics/topics.js
// 1 导入js文件
var WxSearch = require('../../wxSearchView/wxSearchView.js');


Page(


    {

  /**
   * 页面的初始数据
   */
  data: {
    topics:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    WxSearch.init(
        that,  // 本页面一个引用
        ['杭州', '嘉兴', "海宁", "桐乡", '宁波', '金华'], // 热点搜索推荐，[]表示不使用
        ['湖北', '湖南', '北京', "南京"],// 搜索匹配，[]表示不使用
        that.mySearchFunction, // 提供一个搜索回调函数
        that.myGobackFunction //提供一个返回回调函数
    );


  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数


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

  },
  handlerTopicsInput:function (event) {
    console.log("event==",event)
    console.log("event detail ===",event.detail)
    console.log("event detail value ===",event.detail.value)
    this.setData({
      topics:event.detail.value
    })

  },
  // 搜索回调函数
  mySearchFunction: function (value) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    console.log("搜索触发 请求后端接口。。。"+value)
    console.log("prevPage==",prevPage)
    // do your job here
    // 跳转
    prevPage.setData({
      topics:value
    })

    /*    wx.redirectTo({
      url: '../searchResult/searchResult?searchValue='+value
    })*/
  },

  // 返回回调函数
  myGobackFunction: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    // do your job here
    // 跳转
    prevPage.setData({
      topics:value
    })
  }
})
