// component/component-scroll/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pulldownDistance: { // 下拉距离
      type: Number,
      value: '40'
    },
    refreshPulldownText: { // 下拉文字
      type: String,
      value: '下拉刷新'
    },
    refreshUndoText: { // 松开文字
      type: String,
      value: '释放刷新'
    },
    refreshLoadingText: { // 刷新加载文字
      type: String,
      value: '正在加载'
    },
    isNeedLoadmore: { // 是否需要加载更多
      type: Boolean,
      value: false
    },
    allloaded: { // 全部加载完毕
      type: Boolean,
      value: false
    },
    isEmpty: { // 是否为空
      type: Boolean,
      value: false
    },
    loadmoreLoadingText: { // 加载更多文字
      type: String,
      value: '正在加载'
    },
    loadmoreAllloadedText: {
      type: String,
      value: '已经到最底部了~'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollTop: 0, // 是否在顶部
    touchStartY:40, // 触摸的起始位置
    refreshHeight: 0, // 下拉高度
    refreshText: '', // 下拉文字
    isRefresh: false, // 是否下拉刷新
    loadmoreHidden: true, // 加载更多显示
    loadmoreText: '' // 加载更多文字提示
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadmore(e) {
      console.log("loadmore...............")
      if (this.properties.allloaded && !this.properties.isEmpty) {
        console.log("return 111")
        this.setData({
          loadmoreHidden: false,
          loadmoreText: this.properties.loadmoreAllloadedText
        })
        return;
      }
      this.setData({
        loadmoreText: this.properties.loadmoreLoadingText,
        loadmoreHidden: false
      })
      console.log("return 222")
      setTimeout(() => {
        this.triggerEvent('_loadmore', {
          success: () => {
            this.setData({
              loadmoreHidden: true
            })
          }
        })
      }, 500)
    },
    scroll(e) {
      this.setData({
        scrollTop: e.detail.scrollTop
      })
    },
    touchStart(e) {
      this.setData({
        touchStartY: e.touches[0].pageY
      })
    },
    touchMove(e) {
      console.log("touchMove ...")
      if (this.data.scrollTop <= 0) {
        console.log("touchMove 111")
        let height = e.touches[0].pageY - this.data.touchStartY;
        console.log("height ===========",height)
        if (height < 0) {
          this.setData({
            isRefresh: false,
            refreshHeight: 0
          })
        } else if (height < this.properties.pulldownDistance) {
          console.log("touchMove 2222")
          this.setData({
            refreshHeight: height,
            isRefresh: false,
            refreshText: this.properties.refreshPulldownText
          })
        } else if (height >= this.properties.pulldownDistance) {
          console.log("touchMove 3333")
          this.setData({
            refreshHeight: this.properties.pulldownDistance,
            refreshText: this.properties.refreshUndoText,
            isRefresh: true
          })
        }
      } else {
        console.log("touchMove else")
        this.setData({
          refreshHeight: 0,
          refreshText: '',
          isRefresh: false
        })
      }

      console.log("refreshHeight === " + this.data.refreshHeight);
    },
    touchEnd(e) {
      console.log("touch end...............")
      if (this.data.scrollTop <= 0 && this.data.isRefresh) {
        console.log("touch 111111111")
        this.setData({
          refreshText: this.properties.refreshLoadingText,
          loadmoreHidden: true
        })
        setTimeout(() => {
          this.triggerEvent('_refresh', {
            success: () => {
              this.setData({
                refreshHeight: 0,
                refreshText: '',
                isRefresh: false
              })
            }
          })
        }, 1000)
      } else {
        console.log("touch 2222")
        this.setData({
          refreshHeight: 0,
          refreshText: '',
          isRefresh: false
        })
      }
    },

  }
})
