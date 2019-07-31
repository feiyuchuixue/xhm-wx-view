// pages/myNoteDetail/myNoteDetail.js

const app =getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgheights: [],
        imgwidths: [],
        current: 0,
        imgwidth:750,
        maxHeight:0,
        isCollection:false,
        pageIndex:0,
        pageLimit:10,
        hasMoreComment:true,
        releaseFocus: false,
        releaseFocus2: false,
        showMoreCommentTips:'查看更多评论',
        hiddenmodalput:true,
        commentThisInputModelValue:'',
        commentId:'',
        aid:'',
        fileUrl:'',
        currentData:0,
        orangeHidden:true,
        greenHidden:true,
        redHidden:true,
        imgUrls: [],
        articleUserInfo:{},
        articleTitle:'',
        articleContent:'',
        articleTopics:'',
        articleTopicsId:'',
        articleCreateTime:'',
        areaTextTxt:'',
        commentCount:1,
        isMP4:false,
        comments:[],
        introduce:[],
        isLike:true,
        globalUserId:'',
        loadingHidden:false,
        showRealHtml:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var windowsWidth = wx.getSystemInfoSync().windowWidth;
        var windowsHeight = wx.getSystemInfoSync().windowHeight;
        console.log("屏幕宽度 windowsWidth == ",windowsWidth)
        console.log("屏幕高度 windowsWidth == ",windowsHeight)

        let maxHeight =  windowsHeight * 0.5*2;

        //初始化加载数据
        this.setData({
            aid:options.aid,
            showMoreCommentTips: '查看更多评论',
            hasMoreComment:true,
            pageIndex:0,
            pageLimit:10,
            maxHeight:maxHeight
        })
        this.init(options.aid)


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
                aid:aid,
                userId:app.globalData.userInfo.id
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

                    let boolFlag = false;
                    if(pictrueArr[0].lastIndexOf("mp4")>=0){
                        boolFlag = true;
                    }


                    _this.setData({
                        imgUrls: pictrueArr,
                        fileUrl:res.data.result.fileUrl,
                        articleTitle:deatil.articleTitle,
                        articleContent:deatil.articleContent,
                        articleTopics:deatil.articleTopics,
                        articleTopicsId:deatil.articleTopicsId,
                        articleCreateTime:deatil.articleCreateTime,
                        commentCount:deatil.articleTotalComment,
                        isMP4 :boolFlag,
                        articleUserInfo:res.data.result.user,
                        isCollection:res.data.result.isCollection,
                        isLike:res.data.result.isLike,
                        globalUserId:app.globalData.userInfo.id
                    })

                    console.log("load detail is ...",_this.data.articleUserInfo)

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


                    let thisLogo = _this.data.articleUserInfo.userLogo;
                    console.log("thisLogo ===",thisLogo)
                    let index = "articleUserInfo.userLogo"
                    if(thisLogo.indexOf('http')<0){
                        _this.setData({
                            [index]:_this.data.fileUrl + thisLogo
                        })
                    }



                    _this.initComment()

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
                        comments:res.data.data.data,
                        loadingHidden:true,
                        showRealHtml:false
                    })


                    for(let i=0;i<_this.data.comments.length;i++){
                        let thisLogo = _this.data.comments[i].userLogo;
                        let index = "comments["+i+"].userLogo"
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
                userId:app.globalData.userInfo.id,
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

                    syncArticleCommentCount(_this.data.aid,_this)

                }
            }

        })


    },
    //查看更多评论
    toggleDialogHandle:function () {
        let _this = this;
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


                    for(let i=0;i<_this.data.comments.length;i++){
                        let thisLogo = _this.data.comments[i].userLogo;
                        let index = "comments["+i+"].userLogo"
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

        wx.request({
            url: app.globalData.host + 'articleComment/add',
            data:  {
                articleId:_this.data.aid,
                user_id:app.globalData.userInfo.id,
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

                        wx.navigateTo({
                            url: '/pages/moreCommentShow/moreCommentShow?commentId='+ _this.data.commentId+"&articleId="+_this.data.aid,
                        })
                }
            }

        })


    },
    //对评论的回复
    commentThis:function (e) {

        console.log("e==",e);
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
    //显示更多评论回复
    showMoreComment:function (e) {
        console.log("commentId ===",e.target.dataset.id);
        wx.navigateTo({
            url: '/pages/moreCommentShow/moreCommentShow?commentId='+e.target.dataset.id+"&articleId="+this.data.aid,
        })
    },
    imageLoad: function (e) {
        let maxHeight = 1000;//rpx
        console.log("imageLoad...")
        //获取图片真实宽度
        var imgwidth = e.detail.width,
            imgheight = e.detail.height,
            //宽高比
            ratio = imgwidth / imgheight;
        //计算的高度值
        var viewHeight = 750 / ratio;
        var imgheight = viewHeight
        var imgheights = this.data.imgheights;
        var imgwidths = this.data.imgwidths;
        //把每一张图片的高度记录到数组里
        var windowsWidth = wx.getSystemInfoSync().windowWidth;
        var windowsHeight = wx.getSystemInfoSync().windowHeight;
        console.log("屏幕宽度 windowsWidth == ",windowsWidth)
        console.log("屏幕高度 windowsWidth == ",windowsHeight)

        maxHeight =  windowsHeight * 0.5*2;
        console.log("笔记计算的屏幕高度 尺寸==" + maxHeight)
        //如果高度大于比例计算出来的最大高度则，宽度成比例缩小

        console.log("111 =" +imgheight)
        console.log("222 max=" +maxHeight)
        if(imgheight > maxHeight){
            console.log("超出最大高度")
            imgheight = maxHeight;
            windowsWidth = maxHeight * ratio
            console.log("计算后的宽度= "+windowsWidth)
        }else{
            windowsWidth = windowsWidth *2
        }


        imgheights[e.target.dataset['index']] = imgheight;// 改了这里 赋值给当前 index
        imgwidths[e.target.dataset['index']] = windowsWidth;
        console.log("imgheights===",imgheights)
        console.log("imgwidths===",imgheights)
        this.setData({
            imgheights: imgheights,
            imgwidths:imgwidths
        })
    },
    bindchange: function (e) {
        this.setData({
            current: e.detail.current
        })
    },
    previewImage: function (e) {
        var imgUrlTemp = this.data.imgUrls;
        var imgUrlArr = this.data.imgUrls;

        for(let i=0;i<this.data.imgUrls.length;i++){
            if( imgUrlTemp[i].indexOf('http')<0){
                imgUrlTemp[i] = this.data.fileUrl + imgUrlArr[i];
            }


        }
        console.log("imgUrlTemp==",imgUrlTemp)
        console.log("old imgUrls ==" ,this.data.imgUrls)
        var current=e.target.dataset.src;
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: imgUrlTemp // 需要预览的图片http链接列表
        })
    },
    //关注
    guanzhuClick:function (e) {

        let _this =this;
        if(_this.data.isCollection){
            return;
        }
        console.log("关注e===",e);
        //临时userId
        let userId =app.globalData.userInfo.id;
        let guanzhuUserId = e.currentTarget.dataset.id;

        wx.request({
            url: app.globalData.host + 'userCollection/addCollection',
            data:  {
                userId:userId,
                attentionUserId:guanzhuUserId
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
                if(res.data.code ==0){
                    _this.setData({
                        isCollection:true
                    })

                    wx.showToast({
                        title: '关注成功',
                        icon: 'succes',
                        duration: 1000,
                        mask:true
                    })
                }
            }

        })


    },
    //关注用户详情展示
    articleUserShow:function (e) {
        console.log("关注用户 e====", e)
        console.log("id ==" + e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '/pages/userIndexDetail/userIndexDetail?userId=' + e.currentTarget.dataset.id,
        })
    },
    //收藏、取消收藏用户
    likeChange:function (e) {
        let _this = this;
        let userId =app.globalData.userInfo.id;
        console.log(e)
        console.log("关注否"+ _this.data.isLike);

        if(_this.data.isLike){

            wx.showModal({
                title: '提示',
                content: '确定要取消收藏吗？',
                success: function (sm) {
                    if (sm.confirm) {
                        // 用户点击了确定
                        wx.request({
                            url: app.globalData.host + 'articleLike/like',
                            data:  {
                                userId:userId,
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
                            },
                            success: function(res) {
                                if(res.data.code ==0){
                                    _this.setData({
                                        isLike:!_this.data.isLike
                                    })

                                    wx.showToast({
                                        title: '取消收藏',
                                        icon: 'succes',
                                        duration: 1000,
                                        mask:true
                                    })
                                }
                            }

                        })

                    } else if (sm.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })


        }else {
            wx.request({
                url: app.globalData.host + 'articleLike/like',
                data:  {
                    userId:userId,
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
                },
                success: function(res) {
                    if(res.data.code ==0){
                        _this.setData({
                            isLike:!_this.data.isLike
                        })

                        wx.showToast({
                            title: '收藏成功',
                            icon: 'succes',
                            duration: 1000,
                            mask:true
                        })
                    }
                }

            })
        }







    }





})

//同步文章评论数量
function syncArticleCommentCount(articleId,_this){

    wx.request({
        url: app.globalData.host + 'articleComment/queryArticleCommentCount',
        data:  {
            articleId:articleId
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
                    commentCount:res.data.data
                })

            }
        }

    })

}
