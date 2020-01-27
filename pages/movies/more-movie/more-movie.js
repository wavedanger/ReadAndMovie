var util=require("../../../utlis/util.js")
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle:"",
    movies:[],
    requestUrl:[],
    isEmpty:true,
    totalCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category
    this.setData({
      navTitle: category
    })
    var moviesUrl=""
    switch(category){
      case "正在上映":
        moviesUrl = app.globalData.baseUrl + "/v2/movie/in_theaters" + app.globalData.apikeyStr
        break;
        case "即将上映":
        moviesUrl = app.globalData.baseUrl + "/v2/movie/coming_soon" + app.globalData.apikeyStr
        break;
        case "Top250":
        moviesUrl = app.globalData.baseUrl + "/v2/movie/top250" + app.globalData.apikeyStr
        break;
    }
    this.setData({
      requestUrl:moviesUrl
    })
    util.http(moviesUrl, this.processData)
  },
  // onScrollToLower:function(){
  //   var nextUrl=this.data.requestUrl+"&start="+this.data.totalCount+"&count=20"
  //   util.http(nextUrl, this.processData)
  //   wx.showNavigationBarLoading();
  // },
  processData: function (moviesData) {
    var movies = []
    for (var idx in moviesData.subjects) {
      var subject = moviesData.subjects[idx]
      var title = subject.title
      if (title.length > 6) {
        title = title.substr(0, 6) + "..."
      }
      var temp = {
        title: title,
        movieId: subject.id,
        coverImage: subject.images.large,
        average: subject.rating.average,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp)
    }
    var totalMovies = []
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies)
    }else{
      totalMovies=movies
      this.setData({
        isEmpty:false
      })
    }
    this.setData({
      movies: totalMovies,
      totalCount: totalMovies.length
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  movieDetailTap: function (e) {
    var movieId = e.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieId=' + movieId,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navTitle,
    })
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
    var nextUrl = this.data.requestUrl + "&start=0&count=20"
    this.setData({
      movies:[],
      isEmpty:true
    })
    util.http(nextUrl, this.processData)
    wx.showNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var nextUrl = this.data.requestUrl + "&start=" + this.data.totalCount + "&count=20"
    util.http(nextUrl, this.processData)
    wx.showNavigationBarLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})