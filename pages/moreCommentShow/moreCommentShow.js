// pages/moreCommentShow/moreCommentShow.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageIndex:0,
      pageLimit:10,
      commentThis:{},
      commentMore:[],
      releaseFocus: false,
      releaseFocus2: false,
      showMoreCommentTips:'查看更多评论',
      hasMoreComment:true,
      commentId:'',
      commentIdThis:'',
      aid:'',
      commentThisInputModelValue:'',
      areaTextTxt:'',
      hiddenmodalput:true,
      connectBottom:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options == ",options)
    let _this = this;
    _this.setData({
      commentIdThis:options.commentId,
      commentId : options.commentId,
      aid : options.articleId
    })
    console.log("init after data is",_this.data)
    console.log("moreCommentShow ",options.commentId)
    queryCommentById(options.commentId,_this);

    queryCommentMore(options.commentId,_this);

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
  bindReply: function (e) {
    this.setData({
      releaseFocus: true
    })
  },
  bindReply2: function (e) {
    this.setData({
      releaseFocus2: true
    })
  },
  //底部发送评论
  submitForm:function (e) {
    let _this = this;
    console.log("aid==",_this.data.aid)

    wx.request({
      url: app.globalData.host + 'articleComment/add',
      data:  {
        articleId:_this.data.aid,
        user_id:'c0fb320807454e4fbea024d31c9c5c75',
        content:e.detail.value.textarea,
        content_replace:'',
        comment_parent_id:_this.data.commentIdThis
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
      },
      success: function(res) {
        if(res.data.code ==0){
          //清空评论框
          _this.setData({
            connectBottom:''
          })

          //初始化页面数据
          _this.setData({
            showMoreCommentTips: '查看更多评论',
            hasMoreComment:true,
            pageIndex:0,
            pageLimit:10,
          })

          //重新渲染评论列表
          queryCommentMore(_this.data.commentIdThis,_this);

        }
      }

    })


  },
  //查看更多评论
  toggleDialogHandle:function () {
    let _this = this;

    //showMoreCommentTips

    if(!_this.data.hasMoreComment){
      return;
    }

    _this.setData({
      pageIndex :_this.data.pageIndex +1
    })


    wx.request({
      url: app.globalData.host + 'articleComment/listSecond',
      data:  {
        page:_this.data.pageIndex,
        size:_this.data.pageLimit,
        commentRootId:_this.data.commentIdThis
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
        console.log("result success comments ===",res.data.data.data);
        if(res.data.code ==0){

          if(res.data.data.data.length >0){
            let commentMore = res.data.data.data;

            let newList = _this.data.commentMore.concat(commentMore)
            _this.setData({
              commentMore: newList
            })

          }else {
            _this.setData({
              showMoreCommentTips: '没有更多数据了',
              hasMoreComment:false
            })

          }




        }
      }

    })

  },
  //评论弹出框取消按钮
  cancelMox: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //评论弹出框确认按钮
  confirmMox: function (e) {
    let _this = this;
    this.setData({
      hiddenmodalput: true
    })
    console.log("评论内容==",this.data.commentThisInputModelValue)
    console.log("评论内容22==",_this.data.commentThisInputModelValue)
    console.log("_this.data.commentId==",_this.data.commentId);

    wx.request({
      url: app.globalData.host + 'articleComment/add',
      data:  {
        articleId:_this.data.aid,
        user_id:'c0fb320807454e4fbea024d31c9c5c75',
        comment_parent_id:_this.data.commentId,
        content:_this.data.commentThisInputModelValue,
        content_replace:''
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
        console.log("result success comments ===",res.data.data.data);
        if(res.data.code ==0){
          //清空评论框
          _this.setData({
            areaTextTxt:''
          })

          //初始化页面数据
          _this.setData({
            showMoreCommentTips: '查看更多评论',
            hasMoreComment:true,
            pageIndex:0,
            pageLimit:10,
          })

          //重新渲染评论列表
          queryCommentMore(_this.data.commentIdThis,_this);
        }
      }

    })


  },
  //对评论的回复
  commentThis:function (e) {

    console.log("e==",e);
    console.log("e.target.dataset.id==",e.target.dataset.id)
    //显示回复弹出层
    this.setData({
      hiddenmodalput: false,
      commentId:e.target.dataset.id,
      areaTextTxt:''
    });


  },
  commentThisInput:function (e) {

    this.setData({
      commentThisInputModelValue:e.detail.value
    })

  },

})

//根据commentId查询评论信息楼主
function queryCommentById(commentId,_this) {


  wx.request({
    url: app.globalData.host + 'articleComment/getArticleCommentById',
    data:  {
      articleCommentId:commentId
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
    },
    success: function(res) {
      console.log("result success ===",res);
      if(res.data.code ==0){

        _this.setData({
          //fileUrl:res.data.result.fileUrl,
          commentThis:res.data.data.data
        })



      }
    }

  })
}

//根据commentId查询评论回复信息
function queryCommentMore(commentId,_this) {


  wx.request({
    url: app.globalData.host + 'articleComment/listSecond',
    data:  {
      page:_this.data.pageIndex,
      size:_this.data.pageLimit,
      commentRootId:commentId
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
    },
    success: function(res) {
      console.log("result queryCommentMore ===",res);
      if(res.data.code ==0){

        _this.setData({
          //fileUrl:res.data.result.fileUrl,
          commentMore:res.data.data.data
        })



      }
    }

  })
}

