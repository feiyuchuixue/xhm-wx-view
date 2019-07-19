// pages/myNoteDetail/myNoteDetail.js

const app =getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageIndex:0,
        pageLimit:10,
        hasMoreComment:true,
        releaseFocus: false,
        releaseFocus2: false,
        showMoreCommentTips:'查看更多评论',
        hiddenmodalput:true,
        aid:'',
        fileUrl:'',
        currentData:1,
        orangeHidden:true,
        greenHidden:true,
        redHidden:true,
        imgUrls: [],
        articleTitle:'',
        articleContent:'',
        articleTopics:'',
        articleTopicsId:'',
        articleCreateTime:'',
        commentCount:1,
        comments:[],
        introduce:[],
        video:'http://kxdev.houaihome.com/test_img/ee.jpg',
        iconCart:[
            {
                src:'/image/ico_1.png'
            },
            {
                src: '/image/ico_2.png'
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //初始化加载数据
        this.setData({
            aid:options.aid,
            showMoreCommentTips: '查看更多评论',
            hasMoreComment:true,
            pageIndex:0,
            pageLimit:10,
        })
        this.init(options.aid)
        this.initComment()

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
    //加载详情数据
    init:function (aid) {
        let _this = this;

        wx.request({
            url: app.globalData.host + 'articleCon/selById',
            data:  {
                aid:aid
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
                if(res.data.recode ==0){

                    let deatil = res.data.result.obj;
                    let pictrueArr = deatil.articlePicture.split(";")

                    _this.setData({
                        imgUrls: pictrueArr,
                        fileUrl:res.data.result.fileUrl,
                        articleTitle:deatil.articleTitle,
                        articleContent:deatil.articleContent,
                        articleTopics:deatil.articleTopics,
                        articleTopicsId:deatil.articleTopicsId,
                        articleCreateTime:deatil.articleCreateTime
                    })

                    if(deatil.articleCheckYn == 0){
                        _this.setData({
                            orangeHidden:false,
                            greenHidden:true,
                            redHidden:true,
                        })
                    }
                    if(deatil.articleCheckYn == 1){

                        _this.setData({
                            orangeHidden:true,
                            greenHidden:false,
                            redHidden:true,
                        })
                    }
                    if(deatil.articleCheckYn == 2){
                        _this.setData({
                            orangeHidden:true,
                            greenHidden:true,
                            redHidden:false,
                        })

                    }


                }
            }

        })
    },
    //加载评论详情数据
    initComment:function () {

        let _this = this;

        wx.request({
            url: app.globalData.host + 'articleComment/listFirst',
            data:  {
                page:0,
                size:10,
                articleId:_this.data.aid
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


                    _this.setData({
                        comments:res.data.data.data
                    })


                }
            }

        })


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

        wx.request({
            url: app.globalData.host + 'articleComment/addFirstLevelComment',
            data:  {
                articleId:_this.data.aid,
                userId:'c0fb320807454e4fbea024d31c9c5c75',
                content:e.detail.value.textarea,
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
                    _this.initComment();

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
            url: app.globalData.host + 'articleComment/listFirst',
            data:  {
                page:_this.data.pageIndex,
                size:_this.data.pageLimit,
                articleId:_this.data.aid
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
                        let comments = res.data.data.data;

                        let newList = _this.data.comments.concat(comments)
                        _this.setData({
                            comments: newList
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
        this.setData({
            hiddenmodalput: true
        })
        console.log("e==",e)
        console.log("e.detail",e.detail)
        console.log(e.detail.value.textareaThis)
    },
    //对评论的回复
    commentThis:function (e) {

        console.log("e==",e);
        //显示回复弹出层
        this.setData({
            hiddenmodalput: false
        });




    }

})
