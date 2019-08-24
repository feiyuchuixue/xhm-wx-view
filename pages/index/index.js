// pages/index/index.js
//获取应用实例
const app = getApp()
let colOneHeight = 0;
let colTwoHeight = 0;
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
        loadingHidden:false,
        notFoundHidden:true,
        activitys1: [],
        activitys2: [],
        imagesCount: 0,
        arr:[100,110,140,160,180,170]
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

    onImageLoad: function (options) {
        this.data.imagesCount = this.data.article.length;
        //console.log("0000" + JSON.stringify(options))
        let currentId = options.currentTarget.id;
        let imageWidth = options.detail.width; // 图片宽度
        let imageHeight = options.detail.height; // 图片高度
        let tupianbili = imageWidth / imageHeight;

        var windowsWidth = wx.getSystemInfoSync().windowWidth;


        //当前图片的宽度
        let nowImg = windowsWidth * 0.5;




        let nowHeight = nowImg / tupianbili  ;
        console.log("nowHeight 计算出来的高 == " ,nowHeight)
    /*    if(imageWidth>imageHeight){
            let indexss =RandomNumBoth(0,3)
            nowHeight +=this.data.arr[indexss]
        }*/

        let indexss =RandomNumBoth(0,5)
        nowHeight +=this.data.arr[indexss]

        if(nowHeight>540){
            nowHeight = 540
        }
        let activitys = this.data.article; // 获取所有的数据资源
        let activityObj = null;

        for (let i = 0; i < activitys.length; i++) {
            // console.info(activitys[i].id)
            if (activitys[i].id === currentId) {
                activityObj = activitys[i];
                break;
            }
        }

        let imagesCount = this.data.imagesCount - 1;
        let activitys1 = this.data.activitys1;
        let activitys2 = this.data.activitys2;

        if (colOneHeight <= colTwoHeight) {
            colOneHeight += imageHeight;
            console.log("activityObj =============",activityObj)
            activityObj.height=nowHeight;
            console.log("activityObj change =============",activityObj)
            activitys1.push(activityObj)
            console.log("activitys1 ==",activitys1)
           // console.info("11111 " + JSON.stringify(activitys1))
        } else {
            colTwoHeight += imageHeight;
            activityObj.height=nowHeight;
            activitys2.push(activityObj);
            console.log("activitys2 ==",activitys2)
           // console.info("22222 " + JSON.stringify(activitys2))
        }

        let data = {
            imagesCount: imagesCount,
            activitys1: activitys1,
            activitys2: activitys2
        }

        if (!imagesCount) {
            data.activitys = [];
        }

        this.setData(data);
    },

    onImageLoad1: function (options) {
        this.data.imagesCount = this.data.article1.length;
        console.log("1111" + JSON.stringify(options))
        let currentId = options.currentTarget.id;
        let imageWidth = options.detail.width; // 图片宽度
        let imageHeight = options.detail.height; // 图片高度
        let tupianbili = imageWidth / imageHeight;

        let activitys = this.data.article1; // 获取所有的数据资源
        let activityObj = null;

        for (let i = 0; i < activitys.length; i++) {
            // console.info(activitys[i].id)
            if (activitys[i].id === currentId) {
                activityObj = activitys[i];
                break;
            }
        }


        var windowsWidth = wx.getSystemInfoSync().windowWidth;

        //当前图片的宽度
        let nowImg = windowsWidth * 0.5;

        let nowHeight = nowImg / tupianbili;
        console.log("nowHeight 计算出来的高 == " ,nowHeight)
        let indexss =RandomNumBoth(0,5)
        nowHeight +=this.data.arr[indexss]

        if(nowHeight>540){
            nowHeight = 540
        }

        let imagesCount = this.data.imagesCount - 1;
        let activitys1 = this.data.activitys1;
        let activitys2 = this.data.activitys2;

        if (colOneHeight <= colTwoHeight) {
            colOneHeight += imageHeight;
            activityObj.height=nowHeight;
            activitys1.push(activityObj)
           // console.info("11111 " + JSON.stringify(activitys1))
        } else {
            colTwoHeight += imageHeight;
            activityObj.height=nowHeight;
            activitys2.push(activityObj);
            //console.info("22222 " + JSON.stringify(activitys2))
        }

        let data = {
            imagesCount: imagesCount,
            activitys1: activitys1,
            activitys2: activitys2
        }

        if (!imagesCount) {
            data.activitys = [];
        }

        this.setData(data);
    },

    onImageLoad2: function (options) {
        this.data.imagesCount = this.data.article2.length;
        console.log("2222" + JSON.stringify(options))
        let currentId = options.currentTarget.id;
        let imageWidth = options.detail.width; // 图片宽度
        let imageHeight = options.detail.height; // 图片高度
        let tupianbili = imageWidth / imageHeight;

        let activitys = this.data.article2; // 获取所有的数据资源
        let activityObj = null;

        for (let i = 0; i < activitys.length; i++) {
            // console.info(activitys[i].id)
            if (activitys[i].id === currentId) {
                activityObj = activitys[i];
                break;
            }
        }


        var windowsWidth = wx.getSystemInfoSync().windowWidth;

        //当前图片的宽度
        let nowImg = windowsWidth * 0.5;

        let nowHeight = nowImg / tupianbili;
        console.log("nowHeight 计算出来的高 == " ,nowHeight)
        let indexss =RandomNumBoth(0,5)
        nowHeight +=this.data.arr[indexss]

        if(nowHeight>540){
            nowHeight = 540
        }

        let imagesCount = this.data.imagesCount - 1;
        let activitys1 = this.data.activitys1;
        let activitys2 = this.data.activitys2;

        if (colOneHeight <= colTwoHeight) {
            colOneHeight += imageHeight;
            activityObj.height=nowHeight;
            activitys1.push(activityObj)
          //  console.info("11111 " + JSON.stringify(activitys1))
        } else {
            colTwoHeight += imageHeight;
            activityObj.height=nowHeight;
            activitys2.push(activityObj);
            //console.info("22222 " + JSON.stringify(activitys2))
        }

        let data = {
            imagesCount: imagesCount,
            activitys1: activitys1,
            activitys2: activitys2
        }

        if (!imagesCount) {
            data.activitys = [];
        }

        this.setData(data);
    },

    onImageLoad3: function (options) {
        this.data.imagesCount = this.data.article3.length;
        console.log("2222" + JSON.stringify(options))
        let currentId = options.currentTarget.id;
        let imageWidth = options.detail.width; // 图片宽度
        let imageHeight = options.detail.height; // 图片高度
        let tupianbili = imageWidth / imageHeight;

        let activitys = this.data.article3; // 获取所有的数据资源
        let activityObj = null;

        for (let i = 0; i < activitys.length; i++) {
            // console.info(activitys[i].id)
            if (activitys[i].id === currentId) {
                activityObj = activitys[i];
                break;
            }
        }



        var windowsWidth = wx.getSystemInfoSync().windowWidth;

        //当前图片的宽度
        let nowImg = windowsWidth * 0.5;

        let nowHeight = nowImg / tupianbili;
        console.log("nowHeight 计算出来的高 == " ,nowHeight)
        let indexss =RandomNumBoth(0,5)
        nowHeight +=this.data.arr[indexss]

        if(nowHeight>540){
            nowHeight = 540
        }

        let imagesCount = this.data.imagesCount - 1;
        let activitys1 = this.data.activitys1;
        let activitys2 = this.data.activitys2;

        if (colOneHeight <= colTwoHeight) {
            colOneHeight += imageHeight;
            activityObj.height=nowHeight;
            activitys1.push(activityObj)
            console.info("11111 " + JSON.stringify(activitys1))
        } else {
            colTwoHeight += imageHeight;
            activityObj.height=nowHeight;
            activitys2.push(activityObj);
            console.info("22222 " + JSON.stringify(activitys2))
        }

        let data = {
            imagesCount: imagesCount,
            activitys1: activitys1,
            activitys2: activitys2
        }

        if (!imagesCount) {
            data.activitys = [];
        }

        this.setData(data);
    },
    onLoad: function (e) {
        var that = this;
        // app.queryOpenId();

        const pullScroll = that.selectComponent('#pullScrollView-id--index-0');
        //隐藏
        pullScroll.hideFooter();

        const pullScroll1 = that.selectComponent('#pullScrollView-id--index-1');
        //隐藏
        pullScroll1.hideFooter();

        const pullScroll2 = that.selectComponent('#pullScrollView-id--index-2');
        //隐藏
        pullScroll2.hideFooter();

        const pullScroll3 = that.selectComponent('#pullScrollView-id--index-3');
        //隐藏
        pullScroll3.hideFooter();


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

        init(_this,false,0)
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    /* bindChange: function (e) {
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
         pageIndex3:0,
         loadingHidden:false,
         notFoundHidden:true
       });




       init(that,e)
     },*/
    tabClick: function (e) {
        console.log("单击切换 e=",e)
        console.log("activeIndex = "+this.data.activeIndex)
        var that = this;

        const pullScroll = that.selectComponent('#pullScrollView-id--index-0');
        //隐藏
        pullScroll.hideFooter();

        const pullScroll1 = that.selectComponent('#pullScrollView-id--index-1');
        //隐藏
        pullScroll1.hideFooter();

        const pullScroll2 = that.selectComponent('#pullScrollView-id--index-2');
        //隐藏
        pullScroll2.hideFooter();

        const pullScroll3 = that.selectComponent('#pullScrollView-id--index-3');
        //隐藏
        pullScroll3.hideFooter();


        var cIndex = e.currentTarget.id;
        if(this.data.activeIndex == cIndex){
            return
        }
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
            loadingHidden:false,
            notFoundHidden:true,
            activitys1: [],
            activitys2: [],
            imagesCount: 0
        });

        colOneHeight = 0;
        colTwoHeight = 0;




        init(that,false,0)
    },
    //搜索框
    handleMainSearchInput(event){
        console.log("init  handleTopicsInput...")
        wx.navigateTo({
            url: '/pages/mainSearch/mainSearch',
        })
    },
    //显示文章详情
    showArticleDetail: function (e) {
        console.log("显示文章详情===",e);

        wx.navigateTo({
            url: '/pages/myNoteDetail/myNoteDetail?aid=' + e.currentTarget.dataset.id+"&from=other",
        })
    },

    //刷新
    onPullRefresh:function(){
        console.log("新的刷新組件")
        let _this = this;
        //推荐页面
        if(_this.data.activeIndex == 0){
            setTimeout(() => {
                init(_this,false,0);
            }, 500)

            //宝妈团
        }else if(_this.data.activeIndex  == 1){
            setTimeout(() => {
                init(_this,false,0);
            }, 500)
            //出游
        }else if(_this.data.activeIndex  == 2){
            setTimeout(() => {
                init(_this,false,0);
            }, 500)
            //专栏
        }else if(_this.data.activeIndex  == 3){
            setTimeout(() => {
                init(_this,false,0);
            }, 500)
        }
    },
    onLoadMore:function(e) {
        let _this = this;
        console.log("新的加載更多組件")


        //推荐页面
        if(_this.data.activeIndex == 0){
            let start = _this.data.pageIndex + 1;
            setTimeout(() => {
                console.log("推荐页面加载更多1111111111 = "+start)
                init(_this,true,start);
            }, 500)

            //宝妈团
        }else if(_this.data.activeIndex  == 1){
            let start = _this.data.pageIndex1 + 1;
            setTimeout(() => {
                init(_this,true,start);
            }, 500)
            //出游
        }else if(_this.data.activeIndex  == 2){
            let start = _this.data.pageIndex2 + 1;
            setTimeout(() => {
                init(_this,true,start);
            }, 500)
            //专栏
        }else if(_this.data.activeIndex  == 3){
            let start = _this.data.pageIndex3 + 1;
            setTimeout(() => {
                init(_this,true,start);
            }, 500)
        }

    },




})

