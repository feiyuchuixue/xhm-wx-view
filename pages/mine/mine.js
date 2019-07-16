// pages/mine/mine.js
const app =getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      pageIndex:1,
      pageLimit:10,
      currentData:0,
      windowHeight: 0,//获取屏幕高度
      refreshHeight: 0,//获取高度
      refreshing: false,//是否在刷新中
      refreshAnimation: {}, //加载更多旋转动画数据
      clientY: 0,//触摸时Y轴坐标
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
      var _this = this;
      //获取屏幕高度
      wx.getSystemInfo({
          success: function (res) {
              _this.setData({
                  windowHeight: res.windowHeight
              })
              console.log("屏幕高度: " + res.windowHeight)
          }
      })
    //  this.init()

  },
  onShow:function(){
      var _this = this;

      _this.setData({
          pageIndex:1,
          currentData:0,
          article: [],
          fileUrl:''

      })

      this.init()
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
             },
             success: function(res) {
                 console.log("result success ===",res);
                 if(res.data.recode ==0){

                     let article = res.data.result.data.list;

                     let newList = _this.data.article.concat(article)
                     _this.setData({
                         article: newList,
                         fileUrl:res.data.result.fileUrl,
                         pageIndex:_this.data.pageIndex +1
                     })

                     console.log("数据初始化成功！！！");
                     console.log("data =====",res.data.result.data.list);
                     console.log("data =====",_this.data);

                 }
             }

         })


 },
    scroll:function () {
        console.log("滑动了。。。");
    },
    lower:function () {
        console.log("加载了。。。");
        let _this = this;
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
    upper:function(){

      console.log("下拉了。。。。。。。。。。。。。。。。。。。")
        //获取用户Y轴下拉的位移

        if (this.data.refreshing) return;
        this.setData({ refreshing: true });
        updateRefreshIcon.call(this);
        console.log("下拉请求中。。。。。。。。。。。。。。。。。。。")
        let _this = this;

        wx.request({
            url: app.globalData.host + 'articleCon/selByUserId',
            data:  {
                uid:'c0fb320807454e4fbea024d31c9c5c75',
                start:1,
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
                _this.setData({
                    refreshing: false
                })

            },
            success: function(res) {
                console.log("result success ===",res);
                if(res.data.recode ==0){
                    let article = res.data.result.data.list;
                    let newList = _this.data.article.concat(article)
                    _this.setData({
                        article: newList,
                        fileUrl:res.data.result.fileUrl,
                        pageIndex:  1
                    })

                }
            }

        })


    },

    start: function (e) {
      console.log("start =======================================")
        var startPoint = e.touches[0]
        console.log("startPoint ==="+startPoint);
        var clientY = startPoint.clientY;
        this.setData({
            clientY: clientY,
            refreshHeight: 0
        })
    },
    end: function (e) {
        console.log("end =======================================")
        var endPoint = e.changedTouches[0]
        console.log("endPoint ==="+endPoint);
        var y = (endPoint.clientY - this.data.clientY) * 0.6;
        console.log("y============="+y);
        if (y > 50) {
            y = 50;
        }
        this.setData({
            refreshHeight: y
        })
    },
    move: function (e) {
        console.log("下拉滑动了...")
    }

})

/**
 * 旋转上拉加载图标
 */
function updateRefreshIcon() {
    var deg = 0;
    var _this = this;
    console.log('旋转开始了.....')
    var animation = wx.createAnimation({
        duration: 1000
    });

    var timer = setInterval(function () {
        if (!_this.data.refreshing)
            clearInterval(timer);
        animation.rotateZ(deg).step();//在Z轴旋转一个deg角度
        deg += 360;
        _this.setData({
            refreshAnimation: animation.export()
        })
    }, 1000);
}

