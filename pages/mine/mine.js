// pages/mine/mine.js
const app =getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        pageIndex: 1,
        pageLimit: 10,
        currentData: 0,


        loading: false,
        allloaded: false,
        isRefreshs:false,
        isTopRefreshShow:true,

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
        fileUrl: ''
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
    onShow: function () {
        var _this = this;

        _this.setData({
            pageIndex: 1,
            currentData: 0,
            article: [],
            fileUrl: ''

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
    init: function (that) {

        let _this = this;

        wx.request({
            url: app.globalData.host + 'articleCon/selByUserId',
            data: {
                uid: 'c0fb320807454e4fbea024d31c9c5c75',
                start: _this.data.pageIndex,
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

                    let newList = _this.data.article.concat(article)
                    _this.setData({
                        article: newList,
                        fileUrl: res.data.result.fileUrl,
                        pageIndex: _this.data.pageIndex + 1,
                        isRefreshHidde:true
                    })

                    setTimeout(() => {
                        _this.setData({
                            isRefreshHidde: true
                        })
                    }, 2000)

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


        _this.setData({
            list: [],
            loading: false,
            allloaded: false,
            start:0,
            limit:10,

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

            let start = 1;
            let limit = 10;
            if(!index || index != 'refresh'){
                start= _this.data.pageIndex,
                limit=_this.data.pageLimit
            }


            wx.request({
                url: app.globalData.host + 'articleCon/selByUserId',
                data: {
                    uid: 'c0fb320807454e4fbea024d31c9c5c75',
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
                        let article = res.data.result.data.list;
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
                            fileUrl: res.data.result.fileUrl,
                            pageIndex: _this.data.pageIndex +1,
                            loading: false,
                            isTopRefreshShow:true
                        })

                        resolve();


                    }
                }

            })


        })
    },
    //显示文章详情
    showArticleDetail: function (e) {
        console.log("e====", e)
        wx.navigateTo({
            url: '/pages/myNoteDetail/myNoteDetail?aid=' + e.target.dataset.id,
        })
    },




})



