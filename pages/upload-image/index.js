// pages/index/index.js
var config = require('../../config')
var util = require('../../utils/util.js')
var upFiles = require('../../utils/upFiles.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      upFilesBtn:true,
      upFilesProgress:false,
      maxUploadLen:6,
      // 标题数
      titleCount: 0,
      // 详情数
      contentCount: 0,
      // 标题内容
      title: '',
      // 标题内容
      content: '',
      // 图片列表
      images: [],
      // 视频
      video: '',
      //话题
      topics:'',
      //话题id
      topicsId:''

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 预览图片
  previewImg: function (e) {
      let imgsrc = e.currentTarget.dataset.presrc;
      let _this = this;
      let arr = _this.data.upImgArr;
      let preArr = [];
      arr.map(function(v,i){
          preArr.push(v.path)
      })
    //   console.log(preArr)
      wx.previewImage({
          current: imgsrc,
          urls: preArr
      })
  },
    // 删除上传图片 或者视频
  delFile:function(e){
     let _this = this;
     wx.showModal({
         title: '提示',
         content: '您确认删除嘛？',
         success: function (res) {
             if (res.confirm) {
                 let delNum = e.currentTarget.dataset.index;
                 let delType = e.currentTarget.dataset.type;
                 let upImgArr = _this.data.upImgArr;
                 let upVideoArr = _this.data.upVideoArr;
                 if (delType == 'image') {
                     upImgArr.splice(delNum, 1)
                     _this.setData({
                         upImgArr: upImgArr,
                     })
                 } else if (delType == 'video') {
                     upVideoArr.splice(delNum, 1)
                     _this.setData({
                         upVideoArr: upVideoArr,
                     })
                 }
                 let upFilesArr = upFiles.getPathArr(_this);
                 if (upFilesArr.length < _this.data.maxUploadLen) {
                     _this.setData({
                         upFilesBtn: true,
                     })
                 }
             } else if (res.cancel) {
                 console.log('用户点击取消')
             }
         }
     })


  },
  // 选择图片或者视频
  uploadFiles: function (e) {
      var _this = this;
      wx.showActionSheet({
          itemList: ['选择图片', '选择视频'],
          success: function (res) {
            //   console.log(res.tapIndex)
              let xindex = res.tapIndex;
              if (xindex == 0){
                  upFiles.chooseImage(_this, _this.data.maxUploadLen)
              } else if (xindex == 1){
                  upFiles.chooseVideo(_this, _this.data.maxUploadLen)
              }

          },
          fail: function (res) {
              console.log(res.errMsg)
          }
      })
  },
  // 上传文件
  subFormData:function(){
      let _this = this;
      let upData = {};
      let upImgArr = _this.data.upImgArr;
      let upVideoArr = _this.data.upVideoArr;
      _this.setData({
          upFilesProgress:true,
      })
      upData['url'] = config.service.upFiles;
      upFiles.upFilesFun(_this, upData,function(res){
          if (res.index < upImgArr.length){
              upImgArr[res.index]['progress'] = res.progress

              _this.setData({
                  upImgArr: upImgArr,
              })
          }else{
              let i = res.index - upImgArr.length;
              upVideoArr[i]['progress'] = res.progress
              _this.setData({
                  upVideoArr: upVideoArr,
              })
          }
        //   console.log(res)
      }, function (arr) {
          // success
          console.log(arr)
      })
  },
    // 标题操作
    handleTitleInput(event) {
        let inputValue = event.detail.value;
        // 确保标题不存在空格
        if (inputValue.lastIndexOf(" ") != -1) {
            inputValue = inputValue.substring(0, inputValue.lastIndexOf(" "));
        }
        let titleCount = inputValue.length;
        if (titleCount <= 25) {
            this.setData({
                titleCount: titleCount,
                title: inputValue
            })
        }
    },
    // 内容操作
    handleContentInput(event) {
        let textareaValue = event.detail.value;
        let contentCount = textareaValue.length;
        if (contentCount <= 255) {
            this.setData({
                contentCount: contentCount,
                content: textareaValue
            })
        }
    },
    //话题操作
    handleTopicsInput(event){
        console.log("init  handleTopicsInput...")
        wx.navigateTo({
            url: '/pages/search/search',
        })
    },

})
