// pages/mine/mine.js
const app =getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        pageIndex: 1,
        pageLimit: 10,
        pageLikeIndex: 0,
        pageLikeLimit: 10,
        currentData: 0,
        loading: false,
        allloaded: false,
        article: [],
        fileUrl: '',
        userInfo:{},
        articleLike: [],
        fileUrlLike: '',
        userInfoLike:{},
        loadingHidden:false,
        notFoundHidden:true,
        firstLoading:false,
        showRealHtml:true

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("我的info",  app.globalData.userInfo );
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


        _this.setData({
            pageIndex: 1,
            currentData: 0,
            article: [],
            articleLike: [],
            fileUrl: '',
            userInfo:{},
            pageIndex: 1,
            pageLikeIndex: 1,
            loadingHidden:false,
            notFoundHidden:true,
            userInfo:{},

        })

        this.init()
        //  this.init()

    },
    onShow: function () {

    },

    //点击切换，滑块index赋值
    checkCurrent: function (e) {
        const that = this;


        if (that.data.currentData === e.target.dataset.current) {
            return false;
        } else {

            const pullScroll2 = that.selectComponent('#pullScrollView-id-2');
            //隐藏
            pullScroll2.hideFooter();

            const pullScroll = that.selectComponent('#pullScrollView-id');
            //隐藏
            pullScroll.hideFooter();

            that.setData({
                loading: false,
                allloaded: false,
                article: [],
                articleLike: [],
                pageIndex: 1,
                pageLikeIndex: 1,
                loadingHidden:false,
                notFoundHidden:true
            })

            if(e.target.dataset.current == 1){
                that.initLike()
            }else{
                that.init()
            }

            that.setData({
                currentData: e.target.dataset.current
            })
        }
    },
    //跳转到上传页面
    createArticle: function (e) {
        wx.navigateTo({
            url: '/pages/upload-image/index',
        })


    },
