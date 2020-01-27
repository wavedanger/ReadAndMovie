var app = getApp()
var util=require("../../utlis/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchMovie:{},
    inputText:"",
    containerShow: true,
    searchPanelShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.baseUrl + "/v2/movie/in_theaters" + app.globalData.apikeyStr
    var comingSoonUrl = app.globalData.baseUrl + "/v2/movie/coming_soon" + app.globalData.apikeyStr
    var top250Url = app.globalData.baseUrl + "/v2/movie/top250" + app.globalData.apikeyStr
    this.getMovieListData(inTheatersUrl,"inTheaters","正在上映")
    this.getMovieListData(comingSoonUrl, "comingSoon","即将上映")
    this.getMovieListData(top250Url, "top250","Top250")
  },
  getMovieListData: function(url, type,columnTitle) {
    var that=this
    wx.request({
      url: url,
      data: {
        start: 0,
        count: 3
      },
      header: {
        "Content-Type": "json"
      },
      method: 'GET',
      success: function(res) {
        // console.log(res)
        that.processData(res.data, type, columnTitle)
      }
    })
  },
  processData: function (moviesData, type, columnTitle){
    var movies=[]
    for(var idx in moviesData.subjects){
      var subject=moviesData.subjects[idx]
      var title = subject.title
      if (title.length>6){
        title = title.substr(0,6)+"..."
      }
      var temp={
        title:title,
        movieId:subject.id,
        coverImage:subject.images.large,
        average:subject.rating.average,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp)
    }
    var readyData={}
    readyData[type]={
      movies:movies,
      columnTitle: columnTitle
    }
    this.setData(readyData)
    // console.log(movies)
  },
  moreMovieTap:function(event){
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + event.currentTarget.dataset.category,
    })
  },
  onSearchConfirm:function(e){
    // 可用搜索api,实为豆瓣搜索提示，数据只有6条,且数据简单，q后为检索数据
    // var searchUrl ="https://movie.douban.com/j/subject_suggest?q=%E5%9B%A7%E5%A6%88"
    this.setData({
      inputText:e.detail.value
    })
     var searchUrl ="https://movie.douban.com/j/subject_suggest?q="+this.data.inputText;
     util.http(searchUrl,this.onSearchResult)
  },
  onSearchResult:function(data){
    var movies=[]
    for(var i in data){
      var title = data[i].title
      if(data[i].title.length>6){
        title = title.substr(0,6)+"..."
      }
      var temp={
        title: title,
        movieId: data[i].id,
        coverImage: data[i].img,
        average: "?",
        stars: [0,0,0,0,0]
      }
      movies.push(temp)
    }
    this.setData({
      "searchMovie.movies":movies,
      searchPanelShow: true,
      containerShow: false,
    })
  },
  onSearchInput:function(e){
    // console.log(e.detail.value)
  },
  closeSearch:function(){
    this.setData({
      searchPanelShow:false,
      containerShow: true,
      inputText: ""
    })
  },
  movieDetailTap:function(e){
    var movieId=e.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieId='+movieId,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})