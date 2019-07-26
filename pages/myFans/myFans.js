// pages/myFans/myFans.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    pageIndex:0,
    pageLimit:10,
    fileUrl:'',
    guanzhuArr:[],
    currentData: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      userId : options.userId
    })

    init( options.userId,_this)

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

  },
  //关注用户详情展示
  articleUserShow:function (e) {
    console.log("关注用户 e====", e)
    console.log("id ==" +e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/userIndexDetail/userIndexDetail?userId=' + e.currentTarget.dataset.id,
    })
  },
  //关注用户详情展示
  articleUserShow:function (e) {
    console.log("关注用户 e====", e)
    console.log("id ==" +e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/userIndexDetail/userIndexDetail?userId=' + e.currentTarget.dataset.id,
    })
  },
  //关注 取消关注按钮
  showGuanzhuUserDetail:function (e) {
    let _this = this;
    console.log("_this.data.guanzhuArr ==",_this.data.guanzhuArr)

    console.log("e show ...",e);

    console.log("load is isFollow is ====",_this.data.guanzhuArr[e.target.dataset.index].isFollow);
    let tempArr = _this.data.guanzhuArr;
    //取消关注
    if(_this.data.guanzhuArr[e.target.dataset.index].isFollow == 1){

      wx.showModal({
        title: '提示',
        content: '确定要取消关注吗？',
        success: function (sm) {
          if (sm.confirm) {
            // 用户点击了确定
              wx.request({
                url: app.globalData.host + 'userCollection/removeCollection',
                data: {
                  userId:_this.data.userId,
                  attentionUserId:e.target.dataset.id
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
                  if (res.data.code == 0) {

                    console.log("tempArr ==== ",tempArr);
                    console.log("index ==",e.target.dataset.index)
                    //取消关注
                    tempArr[e.target.dataset.index].isFollow =0;
                    console.log("atfer deal tempArr ===",tempArr)
                    _this.setData({
                      guanzhuArr:tempArr
                    })

                  }
                }

              })

          } else if (sm.cancel) {
            console.log('用户点击取消')
          }
        }
      })

      //关注
    }else{
      wx.request({
        url: app.globalData.host + 'userCollection/addCollection',
        data: {
          userId:_this.data.userId,
          attentionUserId:e.target.dataset.id
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
          if (res.data.code == 0) {
            //关注
            tempArr[e.target.dataset.index].isFollow =1;
            _this.setData({
              guanzhuArr:tempArr
            })

          }
        }

      })

    }
  }
})

//初始化查询我的关注列表
function init(userId,_this) {

  wx.request({
    url: app.globalData.host + 'userCollection/myFansList',
    data: {
      page:0,
      pageLimit:10,
      userId:userId,
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
      if (res.data.code == 0) {
        _this.setData({
          fileUrl: res.data.data.fileUrl,
          guanzhuArr:res.data.data.data
        })


      }
    }

  })



}
