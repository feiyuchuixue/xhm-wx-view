// pages/myFans/myFans.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    page:1,
    pageLimit:6,
    fileUrl:'',
    guanzhuArr:[],
    currentData: 0,
    list:[],
    loadingMoreHidden: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      userId : options.userId
    })

    _this.init( options.userId,_this)

  },
  /**
 * 页面上拉触底事件的处理函数
 */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      page: 1,
      list: []
    });
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
    this.setData({
      page: 1,
      list: []
    });
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
    console.log(222222);
    this.setData({
      page: 1,
      list: []
    });
    this.init(this.data.userId);
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    console.log(111111111111111);
    var that = this;
    var page = that.data.page;
    var _count = page * this.data.pageLimit;
    if (that.data.count < _count - this.data.pageLimit) {
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
      that.init(that.data.userId);
      wx.hideLoading();
    }

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //关注用户详情展示
  articleUserShow:function (e) {
    console.log("id ==" +e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/userGroupDetail/userGroupDetail?userId=' + e.currentTarget.dataset.id,
    })
  },
  init: function (userId ) {
    var _this = this
    //替换成 查询group列表接口请求
    wx.request({
      url: app.globalData.pathURL + '/xhm/userGroup/userGroupList',
      data: {
        start: _this.data.page,
        limit: _this.data.pageLimit,
        userId: 'eeed2668ad704e6cbc21dc7094102523',
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      complete: function (res) {
        console.log("result ===", res);
        if (res == null || res.data == null) {
          // reject(new Error('网络请求失败'))
        }
      },
      success: function (res) {
        console.log("result success ===", res);
        if (res.data.recode == 0) {
          var _count = _this.data.page * _this.data.pageLimit;
          var list = _this.data.list;
          for (var j = 0; j < res.data.result.list.length; j++) {
            list.push(res.data.result.list[j]);
          }

          _this.setData({
            fileUrl: res.data.result.fileUrl,
            guanzhuArr: list,
            count: res.data.result.count,
            userId: userId,
            loadingMoreHidden: true
          })
          for (let i = 0; i < _this.data.guanzhuArr.length; i++) {
            let thisLogo = _this.data.guanzhuArr[i].userLogo;
            let index = "guanzhuArr[" + i + "].userLogo"
            if (thisLogo.indexOf('http') < 0) {
              _this.setData({
                [index]: _this.data.fileUrl + thisLogo
              })
            }
          }
        }
      }

    })
  }

  //关注 取消关注按钮
})

//初始化查询我的团成员列表

