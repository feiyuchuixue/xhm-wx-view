//mine.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageIndex:0,
    pageLimit:10,
   // tabs: ["推荐", "宝妈团", "出游", "专栏"],
    tabs: ["推荐", "1", "2", "3"],
    activeIndex: 0,
    sliderOffset: 0,
    article:[],
    fileUrl:'',
    loading: false,
    allloaded: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options,e) {
  /*  console.log("init this ...")
    let _this = this;

     init(_this,e)*/

  },

  onShareAppMessage: function () {
    return {
      title: '分享标题：听会儿中医最新课程',
      path: ''
    }
  },


  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.mTabWidth = res.windowWidth / that.data.tabs.length;
      }
    });
    let _this = this;
    if(_this.data.article.length>0){
      return;
    }
    init(_this,e)
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindChange: function (e) {
    var that = this;
    var curIndex = e.detail.current;
    that.setData({
      sliderOffset: curIndex * that.mTabWidth,
      activeIndex: curIndex,
      article: [],
      loading: false,
      allloaded: false,
      pageIndex:0,
      pageLimit:10,
    });



    init(that,e)
  },
  tabClick: function (e) {
    var that = this;
    var cIndex = e.currentTarget.id;
    that.setData({
      sliderOffset: cIndex * that.mTabWidth,
      activeIndex: cIndex,
      article: [],
      loading: false,
      allloaded: false,
      pageIndex:0,
      pageLimit:10,
    });

    init(that,e)
  },
  //搜索框
  handleMainSearchInput(event){
    console.log("init  handleTopicsInput...")
    wx.navigateTo({
      url: '/pages/mainSearch/mainSearch',
    })
  },

  // 加载更多
  loadmore({
             detail
           }) {
    this.getList().then(res => {
      detail.success();
    });
  },
  // 刷新
  refresh({
            detail
          }) {
    console.log("刷新。。。。")
    let _this = this;


    _this.setData({
      list: [],
      loading: false,
      allloaded: false,
      pageIndex:0,
      pageLimit:10,

    })
    //要延时执行的代码
    _this.getList('refresh').then(res => {
      detail.success();
    });



  },
  getList(index) {
    let _this =this;
    return new Promise((resolve, reject) => {
      if (this.data.loading || this.data.allloaded) {
        resolve();
        return;
      }
      this.setData({
        loading: true
      })

      let start = 0;
      let limit = 10;
      if(!index || index != 'refresh'){
        if( _this.data.pageIndex ==0){
          start =1;
          _this.setData({
            pageIndex:1
          })
        }else{
          start= _this.data.pageIndex,
              limit=_this.data.pageLimit
        }


      }

      let startLike =0;
      let startLimit =10;

      if(!index || index != 'refresh'){
        startLike=  _this.data.pageLikeIndex,
        startLimit= _this.data.pageLikeLimit
      }

      //笔记页面
      if(_this.data.activeIndex == 0){
        console.log("切换 article ===",_this.data.article);


        wx.request({
          url: app.globalData.host + 'articleCon/mainList',
          data: {
            type:_this.data.tabs[_this.data.activeIndex],
            page: start,
            size: limit
          },
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          complete: function (res) {
            if (res == null || res.data == null) {
              // reject(new Error('网络请求失败'))
            }
            //跳转回前页
            //  wx.navigateBack({})
            _this.setData({
              refreshing: false
            })

          },
          success: function (res) {
            console.log("result success ===", res);
            if (res.data.code == 0) {
              let article =  res.data.data.data;
              let newList = [];

              if(index && index == 'refresh'){
                newList =article;
              }else{
                newList = _this.data.article.concat(article)
              }

              if (article.length<=0) {
                console.log("没有数据来")
                _this.setData({
                  allloaded: true
                })
              }

              _this.setData({
                article: newList,
                fileUrl:res.data.data.fileUrl,
                pageIndex: _this.data.pageIndex +1,
                loading: false
              })



              resolve();


            }
          }

        })

        //收藏页面
      }else{

        wx.request({
          url: app.globalData.host + 'articleCon/mainList',
          data: {
            type:_this.data.tabs[_this.data.activeIndex],
            page: 0,
            size: 10
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

            _this.setData({
              refreshing: false
            })

          },
          success: function (res) {
            console.log("result success ===", res);
            if (res.data.code == 0) {



              let article = res.data.data.data;
              let newList = [];

              if(index && index == 'refresh'){
                newList =article;
              }else{
                newList = _this.data.articleLike.concat(article)
              }

              if (article.length<=0) {
                console.log("没有数据来")
                _this.setData({
                  allloaded: true,
                  loading: false,
                })
              }


              _this.setData({
                articleLike: newList,
                fileUrlLike: res.data.data.fileUrl,
                pageLikeIndex: _this.data.pageLikeIndex +1,
                loading: false,
                isTopRefreshShow:true
              })

              resolve();


            }
          }

        })


      }




    })
  },
  //显示文章详情
  showArticleDetail: function (e) {
    console.log("显示文章详情===",e);

    wx.navigateTo({
      url: '/pages/myNoteDetail/myNoteDetail?aid=' + e.target.dataset.id,
    })
  },

})

//初始化加载信息查询
function init(_this,e){


    wx.request({
      url: app.globalData.host + 'articleCon/mainList',
      data: {
        type:_this.data.tabs[_this.data.activeIndex],
        page: 0,
        size: 10
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

        _this.setData({
          refreshing: false
        })

      },
      success: function (res) {
        console.log("result success ===", res);
        if (res.data.code == 0) {
          _this.setData({
            article:  res.data.data.data,
            fileUrl: res.data.data.fileUrl
          })

        }
      }

    })

}
