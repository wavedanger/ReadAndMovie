function convertToStarsArray(stars){
  var num=stars.toString().substring(0,1)
  var array=[]
  for(var i=1;i<=5;i++){
    if(i<=num){
      array.push(1)
    }else{
      array.push(0)
    }
  }
  return array
}
function http(url,callback){
  wx.request({
    url: url,
    data: {
    },
    header: {
      "Content-Type": "json"
    },
    method: 'GET',
    success: function (res) {
      callback(res.data)
    }
  })
}
function convertToCastString(casts){
  var castsString=""
  var castsArr=[]
  for(var i in casts){
    castsArr.push(casts[i].name)
  }
  castsString=castsArr.join("/")
  return castsString
}
function convertToCastInfos(casts) {
  var castsArr=[]
  for(var i in casts){
    var cast={
      name:casts[i].name,
      img:casts[i].avatars.large
    }
    castsArr.push(cast)
  }
  return castsArr
}
module.exports={
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  convertToStarsArray: convertToStarsArray,
  http:http
}