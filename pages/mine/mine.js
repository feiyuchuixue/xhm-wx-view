// pages/mine/mine.js
const app =getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      pageIndex:0,
      pageLimit:10,
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
            count: '0',
            txt: '获赞'
        },
        {
            count: '1',
            txt: '团成员'
        },
    ],
      article: [],
      fileUrl:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  onShow:function(){
      this.setData({
          pageIndex:1,
          article: [],
      })
      this.init()
    },
    // 下拉刷新
    onPullDownRefresh: function () {
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        let _this = this;

        wx.request({
            url: app.globalData.host + 'articleCon/selByUserId',
            data:  {
                uid:'c0fb320807454e4fbea024d31c9c5c75',
                start:1,
                limit:10
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            complete: function( res ) {
                console.log("result ===",res);
                if( res == null || res.data == null ) {
                    // reject(new Error('网络请求失败'))
                }
                //跳转回前页
                //  wx.navigateBack({})

                // 隐藏导航栏加载框
                wx.hideNavigationBarLoading();
                // 停止下拉动作
                wx.stopPullDownRefresh();

            },
            success: function(res) {
                console.log("result success ===",res);
                if(res.data.recode ==0){

                    _this.setData({
                        article: res.data.result.data.list,
                        fileUrl:res.data.result.fileUrl,
                    })

                }
            }

        })


    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var _this = this;
        // 显示加载图标
        wx.showLoading({
            title: '玩命加载中',
        })
        // 页数+1
        _this.setData({
            pageIndex: _this.data.pageIndex + 1
        })

        wx.request({
            url: app.globalData.host + 'articleCon/selByUserId',
            data:  {
                uid:'c0fb320807454e4fbea024d31c9c5c75',
                start:_this.data.pageIndex,
                limit:_this.data.pageLimit
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            complete: function( res ) {
                console.log("result ===",res);
                if( res == null || res.data == null ) {
                    // reject(new Error('网络请求失败'))
                }
                //跳转回前页
                //  wx.navigateBack({})

                // 隐藏加载框
                wx.hideLoading();

            },
            success: function(res) {
                console.log("result success ===",res);
                if(res.data.recode ==0){

                    let article = res.data.result.data.list;

                    let newList = _this.data.article.concat(article)


                    _this.setData({
                        article: newList,
                        fileUrl:res.data.result.fileUrl,
                    })

                }
            }

        })

    },

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
    wx.navigateTo({
      url: '/pages/upload-image/index',
    })


  },
//跳转到上传页面
createArticle2:function (e) {
  wx.navigateTo({
    url: '/pages/upload-image/index',
  })


},
 init:function (that) {

    let _this = this;

     wx.request({
         url: app.globalData.host + 'articleCon/selByUserId',
         data:  {
             uid:'c0fb320807454e4fbea024d31c9c5c75',
             start:1,
             limit:10
         },
         method: "POST",
         header: {
             "Content-Type": "application/x-www-form-urlencoded"
         },
         complete: function( res ) {
             console.log("result ===",res);
             if( res == null || res.data == null ) {
                 // reject(new Error('网络请求失败'))
             }
             //跳转回前页
             //  wx.navigateBack({})
         },
         success: function(res) {
             console.log("result success ===",res);
             if(res.data.recode ==0){

                 let article = res.data.result.data.list;
                 _this.setData({
                     article: article,
                     fileUrl:res.data.result.fileUrl,
                 })


                 console.log("数据初始化成功！！！");
                 console.log("data =====",res.data.result.data.list);
                 console.log("data =====",_this.data);

             }
         }

     })






 },

})
