// pages/index/index.js
var config = require('../../config')
var util = require('../../utils/util.js')
var upFiles = require('../../utils/upFiles.js')
const app =getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      upFilesBtn:true,
      upFilesProgress:false,
      maxUploadLen:9,
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
      topicsId:'',
      upFilesType:'',
      uuid:'',
      uploadedPathArr:[],
      typeArray: ['~选择栏目~','宝妈团','出游', '吃喝',"专栏"],
      index: 0,
      submitTrue:false,
      //文件上传类别 img/video
      fileType:"img",
      src:'',
      tempFile:[]


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
    onLoad: function (options) {


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

e
  },
  // 选择图片或者视频
  uploadFiles: function (e) {
      var _this = this;
      //如果已经有图片的选择了，再新加文件类型只能是图片
      if(_this.data.upImgArr && _this.data.upImgArr.length>0){
          _this.setData({
              fileType :'img'
          })

          wx.showActionSheet({
              itemList: ['选择图片'],
              success: function (res) {
                  upFiles.chooseImage(_this, _this.data.maxUploadLen)

              },
              fail: function (res) {
                  console.log(res.errMsg)
              }
          })
      //没有上传文件，可选图片或者视频其一
      }else {

          wx.showActionSheet({
              itemList: ['选择图片', '选择视频'],
              success: function (res) {


                  //   console.log(res.tapIndex)
                  let xindex = res.tapIndex;
                  if (xindex == 0){
                   //跳转到裁剪图片页面
                      wx.navigateTo({
                          url: '/pages/cropper/cropper',
                      })


/*                      upFiles.chooseImage(_this, _this.data.maxUploadLen)
                      _this.setData({
                          fileType :'img'
                      })*/
                  } else if (xindex == 1){
                      upFiles.chooseVideo(_this, 1)
                      _this.setData({
                          fileType :'video'
                      })
                  }

              },
              fail: function (res) {
                  console.log(res.errMsg)
              }
          })
      }

  },
    //图片信息下追加
    pushImgArr:function(tempFile){
      let _this = this;
      console.log("tempFile--",tempFile)
      let temp = _this.data.tempFile;
        console.log("tempFile == ",tempFile)
      console.log("_this.data.uploadedPathArr == ",_this.data.uploadedPathArr)
      let newArr =[];
        newArr = _this.data.uploadedPathArr.concat(temp)
        //newArr = _this.data.uploadedPathArr.concat(temp)

      _this.setData({
          uploadedPathArr : newArr
      })

        console.log("uploadedPathArr  ===  " ,_this.data.uploadedPathArr)




      },
  // 上传文件或文件组
  subFormData:function(){
      let _this = this;
      let upData = {};
      let upImgArr = _this.data.upImgArr;
      let upVideoArr = _this.data.upVideoArr;
      let uuid = _this.data.uuid;

      if(_this.data.submitTrue){
          return;
      }

      let filesPath = upData.filesPathsArr ? upData.filesPathsArr : upFiles.getPathArr(_this);

      if(!filesPath || filesPath.length == 0) {
          wx.showToast({
              title: '请完善附件信息',
              duration: 2000,
              image:'../../image/warning_48.png',
              mask:true
          })
          return;
      }


      if(!_this.data.title) {
          wx.showToast({
              title: '请完善标题信息',
              duration: 2000,
              image:'../../image/warning_48.png',
              mask:true
          })
          return;
      }


      if(_this.data.index == 0){
          wx.showToast({
              title: '请选择文章栏目',
              duration: 2000,
              image:'../../image/warning_48.png',
              mask:true
          })
          return;
      }


      if(!_this.data.content) {
          wx.showToast({
              title: '请完善心情信息',
              duration: 2000,
              image:'../../image/warning_48.png',
              mask:true
          })
          return;
      }

      if(!_this.data.topics || !_this.data.topicsId) {
          wx.showToast({
              title: '请完善话题信息',
              duration: 2000,
              image:'../../image/warning_48.png',
              mask:true
          })
          return;
      }

      if(_this.data.index == 0){
          wx.showToast({
              title: '请完善栏目信息',
              duration: 2000,
              image:'../../image/warning_48.png',
              mask:true
          })
          return;
      }



      _this.setData({
          upFilesProgress:true,
          upFilesType:null,
          uuid:''
      })


      if(upImgArr && upImgArr.length>0){

          upData.formData={type:"img",uuid:uuid,num:0,os: app.globalData.os};
      } else {
          upData.formData={type:"video",uuid:uuid,num:0,os: app.globalData.os};
      }

      upData['url'] = config.service.upFiles;
      upFiles.upFilesFun(_this, upData,function(res){
          //规避上传连点。
          _this.setData({
              submitTrue:true
          })
          if (upImgArr && res.index < upImgArr.length){
              upImgArr[res.index]['progress'] = res.progress

              _this.setData({
                  upImgArr: upImgArr,
                  upFilesType:'img'
              })
          }else{
            //  let i = res.index - upVideoArr.length;

              upVideoArr[0]['progress'] = res.progress
              _this.setData({
                  upVideoArr: upVideoArr,
                  upFilesType:'video'
              })
          }
        //   console.log(res)
      }, function (arr) {
          // success
          console.log(arr)
          console.log("图片上传成功!!!")
          _this.createArticle();
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
    createArticle:function () {
      console.log("init createArticle fun ... ")
      let _this = this;
      let articleLogo=_this.data.uploadedPathArr[0];
      let articlePicture=''

        for (let i=0;i<_this.data.uploadedPathArr.length;i++){
            console.log("i="+i)
            console.log("length = "+_this.data.uploadedPathArr.length)
            if(i<_this.data.uploadedPathArr.length-1){
                articlePicture+= _this.data.uploadedPathArr[i]+";"
            }else {
                articlePicture+= _this.data.uploadedPathArr[i];
            }
        }

        console.log("articleLogo=",articleLogo);
        console.log("articlePicture=",articlePicture);


        console.log("upFilesType 文件类型 ==",_this.data.upFilesType);

        wx.request({
            url: app.globalData.host + 'articleCon/create',
            data:  {
                uuid:_this.data.uuid,
                typeId:_this.data.typeArray[_this.data.index] ,
                articleTitle:_this.data.title,
                articleContent:_this.data.content,
                articleTopicsId:_this.data.topicsId,
                articleTopics:_this.data.topics,
                userId:app.globalData.userInfo.id,
                articleLogo:articleLogo,
                articlePicture:articlePicture,
                articleLabel:_this.data.upFilesType
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

                var pages = getCurrentPages();
                var currPage = pages[pages.length - 1];   //当前页面
                var prevPage = pages[pages.length - 2];  //上一个页面
                prevPage.setData({
                    pageIndex:1,
                    currentData:0,
                    article: [],
                    fileUrl:''
                })

                wx.navigateBack(prevPage.init());
            },
            success: function(res) {
                console.log("result success ===",res);
                if(res.data.code ==0){
                    console.log("发布文章成功！！！")



                }
            }


        })
    },
    bindPickerChange: function(e) {
        console.log("bindPickerChange e=====",e)

        this.setData({
            index: e.detail.value,

        })
    },

})
