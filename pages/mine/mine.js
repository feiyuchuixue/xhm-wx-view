// pages/mine/mine.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
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
      article: [
          {
              img: '/image/aaa.jpg',
              txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
              name: '崔迪houai1314',
              pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
              count:'12554'
          },
          {
              img: '/image/bbb.jpg',
              txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题sadfsdf',
              name: '崔迪houai1314',
              pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
              count: '12554'
          },
          {
              img: '/image/s1.jpg',
              txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
              name: '崔迪houai1314',
              pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
              count: '12554'
          },
          {
              img: '/image/aaa.jpg',
              txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题sadf',
              name: '崔迪houai1314',
              pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
              count: '12554'
          },
          {
              img: '/image/bbb.jpg',
              txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题sdfsdf',
              name: '崔迪houai1314',
              pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
              count: '12554'
          },
          {
              img: '/image/s1.jpg',
              txt: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
              name: '崔迪houai1314',
              pic: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIcu1NNTaxsBvV06I5orBShKEViaLia4Gd5FXNRGv1KWUgnSYDl1HaPjhQDl7QIM2O7IIraM4PXngg/132',
              count: '12554'
          }
      ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {




  },
  onShow:function(){
        console.log("初始化加载。。。")
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
  createArticle:function (e) {
    wx.navigateTo({
      url: '/pages/upload-image/index',
    })


  },
//跳转到上传页面
createArticle2:function (e) {
  wx.navigateTo({
    url: '/pages/upload-image/index',
  })


},
 init:function () {
     let _this = this;
     wx.request({
         url: app.globalData.host + 'articleCon/selByUserId',
         data:  {
             uid:'c0fb320807454e4fbea024d31c9c5c75',
             start:1,
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
             //跳转回前页
           //  wx.navigateBack({})
         },
         success: function(res) {
             console.log("result success ===",res);
             if(res.data.recode ==0){
                 _this.setData({
                     article : res.data.result.data.list
                 })
                 console.log("数据初始化成功！！！");
                 console.log("data =====",res.data.result.data.list);


             }
         }


     })


 }

})
