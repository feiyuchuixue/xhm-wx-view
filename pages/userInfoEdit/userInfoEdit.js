var app = getApp();
var upFiles = require('../../utils/upFiles.js')
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '个人资料',
      'color': true,
      'class': '0',
    },
    sexSelector:{
      sexArray: ['未设置','男', '女'],
      index: 0,
    },
    date: '未设置',
    userInfo:{},
    upImgArr:[],
    fileUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    initUserInfo(_this)
  },


  /**
   * 上传文件
   *
   */
  uploadpic: function () {
    var that = this;
    util.uploadImageOne(app.U({ c: 'public_api', a: 'upload' }), function (res) {
      that.setData({ 'userInfo.avatar': app.globalData.url +res.data.url });
    });
  },

  /**
   * 提交修改
   */
  formSubmit:function(e){
    var that = this, value = e.detail.value, formId = e.detail.formId;
    if (!value.nickname) return app.Tips({title:'用户姓名不能为空'});
    value.avatar = that.data.userInfo.avatar;
    app.basePost(app.U({ c: 'user_api', a: 'edit_user' }), value,function(res){
      return app.Tips({title:res.msg,icon:'success'},{tab:3,url:1});
    },function(res){
      return app.Tips({title:res.msg || '保存失败，您并没有修改'},{tab:3,url:1});
    });
  },
  bindPickerChange: function(e) {
    this.setData({
      sexSelector:{
        sexArray: ['未设置','男', '女'],
        index:  e.detail.value,
      }

    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 选择图片或者视频
  uploadFiles: function (e) {
    let _this = this;
    _this.setData({
      upImgArr:[]
    })
    upFiles.chooseImage(_this, 1)

  },
  // 提交个人信息修改数据
  subFormData:function(e){
    console.log("eee========",e);
    let _this = this;
    let upData = {};
    let upImgArr = _this.data.upImgArr;

    let filesPath = upData.filesPathsArr ? upData.filesPathsArr : upFiles.getPathArr(_this);

    _this.setData({
      upFilesProgress:true,
      upFilesType:null,
      uuid:''
    })
    upData.formData={
      userId:'c0fb320807454e4fbea024d31c9c5c75'
    };
    upData['url'] = config.service.upUserLogo;
    upFiles.upFilesFun(_this, upData,function(res){
        upImgArr[res.index]['progress'] = res.progress
        _this.setData({
          upImgArr: upImgArr,
          upFilesType:'img'
        })

    }, function (arr) {
      // success
      console.log(_this.data.uploadedPathArr)
      console.log(arr)
      console.log("图片上传成功!!!")
      upgradeUser(_this,e);
    //  _this.createArticle();
    })
  },



})

//初始化获取用户信息
function initUserInfo(_this) {

  wx.request({
    url: app.globalData.host + 'userCon/getUserInfo',
    data: {
      userId: 'c0fb320807454e4fbea024d31c9c5c75'
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

        _this.setData({
          userInfo:  res.data.data.user
        })

        if(res.data.data.user.userBirthday){
        _this.setData({
            date: res.data.data.user.userBirthday
          })
        }

        if(res.data.data.user.userSex){
          let index =0;
          if(res.data.data.user.userSex=='男'){
            index = 1;
          }

          if(res.data.data.user.userSex=='女'){
            index = 2;
          }

          if(res.data.data.user.userLogo.indexOf('http')<0){
            let changeObj='userInfo.userLogo'
            _this.setData({
              [changeObj]:res.data.data.fileUrl + res.data.data.user.userLogo
            })
          }

          _this.setData({
            sexSelector:{
              sexArray: ['未设置','男', '女'],
              index: index,
            },
          })
        }


      }
    }

  })
}

//更新用户信息
function upgradeUser(_this,e) {
  console.log("更新用户信息...")

    _this.setData({
      upImgArr:[]
    })


  wx.request({
    url: app.globalData.host + 'userCon/upgradeUser',
    data: {
      userId: 'c0fb320807454e4fbea024d31c9c5c75',
      userLogo:_this.data.uploadedPathArr || '',
      userName:e.detail.value.userName  || '',
      userTel:e.detail.value.userTel  || '',
      userSex:e.detail.value.sex || '',
      birthday:e.detail.value.birthday || ''
    },
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    complete: function (res) {
      console.log("result ===", res);
      if (res == null || res.data == null) {
      }
    },
    success: function (res) {
      if (res.data.code == 0) {

        _this.setData({
          userInfo:  res.data.data.user
        })

        if(res.data.data.user.userBirthday){
          _this.setData({
            date: res.data.data.user.userBirthday
          })
        }

        if(res.data.data.user.userSex){
          let index =0;
          if(res.data.data.user.userSex=='男'){
            index = 1;
          }

          if(res.data.data.user.userSex=='女'){
            index = 2;
          }

          if(res.data.data.user.userLogo.indexOf('http')<0){
            let changeObj='userInfo.userLogo'
            _this.setData({
              [changeObj]:res.data.data.fileUrl + res.data.data.user.userLogo
            })
          }

          console.log("after change userInfo is...",_this.data.userInfo)


          _this.setData({
            sexSelector:{
              sexArray: ['未设置','男', '女'],
              index: index,
            },
          })
        }

        //跳转回前页

        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.setData({
          pageIndex: 1,
          pageLimit: 10,
          pageLikeIndex: 1,
          pageLikeLimit: 10,
          currentData: 0,


          loading: false,
          allloaded: false,
          isRefreshs:false,
          isTopRefreshShow:true,

          article: [],
          fileUrl: '',
          userInfo:{},

          articleLike: [],
          fileUrlLike: '',
          userInfoLike:{}
        })

        wx.navigateBack(prevPage.init());


      }
    }

  })


}


