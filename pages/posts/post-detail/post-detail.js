var postsData = require("../../../data/posts-data.js")
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postData = postsData.postsList[options.id]
    var postId=options.id
    this.setData({
      postData: postData,
      postId: postId
    })
    var postsCollected=wx.getStorageSync("posts_collected")
    if (postsCollected){
      var postCollected = postsCollected[postId]
      if (postCollected){
        this.setData({
          collect: postCollected
        })
      }
    }else{
      var postsCollected = {}
      postsCollected[postId]=false
      wx.setStorageSync("posts_collected", postsCollected)
    }
    var that=this
    if (app.globalData.g_isPlaying && app.globalData.g_postId == postId){
      that.setData({
        isPlaying: true
      })
    }
    var backgroundAudioManager=wx.getBackgroundAudioManager()
    backgroundAudioManager.onPlay(function(){
      that.setData({
        isPlaying: true
      })
      app.globalData.g_isPlaying = true
      app.globalData.g_postId = postId
    })
    backgroundAudioManager.onPause(function(){
      that.setData({
        isPlaying: false
      })
      app.globalData.g_isPlaying = false
      app.globalData.g_postId = null
      // console.log("pause")
    })
    backgroundAudioManager.onEnded(function(){
      that.setData({
        isPlaying: false
      })
      app.globalData.g_isPlaying = false
      app.globalData.g_postId = null
      // console.log("stop")
    })
  },
  onCollectionTap:function(){
    var postsCollected = wx.getStorageSync("posts_collected")
    var postCollected = postsCollected[this.data.postId]
    postCollected = !postCollected
    postsCollected[this.data.postId] = postCollected
    this.setData({
      collect: postCollected
    })
    wx.setStorageSync("posts_collected", postsCollected)
    wx.showToast({
      title: postCollected?'收藏成功':'取消成功',
      duration:1000,
      icon: "success"
    })
  },
  onShareTap:function(){
    var itemList = ["分享到好友", "分享到朋友圈", "分享到QQ"]
    wx.showActionSheet({
      itemList:itemList,
      itemColor:"#4050f8",
      success:function(res){
        wx.showModal({
          title: '确定'+itemList[res.tapIndex],
          content: '暂不支持，请取消！',
          success:function(res){
            if(res.confirm){
              wx.showToast({
                title: '你点确定也没用！',
                icon:"none"
              })
            }else{
              wx.showToast({
                title: '真听话！',
                icon: "none"
              })
            }
          }
        })
      }
    })
  },
  onMusicTap:function(){
    var postData = this.data.postData
    var that=this
    var backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = postData.music.title
    backgroundAudioManager.src = postData.music.url
    backgroundAudioManager.coverImgUrl = postData.music.coverImg
    if (that.data.isPlaying){
      backgroundAudioManager.pause()
      that.setData({
        isPlaying: false
      })
    }else{
      backgroundAudioManager.play()
      that.setData({
        isPlaying: true
      })
    }
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

  }
})