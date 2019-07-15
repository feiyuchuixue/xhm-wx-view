// pages/mine/mine.js
const app =getApp()
let pageIndex =0;
let pageLimit =10;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      page: 1,
      size: 10,
      loading: false,
      allloaded: false,
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
          page:1,
          article: [],
          loading: false,
          allloaded: false,
      })
      this.init()
    },

    // 加载更多
 loadmore({
                 detail
             }) {
        this.init().then(res => {
            detail.success();
        });
    },
    // 刷新
    refresh({
              detail
            }) {
        this.setData({
            article: [],
            loading: false,
            allloaded: false,
            page: 0
        })
        this.init().then(res => {
            detail.success();
        });
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

     return new Promise((resolve, reject) => {
         if (_this.data.loading || _this.data.allloaded) {
             resolve();
             return;
         }
         _this.setData({
             loading: true
         })


         wx.request({
             url: app.globalData.host + 'articleCon/selByUserId',
             data:  {
                 uid:'c0fb320807454e4fbea024d31c9c5c75',
                 start:_this.data.page,
                 limit:_this.data.size
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


                     console.log("length:"+res.data.result.data.list.length);
                     if(res.data.result.data.list.length != 0){

                         let article = res.data.result.data.list;

                         let newList = _this.data.article.concat(article)
                         if (article.length < _this.data.size) {
                             _this.setData({
                                 allloaded: true
                             })
                         }
                         _this.setData({
                             article: newList,
                             fileUrl:res.data.result.fileUrl,
                             loading: false,
                             page: _this.data.page + 1
                         })


                         console.log("数据初始化成功！！！");
                         console.log("data =====",res.data.result.data.list);
                         console.log("data =====",_this.data);
                     }else {
                        console.log("没有数据了")
                         _this.setData({
                             allloaded: true
                         })


                     }



                 }
             }


         })
             resolve();

     })


     if (_this.data.loading || _this.data.allloaded) {
         return;
     }
     _this.setData({
         loading: true
     })





 },
    //下拉加载
    bindDownLoad: function () {
        var that = this;
        this.init()
    },

    scroll: function (event) {
      console.log("scrollTop is ...",event.detail.scrollTop)
        //该方法绑定了页面滚动时的事件，这里记录了当前的 position.y 的值,为了请求数据之后把页面定位到这里来。
        this.setData({
            scrollTop: event.detail.scrollTop
        });
    },

    //上拉刷新
    topLoad: function (event) {
      console.log("触发上拉=============================")
        var that = this;
        //数据刷新
        pageIndex = 0;
        this.setData({
            pageIndex: 1,
            article: [],
            scrollTop: 0
        });
        this.init()
    }

})
