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
      uploadedPathArr:[]

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
                  upFiles.chooseVideo(_this, 1)
              }

          },
          fail: function (res) {
              console.log(res.errMsg)
          }
      })
  },
    // 上传文件
    subFormData2:function(){
        let _this = this;
        console.log("this.data ===" ,_this.data)
        let upData = {};
        let upImgArr = _this.data.upImgArr;
        let upVideoArr = _this.data.upVideoArr;
        _this.setData({
            upFilesProgress:true,
        })
        upData['url'] = config.service.upFiles;
        console.log("upData ===" ,upData)
        console.log("this is ...",_this)
 /*       wx.request({
            url: app.globalData.host + 'articleCon/create',
            data:  {
                typeId:'',
                articleTitle:_this.data.title,
                articleContent:_this.data.content,
                articleTopicsId:'1',
                articleTopics:"test",
                userId:'c0fb320807454e4fbea024d31c9c5c75',
                pictures:upImgArr
            },
            method: "POST",
            header: {
                "Content-Type": "multipart/form-data"
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

                }
            }


        })*/



       wx.uploadFile({
            url: app.globalData.host + 'articleCon/create',
            filePath: upImgArr[0].path,
            formData: {
                typeId:'',
                articleTitle:_this.data.title,
                articleContent:_this.data.content,
                articleTopicsId:'1',
                articleTopics:"test",
                userId:'c0fb320807454e4fbea024d31c9c5c75',
            },
            header: {
                "Content-Type": "multipart/form-data"
            },

            name: 'pictures',
            success: function (res) {
                var json2map = JSON.parse(res.data);
                console.log(json2map)

            }
        })

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
  // 上传文件或文件组
  subFormData:function(){
      let _this = this;
      let upData = {};
      let upImgArr = _this.data.upImgArr;
      let upVideoArr = _this.data.upVideoArr;
      let uuid = _this.data.uuid;
      _this.setData({
          upFilesProgress:true,
          upFilesType:null,
          uuid:''
      })

      console.log("subFormData _this is ",_this)
      console.log("subFormData uuid is ==============",uuid)


      if(upImgArr && upImgArr.length>0){

          upData.formData={type:"img",uuid:uuid,num:0};
      } else {
          upData.formData={type:"video",uuid:uuid,num:0};
      }

      console.log("upData ==",upData)
      upData['url'] = config.service.upFiles;
      upFiles.upFilesFun(_this, upData,function(res){
          if (upImgArr && res.index < upImgArr.length){
              upImgArr[res.index]['progress'] = res.progress

              _this.setData({
                  upImgArr: upImgArr,
                  upFilesType:'img'
              })
          }else{
              let i = res.index - upVideoArr.length;
              upVideoArr[i]['progress'] = res.progress
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

/*
        for (const path of _this.data.uploadedPathArr) {
            articlePicture+= path+";"
        }*/

        for (let i=0;i<_this.data.uploadedPathArr.length;i++){
            console.log("i="+i)
            console.log("length = "+_this.data.uploadedPathArr.length)
            if(i<_this.data.uploadedPathArr.length-1){
                articlePicture+= _this.data.uploadedPathArr[i]+";"
            }else {
                articlePicture+= _this.data.uploadedPathArr[i];
            }



        }

      //  articlePicture = articlePicture.substring(0,articlePicture.lastIndexOf(";")+1);

        console.log("articleLogo=",articleLogo);
        console.log("articlePicture=",articlePicture);

        wx.request({
            url: app.globalData.host + 'articleCon/create',
            data:  {
                uuid:_this.data.uuid,
                typeId:'',
                articleTitle:_this.data.title,
                articleContent:_this.data.content,
                articleTopicsId:'1',
                articleTopics:"test",
                userId:'c0fb320807454e4fbea024d31c9c5c75',
                articleLogo:articleLogo,
                articlePicture:articlePicture
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

                wx.navigateBack({})
            },
            success: function(res) {
                console.log("result success ===",res);
                if(res.data.code ==0){
                    console.log("发布文章成功！！！")


                }
            }


        })
    }

})
