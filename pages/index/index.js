//mine.js
//获取应用实例
const app = getApp()
import ImgUtil from '../../utils/ImgUtils';
Page({
  data: {
    pageIndex:0,
    pageLimit:10,
    pageIndex1:0,
    pageIndex2:0,
    pageIndex3:0,

   // tabs: ["推荐", "宝妈团", "出游", "专栏"],
    tabs: ["推荐", "宝妈团", "出游", "专栏"],
    activeIndex: 0,
    sliderOffset: 0,
    article:[],
    article1:[],
    article2:[],
    article3:[],
    fileUrl:'',
    loading: false,
    allloaded: false,
    mariginLeft: [],
    mariginTop: [],
    imageWidth: [],
    imageHeight: [],
    screenWidth: 0,
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
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.windowWidth
        })
      }
    });

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
      article1: [],
      article2: [],
      article3: [],
      loading: false,
      allloaded: false,
      pageIndex:0,
      pageLimit:10,
      pageIndex1:0,
      pageIndex2:0,
      pageIndex3:0
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
      article1: [],
      article2: [],
      article3: [],
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
      pageIndex1:0,
      pageIndex2:0,
      pageIndex3:0,

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

        if(_this.data.activeIndex == 0){
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

        if(_this.data.activeIndex == 1){
          if( _this.data.pageIndex1 ==0){
            start =1;
            _this.setData({
              pageIndex1:1
            })
          }else{
            start= _this.data.pageIndex1,
                limit=_this.data.pageLimit
          }
        }

        if(_this.data.activeIndex == 2){
          if( _this.data.pageIndex2 ==0){
            start =1;
            _this.setData({
              pageIndex2:1
            })
          }else{
            start= _this.data.pageIndex2,
                limit=_this.data.pageLimit
          }
        }

        if(_this.data.activeIndex == 3){
          if( _this.data.pageIndex3 ==0){
            start =1;
            _this.setData({
              pageIndex3:1
            })
          }else{
            start= _this.data.pageIndex3,
                limit=_this.data.pageLimit
          }
        }

      }

      let startLike =0;
      let startLimit =10;

      if(!index || index != 'refresh'){
        startLike=  _this.data.pageLikeIndex,
        startLimit= _this.data.pageLikeLimit
      }
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
                if(_this.data.activeIndex == 0){
                  newList = _this.data.article.concat(article)
                }
                if(_this.data.activeIndex == 1){
                  newList = _this.data.article1.concat(article)
                }
                if(_this.data.activeIndex == 2){
                  newList = _this.data.article2.concat(article)
                }
                if(_this.data.activeIndex == 3){
                  newList = _this.data.article3.concat(article)
                }

              }

              _this.setData({
                fileUrl:res.data.data.fileUrl,
                loading: false
              })


              if(_this.data.activeIndex == 0){

                _this.setData({
                  article: newList,
                })

                if(article.length>0){
                  _this.setData({
                    pageIndex: _this.data.pageIndex +1,
                  })
                }

              }

              if(_this.data.activeIndex == 1){
                _this.setData({
                  article1: newList,
                })
                if(article.length>0){
                  _this.setData({
                    pageIndex1: _this.data.pageIndex1 +1,
                  })
                }

              }

              if(_this.data.activeIndex == 2){
                _this.setData({
                  article2: newList
                })
                if(article.length>0){
                  _this.setData({
                    pageIndex2: _this.data.pageIndex2 +1,
                  })
                }
              }

              if(_this.data.activeIndex == 3){
                _this.setData({
                  article3: newList,
                })

                if(article.length>0){
                  _this.setData({
                    pageIndex3: _this.data.pageIndex3 +1,
                  })
                }
              }

              resolve();


            }
          }

        })






    })
  },
  //显示文章详情
  showArticleDetail: function (e) {
    console.log("显示文章详情===",e);

    wx.navigateTo({
      url: '/pages/myNoteDetail/myNoteDetail?aid=' + e.currentTarget.dataset.id+"&from=other",
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

          if(_this.data.activeIndex == 0){
            _this.setData({
              article:  res.data.data.data,
              fileUrl: res.data.data.fileUrl
            })
          }

          if(_this.data.activeIndex == 1){
            _this.setData({
              article1:  res.data.data.data,
              fileUrl: res.data.data.fileUrl
            })
          }


          if(_this.data.activeIndex == 2){
            _this.setData({
              article2:  res.data.data.data,
              fileUrl: res.data.data.fileUrl
            })
          }

          if(_this.data.activeIndex == 3){
            _this.setData({
              article3:  res.data.data.data,
              fileUrl: res.data.data.fileUrl
            })
          }


        }
      }

    })

}