//初始化加载信息查询
function init(_this,isLoadMore,startPageIndex){

    let pageIndex = 0;
    if(isLoadMore){
        pageIndex = startPageIndex;
    }
    console.log("startPageIndex ===" +startPageIndex)

    wx.request({
        url: app.globalData.host + 'articleCon/mainList',
        data: {
            type:_this.data.tabs[_this.data.activeIndex],
            page: startPageIndex,
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
        },
        success: function (res) {
            console.log("result success ===", res);
            if (res.data.code == 0) {

                let listArr = res.data.data.data;
                let article =  res.data.data.data;
                let newList = [];

                if(!isLoadMore){
                    newList =article;
                }else {
                    if (_this.data.activeIndex == 0) {
                        newList = _this.data.article.concat(article)
                    }
                    if (_this.data.activeIndex == 1) {
                        newList = _this.data.article1.concat(article)
                    }
                    if (_this.data.activeIndex == 2) {
                        newList = _this.data.article2.concat(article)
                        console.log("newList == " ,newList)
                    }
                    if (_this.data.activeIndex == 3) {
                        newList = _this.data.article3.concat(article)
                    }
                }


                if(_this.data.activeIndex == 0){

                    _this.setData({
                        article:  newList,
                        fileUrl: res.data.data.fileUrl
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

                    const pullScroll = _this.selectComponent('#pullScrollView-id--index-0');
                    //停止刷新
                    pullScroll.stopRefresh();
                    //没有更多数据了
                    if(listArr.length < _this.data.pageLimit){
                        pullScroll.noMore();
                    }else{
                        if(isLoadMore){
                            _this.setData({
                                pageIndex: _this.data.pageIndex +1,
                            })
                        }

                        //重置
                        pullScroll.resetFooter();
                    }


                }

                if(_this.data.activeIndex == 1){
                    _this.setData({
                        article1: newList,
                        fileUrl: res.data.data.fileUrl
                    })

                    for(let i=0;i<_this.data.article1.length;i++){
                        let thisLogo = _this.data.article1[i].articleCreateUserLogo;
                        let index = "article1["+i+"].articleCreateUserLogo"
                        if(thisLogo.indexOf('http')<0){
                            _this.setData({
                                [index]:_this.data.fileUrl + thisLogo
                            })
                        }

                    }

                    const pullScroll = _this.selectComponent('#pullScrollView-id--index-1');
                    //停止刷新
                    pullScroll.stopRefresh();
                    //没有更多数据了
                    if(listArr.length < _this.data.pageLimit){
                        pullScroll.noMore();
                    }else{
                        if(isLoadMore){
                            _this.setData({
                                pageIndex1: _this.data.pageIndex1 +1,
                            })
                        }


                        //重置
                        pullScroll.resetFooter();
                    }


                }


                if(_this.data.activeIndex == 2){
                    _this.setData({
                        article2: newList,
                        fileUrl: res.data.data.fileUrl
                    })
                    for(let i=0;i<_this.data.article2.length;i++){
                        let thisLogo = _this.data.article2[i].articleCreateUserLogo;
                        let index = "article2["+i+"].articleCreateUserLogo"
                        if(thisLogo.indexOf('http')<0){
                            _this.setData({
                                [index]:_this.data.fileUrl + thisLogo
                            })
                        }

                    }

                    const pullScroll = _this.selectComponent('#pullScrollView-id--index-2');
                    //停止刷新
                    pullScroll.stopRefresh();
                    //没有更多数据了
                    if(listArr.length < _this.data.pageLimit){
                        pullScroll.noMore();
                    }else{
                        if(isLoadMore){
                            _this.setData({
                                pageIndex2: _this.data.pageIndex2 +1,
                            })
                        }

                        //重置
                        pullScroll.resetFooter();
                    }

                }

                if(_this.data.activeIndex == 3){
                    _this.setData({
                        article3: newList,
                        fileUrl: res.data.data.fileUrl
                    })
                    for(let i=0;i<_this.data.article3.length;i++){
                        let thisLogo = _this.data.article3[i].articleCreateUserLogo;
                        let index = "article3["+i+"].articleCreateUserLogo"
                        if(thisLogo.indexOf('http')<0){
                            _this.setData({
                                [index]:_this.data.fileUrl + thisLogo
                            })
                        }

                    }

                    const pullScroll = _this.selectComponent('#pullScrollView-id--index-3');
                    //停止刷新
                    pullScroll.stopRefresh();
                    //没有更多数据了
                    if(listArr.length < _this.data.pageLimit){
                        pullScroll.noMore();
                    }else{
                        if(isLoadMore){
                            _this.setData({
                                pageIndex3: _this.data.pageIndex3 +1,
                            })
                        }

                        //重置
                        pullScroll.resetFooter();
                    }

                }

                if(listArr.length>0){
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


            }
        }

    })

}

function RandomNumBoth(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}
