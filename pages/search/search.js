// pages/search/search.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

     __tipKeys : [],
// 搜索回调函数
  __searchFunction : null,
// 返回函数
  __goBackFunction : null,
// 应用变量
   __that : null,
   searchResult:[],
  //搜索值
   searchValue:'',
   searchNot:'',
   timeoutID:null


},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let _this =this;
    wx.request({
      url: app.globalData.host + 'topics/hotList', //仅为示例，并非真实的接口地址
      data:  {
        page:1,
        limit:10
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
          let result = res.data.data;
          let searchTempArr = [];

          for (const resultElement of result) {
            let tempObj = {};
            tempObj.codeKey = resultElement.id;
            tempObj.codeName = resultElement.topicName;
            searchTempArr.push(tempObj)

          }

          _this.setData({
            searchResult:searchTempArr,
            searchValue:"  ",
            searchNot: "  "
          })
          console.log("searchResult 2 == ",_this.data.searchResult)

          //  resolve(res)

        }
      }


    })

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

  // 搜索框输入时候操作
  wxSearchInput: function (e) {
  let inputValue = e.detail.value;
  console.log("now search value is " + inputValue);
    let _this = this;

    if(this.data.timeoutID){
      clearTimeout(this.data.timeoutID);
      this.setData({
        timeoutID:null
      });
    }

   let nowTimeout = setTimeout(function () {

     wx.request({
       url: app.globalData.host + 'topics/list', //仅为示例，并非真实的接口地址
       data:  {
         topicName:inputValue
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
           let result = res.data.data;
           let searchTempArr = [];

           for (const resultElement of result) {
             let tempObj = {};
             tempObj.codeKey = resultElement.id;
             tempObj.codeName = resultElement.topicName;
             searchTempArr.push(tempObj)

           }

           _this.setData({
             searchResult:searchTempArr,
             searchValue:inputValue,
             searchNot: e.detail.value
           })
           console.log("searchResult 2 == ",_this.data.searchResult)

           //  resolve(res)

         }
       }


     })

   },500);
    this.setData({
      timeoutID:nowTimeout
    });


/*  // 页面数据
  var temData = __that.data.wxSearchData;
  // 寻找提示值
  var tipKeys = [];
  if (inputValue && inputValue.length > 0) {
    for (var i = 0; i < __tipKeys.length; i++) {
      var mindKey = __tipKeys[i];
      // 包含字符串
      if (mindKey.indexOf(inputValue) != -1) {
        tipKeys.push(mindKey);
      }
    }
  }
  // 更新数据
  temData.value = inputValue;
  temData.tipKeys = tipKeys;
  // 更新视图
  __that.setData({
    wxSearchData: temData
  });*/
},
  // 点击提示或者关键字、历史记录时的操作
  wxSearchKeyTap:function (event) {
    console.log("e ==",event)
    console.log("val 2 = ",event.target.dataset.key)
    let value =event.target.dataset.key;
    let id = event.target.dataset.id;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    // do your job here
    // 跳转
    prevPage.setData({
      topics:"#"+value+"#",
      topicsId:id
    })
    wx.navigateBack();
},
  // 创建话题
  wxSearchKeyTapCreate: function (event) {

    //console.log("e ==",event)
   // console.log("val 2 = ",event.target.dataset.key)
    let value =event.target.dataset.key;
    let id = event.target.dataset.id;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    // do your job here

    if (value){
      prevPage.setData({
        topics:"#"+value+"#",
        topicsId:id
      })
    }else{
      var aaa= this.data.searchNot;
      prevPage.setData({
        topics: "#"+aaa+"#",
        topicsId: 'noExist'
      })
    }
    // 跳转
    wx.navigateBack();
  },
  // 确任或者回车
  wxSearchConfirm:function (e) {
    var key = e.target.dataset.key;
    if (key == 'back') {
      wx.navigateBack();
    }
  }

})
