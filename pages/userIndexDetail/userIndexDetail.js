// pages/userIndexDetail/userIndexDetail.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:0,
    pageLimit:10,
    pageLikeIndex: 1,
    pageLikeLimit: 10,
    userId:'',
    fileUrl:'',
    userInfo:{},
    articleList:[],
    loading: false,
    allloaded: false,
    isRefreshs:false,
    isTopRefreshShow:true,
    currentData:0,

    articleLike: [],
    fileUrlLike: '',
    userInfoLike:{},
    loadingHidden:false,
    notFoundHidden:true



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("show detail ....",options.userId)

    let _this = this;
    _this.setData({
      userId:options.userId
    })
    init(options.userId,_this);

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
   //获取当前滑块的index
    bindchange: function (e) {
  const that = this;
  that.setData({
    currentData: e.detail.current,
    loadingHidden:false,
    notFoundHidden:true
  })
},
//点击切换，滑块index赋值
checkCurrent: function (e) {
  const that = this;

  that.setData({
    loading: false,
    allloaded: false,
    article:[],
    articleLike: [],
    pageIndex:0,
    pageLikeIndex: 1,
    loadingHidden:false,
    notFoundHidden:true
  })

  if(e.target.dataset.current == 1){
    that.initLike()
  }else{
    init()
  }


  if (that.data.currentData === e.target.dataset.current) {
    return false;
  } else {

    that.setData({
      currentData: e.target.dataset.current
    })
  }
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
      loading: false,
      allloaded: false,
      pageIndex:0,
      pageLimit:10,
      loadingHidden:false,
      notFoundHidden:true

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

      /*  start= _this.data.pageIndex,
        limit=_this.data.pageLimit*/
      }




      let startLike =0;
      let startLimit =10;

      if(!index || index != 'refresh'){

        if( _this.data.pageIndex ==0){
          startLike =1;
          _this.setData({
            pageLikeIndex:1
          })
        }else{
          startLike= _this.data.pageLikeIndex,
          startLimit=_this.data.pageLikeLimit
        }

     /*   startLike=  _this.data.pageLikeIndex,
        startLimit= _this.data.pageLikeLimit*/
      }


      //笔记页面
      if(_this.data.currentData == 0){
        wx.request({

          url: app.globalData.host + 'userCollection/collectionDetail',
          data: {
            page:start,
            pageLimit:limit,
            userId:_this.data.userId,
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
              let article = res.data.data.articleList;



              let newList = [];

              if(index && index == 'refresh'){
                newList =article;
                if(article.length>0){
                  _this.setData({
                    loadingHidden:true,
                    notFoundHidden:true
                  })
                }else{
                  _this.setData({
                    loadingHidden:true,
                    notFoundHidden:false
                  })
                }
              }else{
                newList = _this.data.articleList.concat(article)
              }

    /*          if (article.length<=0) {
                console.log("没有数据来")
                _this.setData({
                  allloaded: true
                })
              }*/


              _this.setData({
                articleList: newList,
                fileUrl: res.data.data.fileUrl,
                loading: false,
                isTopRefreshShow:true
              })

              if(article.length>0){
                _this.setData({
                  pageIndex: _this.data.pageLikeIndex +1,
                })
              }

              for(let i=0;i<_this.data.articleList.length;i++){
                let thisLogo = _this.data.articleList[i].articleCreateUserLogo;
                let index = "articleList["+i+"].articleCreateUserLogo"
                if(thisLogo.indexOf('http')<0){
                  _this.setData({
                    [index]:_this.data.fileUrl + thisLogo
                  })
                }

              }

              resolve();


            }
          }

        })

      //收藏页面
      }else{

        wx.request({
          url: app.globalData.host + 'articleLike/likeList',
          data: {
            userId: _this.data.userId,
            page: startLike,
            pageLimit: startLimit
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
                if(article.length>0){
                  _this.setData({
                    loadingHidden:true,
                    notFoundHidden:true
                  })
                }else{
                  _this.setData({
                    loadingHidden:true,
                    notFoundHidden:false
                  })
                }
              }else{
                newList = _this.data.articleLike.concat(article)
              }

           /*   if (article.length<=0) {
                console.log("没有数据来")
                _this.setData({
                  allloaded: true,
                  loading: false,
                })
              }*/


              _this.setData({
                articleLike: newList,
                fileUrlLike: res.data.data.fileUrl,
                loading: false,
                isTopRefreshShow:true
              })
              if(article.length>0){
                _this.setData({
                  pageLikeIndex: _this.data.pageLikeIndex +1,
                })
              }

              for(let i=0;i<_this.data.articleLike.length;i++){
                let thisLogo = _this.data.articleLike[i].articleCreateUserLogo;
                let index = "articleLike["+i+"].articleCreateUserLogo"
                if(thisLogo.indexOf('http')<0){
                  _this.setData({
                    [index]:_this.data.fileUrl + thisLogo
                  })
                }

              }

              resolve();


            }
          }

        })


      }




    })
  },
  //显示文章详情
  showArticleDetail: function (e) {
    console.log("文章id详情==",e);

    wx.navigateTo({
      url: '/pages/myNoteDetail/myNoteDetail?aid=' + e.currentTarget.dataset.id+"&from=other",
    })
  },
  //查看关注我的人
  showCollection:function (e) {
  /*  console.log("关注人 e====", e)
    console.log("id ==" +e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/myCollection/myCollection?userId=' + e.currentTarget.dataset.id,
    })*/
  },

  //收藏初始化
  initLike: function () {

    let _this = this;

    wx.request({
      url: app.globalData.host + 'articleLike/likeList',
      data: {
        userId:_this.data.userId,
        page:0,
        pageLimit:10
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
        if (res.data.code == 0) {

          let article = res.data.data.data;

          if(article.length>0){
            _this.setData({
              loadingHidden:true,
              notFoundHidden:true
            })
          }else{
            _this.setData({
              loadingHidden:true,
              notFoundHidden:false
            })
          }


          let newList = _this.data.articleLike.concat(article)



          _this.setData({

            articleLike: newList,
            fileUrlLike: res.data.data.fileUrl,

          })

          for(let i=0;i<_this.data.articleLike.length;i++){
            let thisLogo = _this.data.articleLike[i].articleCreateUserLogo;
            let index = "articleLike["+i+"].articleCreateUserLogo"
            if(thisLogo.indexOf('http')<0){
              _this.setData({
                [index]:_this.data.fileUrl + thisLogo
              })
            }

          }



        }
      }

    })


  },


})
//初始化查询用户详情
function init(userId,_this) {

  wx.request({
    url: app.globalData.host + 'userCollection/collectionDetail',
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

        if(res.data.data.userInfo.userLogo.indexOf("http")){
          res.data.data.userInfo.userLogo =  res.data.data.fileUrl + res.data.data.userInfo.userLogo;
        }

        _this.setData({
          fileUrl: res.data.data.fileUrl,
          userInfo: res.data.data.userInfo,
          articleList:res.data.data.articleList
        })

        for(let i=0;i<_this.data.articleList.length;i++){
          let thisLogo = _this.data.articleList[i].articleCreateUserLogo;
          let index = "articleList["+i+"].articleCreateUserLogo"
          if(thisLogo.indexOf('http')<0){
            _this.setData({
              [index]:_this.data.fileUrl + thisLogo
            })
          }

        }




      }
    }

  })



}
