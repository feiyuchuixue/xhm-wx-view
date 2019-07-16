// pages/myNoteDetail/myNoteDetail.js

const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

      introduce:[

      ],
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
    console.log("aid =====",this.data.aid)

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

              //跳转回前页
              //  wx.navigateBack({})
          },
          success: function(res) {
              console.log("result success ===",res);
              if(res.data.recode ==0){

                  let deatil = res.data.result.obj;
                  console.log("deatil is ",deatil);
                  let pictrueArr = deatil.articlePicture.split(";")
                  console.log("pictureArr is ...",pictrueArr)
                /*  currentData:1,
                      orangeHidden:true,
                      greenHidden:true,
                      redHidden:true,*/

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



  }
})
