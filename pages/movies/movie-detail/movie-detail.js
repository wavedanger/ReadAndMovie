var app=getApp();
var util=require("../../../utlis/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId=options.movieId
    var requestUrl = app.globalData.baseUrl + "/v2/movie/subject/" + movieId + app.globalData.apikeyStr
    util.http(requestUrl,this.processData)
  },
  processData:function(data){
    var movie={
      movieImg:data.images.large,
      country:data.countries[0],
      title:data.title,
      originalTitle:data.original_title,
      wishCount:data.wish_count,
      commentCount:data.comments_count,
      year:data.year,
      generes:data.genres.join("、"),
      stars: util.convertToStarsArray(data.rating.stars),
      score:data.rating.average,
      director:data.directors[0].name,
      casts:util.convertToCastString(data.casts),
      castsInfo:util.convertToCastInfos(data.casts),
      summary:data.summary
    }
    this.setData({
      movie:movie
    })
  },
  showMovieImg:function(e){
    var imgUrl = e.currentTarget.dataset.imgurl
    wx.previewImage({
      current: imgUrl,
      urls: [imgUrl],
    })
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