//跳转到上传页面
    createArticle2: function (e) {
        wx.navigateTo({
            url: '/pages/upload-image/index',
        })


    },
    init: function () {

        let _this = this;

        wx.request({
            url: app.globalData.host + 'articleCon/selByUserId',
            data: {
                uid: app.globalData.userInfo.id,
               // uid:'6cd033dfe2a04aa7bb420543a598c34b',
                start: 1,
                limit: _this.data.pageLimit
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
                //跳转回前页
                //  wx.navigateBack({})
            },
            success: function (res) {
                console.log("result success ===", res);
                if (res.data.recode == 0) {

                    let article = res.data.result.data.list;



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
                    _this.setData({
                        article: article,
                        fileUrl: res.data.result.fileUrl,
                        userInfo:res.data.result.user,
                        firstLoading:true,
                        showRealHtml:false
                    })

                    for(let i=0;i<_this.data.article.length;i++){
                        let thisLogo = _this.data.article[i].articleCreateUserLogo;
                        let index = "article["+i+"].articleCreateUserLogo"
                        console.log("thisLogo=============",thisLogo)
                        if(thisLogo.indexOf('http')<0){
                            _this.setData({
                                [index]:_this.data.fileUrl + thisLogo
                            })
                        }

                    }


                    const pullScroll = _this.selectComponent('#pullScrollView-id');
                    //停止刷新
                    pullScroll.stopRefresh();
                    //没有更多数据了
                    if(article.length < _this.data.pageLimit){
                        pullScroll.noMore();
                    }else{
                        //重置
                        pullScroll.resetFooter();
                    }



                }
            }

        })


    },
    //收藏初始化
    initLike: function () {

        let _this = this;

        wx.request({
            url: app.globalData.host + 'articleLike/likeList',
            data: {
                userId: app.globalData.userInfo.id,
                page:0,
                pageLimit:1
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

                    _this.setData({
                        articleLike: article,
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



                    const pullScroll = _this.selectComponent('#pullScrollView-id-2');

                    //停止刷新
                    pullScroll.stopRefresh();
                    //没有更多数据了
                    if(article.length < _this.data.pageLikeLimit){
                        pullScroll.noMore();
                    }else{
                        //重置
                        pullScroll.resetFooter();
                    }

                }
            }
        })

    },
    //刷新
    onPullRefresh:function(){
        console.log("新的刷新組件")
        let _this = this;
        //笔记页面
        if(_this.data.currentData == 0){
            setTimeout(() => {
                this.init()
            }, 500)

        //收藏页面
        }else if(_this.data.currentData == 1){


            setTimeout(() => {
                this.initLike()
            }, 500)
        }







    },
    //加載更多
    onLoadMore:function(e) {
        let _this = this;
        console.log("新的加載更多組件")
        //要查询的页数
        let start = _this.data.pageIndex + 1;

        let startLike = _this.data.pageLikeIndex +1;
        //笔记页面

        if(_this.data.currentData == 0){

            setTimeout(() => {
                _this.loadMoreBiji(start)
            }, 500)


            //收藏页面
        }else if(_this.data.currentData == 1) {
            _this.loadMoreShouCang(startLike)

        }



    },
    //笔记加载更多
    loadMoreBiji:function(start){
        let _this = this;
        wx.request({
            url: app.globalData.host + 'articleCon/selByUserId',
            data: {
                uid:app.globalData.userInfo.id,
                start: start,
                limit: 10
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
                if (res.data.recode == 0) {
                    let article = res.data.result.data.list;

                    let  newList = _this.data.article.concat(article)



                        _this.setData({
                            article: newList,
                            fileUrl: res.data.result.fileUrl,
                            loading: false,
                            isTopRefreshShow:true,
                            pageIndex: start,
                        })



                    for(let i=0;i<_this.data.article.length;i++){
                        let thisLogo = _this.data.article[i].articleCreateUserLogo;
                        let index = "article["+i+"].articleCreateUserLogo"
                        if(thisLogo.indexOf('http')<0){
                            _this.setData({
                                [index]:_this.data.fileUrl + thisLogo
                            })
                        }

                    }


                    //停止刷新
                    const pullScroll = _this.selectComponent('#pullScrollView-id');

                    if(article.length < _this.data.pageLimit){
                        //没有更多数据了
                        pullScroll.noMore();
                    }else{
                        //重置点击加载更多
                        pullScroll.resetFooter();
                    }



                }
            }

        })


    },
    //收藏加载更多
    loadMoreShouCang:function(start){
        let _this =this;
        wx.request({
            url: app.globalData.host + 'articleLike/likeList',
            data: {
                userId:app.globalData.userInfo.id,
                page: start,
                pageLimit: _this.data.pageLikeLimit
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

                    let article = res.data.data.data;
                    let newList = _this.data.articleLike.concat(article)


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





                    _this.setData({
                        articleLike: newList,
                        fileUrlLike: res.data.data.fileUrl,
                        pageLikeIndex: _this.data.pageLikeIndex +1,
                        loading: false,
                        isTopRefreshShow:true,

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

                    //停止刷新
                    const pullScroll = _this.selectComponent('#pullScrollView-id-2');

                    if(article.length < _this.data.pageLikeLimit){
                        //没有更多数据了
                        pullScroll.noMore();
                    }else{
                        //重置点击加载更多
                        pullScroll.resetFooter();
                    }



                }
            }

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
            //要延时执行的代码
            _this.getList('refresh').then(res => {
                detail.success();
            });



    },
    getList(index) {
        let _this =this;
        return new Promise((resolve, reject) => {
            if (this.data.loading /*|| this.data.allloaded*/) {
                resolve();
                return;
            }
            this.setData({
                loading: true
            })

            let start = 1;
            let limit = 10;
            if(!index || index != 'refresh'){
                start= _this.data.pageIndex +1,
                limit=_this.data.pageLimit
            }else{
                _this.setData({
                    loading: false,
                    allloaded: false,

                })
            }

            let startLike =0;
            let startLimit =10;

            if(!index || index != 'refresh'){
                    startLike=  _this.data.pageLikeIndex +1,
                    startLimit= _this.data.pageLikeLimit
            }else{
                _this.setData({
                    loading: false,
                    allloaded: false,

                })
            }


            //笔记页面
            if(_this.data.currentData == 0){

                wx.request({
                    url: app.globalData.host + 'articleCon/selByUserId',
                    data: {
                        uid:app.globalData.userInfo.id,
                        start: start,
                        limit: limit
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
                        //跳转回前页
                        //  wx.navigateBack({})
                        _this.setData({
                            refreshing: false
                        })

                    },
                    success: function (res) {
                        console.log("result success ===", res);
                        if (res.data.recode == 0) {
                            console.log("index ==",index)
                            let article = res.data.result.data.list;
                            let newList = [];

                            if(index && index == 'refresh'){

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
                                _this.setData({
                                    loading: false,
                                    isTopRefreshShow:true,
                                })

                            }else{
                                if (article.length<=0) {
                                    console.log("没有数据来")
                                    _this.setData({
                                        allloaded: true
                                    })
                                }else{
                                    console.log("article ===",article)

                                    newList = _this.data.article.concat(article)
                                    console.log("newList ===",newList)
                                    _this.setData({
                                        article: newList,
                                        fileUrl: res.data.result.fileUrl,
                                        loading: false,
                                        isTopRefreshShow:true,
                                        pageIndex: _this.data.pageIndex +1,
                                    })
                                }

                            }


                            for(let i=0;i<_this.data.article.length;i++){
                                let thisLogo = _this.data.article[i].articleCreateUserLogo;
                                let index = "article["+i+"].articleCreateUserLogo"
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
                        userId:app.globalData.userInfo.id,
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


                                _this.setData({
                                    loading: false,
                                    isTopRefreshShow:true
                                })
                            }else{
                                newList = _this.data.articleLike.concat(article)

                            }
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


                   /*         if (article.length<=0) {
                                console.log("没有数据来")
                                _this.setData({
                                    allloaded: true,
                                    loading: false,
                                })
                            }*/

                            _this.setData({
                                articleLike: newList,
                                fileUrlLike: res.data.data.fileUrl,
                                pageLikeIndex: _this.data.pageLikeIndex +1,
                                loading: false,
                                isTopRefreshShow:true,

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
            url: '/pages/myNoteDetail/myNoteDetail?aid=' + e.currentTarget.dataset.id+"&from=mine",
        })
    },
    //查看关注我的人
    showCollection:function (e) {
        wx.navigateTo({
            url: '/pages/myCollection/myCollection?userId=' + e.currentTarget.dataset.id,
        })
    },
    //查看我的粉丝
    showFans:function (e) {
        console.log("关注人 e====", e)
        console.log("id ==" +e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '/pages/myFans/myFans?userId=' + e.currentTarget.dataset.id,
        })
    },
    showGroup:function(e){

        wx.navigateTo({
            url: '/pages/myGroup/myGroup?userId=' + e.currentTarget.dataset.id,
        })
    },

    //编辑资料
    editUserMsg:function (e) {
        console.log("编辑用户资料");
        wx.navigateTo({
            url: '/pages/userInfoEdit/userInfoEdit',
        })
    }




})



