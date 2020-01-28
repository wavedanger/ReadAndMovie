### 简介
基于本地数据及豆瓣电影api的微信小程序
#### 效果预览
![预览图](https://github.com/wavedanger/wavedanger.github.io/blob/master/images/show.gif?raw=true)
<details>
  
<summary>注意点</summary>

#### 1. 全局配置与页面配置
页面配置会覆盖全局配置，如未设置页面配置会使用全局配置
例如：app.json和page.json下的navigationBarBackgroundColor,page.json会覆盖app.json
  
#### 2. 绝对路径与相对路径
绝对路径以"/"开头，相对路径以"../"开头，一般可以相互通用
  
#### 3. wx.navigateTo与wx.redirectTo差异
跳转时，调用的生命周期不同，前者会调用onHide后者会调用onUnload
  
#### 4. catchtap与bindtap
非冒泡与冒泡
  
#### 5. template与component
相同：都是组件化
不同：template主要是展示，而component拥有自己的js
使用：普通展示用template，较强逻辑使用component

#### 6. currentTarget与target
一个指触发，另一个指产生

#### 7. template组件使用
嵌套组件时，由内往外
传递数据时，由外往内
传递数据对象时，可用"..."扩展运算符传递属性

#### 8. 数据传递undefine
一般数据传递的对象需初始化，因为数据一般是那异步请求

#### 9. scroview不支持上拉刷新
改用view监听onPullDownRefresh函数，同时scroview的bindscrolltolower可改为监听onReachBottom

#### 10. 自定义data-的问题
data-imgUrl取值时，需为e.currentTarget.dataset.imgurl(小写)，data-后的命名会自动转为小写
</details>

<details>
<summary>数据来源</summary>

#### 1.本地数据
* 创建本地数据对象，再通过module.exports暴露，require引入使用
#### 2.数据接口

[详细请参考接口文档](https://douban-api-docs.zce.me/movie.html)

* 豆瓣电影接口
```
baseUrl:"http://api.douban.com",//主域名
apikeyStr: "?apikey=0df993c66c0c636e29ecbb5344252a4a",//务必带上
requestUrl:baseUrl+"/v2/movie/top250"+apikeyStr
```
* 大佬代理豆瓣电影接口
```
baseUrl:"https://douban.uieee.com"//主域名
requestUrl:baseUrl+"/v2/movie/top250"
```
* 豆瓣电影线上爬取搜索接口
```
//可用搜索api,实为豆瓣搜索提示，数据只有6条,且数据简单，q后为检索数据
searchUrl ="https://movie.douban.com/j/subject_suggest?q=%E5%9B%A7%E5%A6%88"
```
</details>

<details>
<summary>页面布局</summary> 

#### 1.flex布局
* 主要为以下这几个属性
```
flex-direction:row/column
flex:1
align-item:center
align-content:flex-start
```
#### 2.template嵌套
* 主要为电影九宫格，电影列表，单个电影，星星评分，从大往小嵌套
![嵌套关系图](https://github.com/wavedanger/wavedanger.github.io/blob/master/images/template.PNG?raw=true)
</details>

<details>
<summary>文章部分</summary>

#### 1.文章页
* 内容为轮播图加文章列表，而单个文章分离为template
* 知识点：template使用，页面传参跳转，本地数据引入
#### 2.文章详情页
* 内容为查看文章详情，收藏，分享，播放音乐
* 知识点：storage缓存，backgroundAudioManager音乐相关api操作,全局变量globalData使用，接收跳转数据，本地数据引入
</details>

<details>
<summary>电影部分</summary>

#### 1.电影页
* 内容为搜索接口+电影排行榜，搜索结果与排行榜交互显示
* 知识点：template嵌套使用，全局变量globalData使用，请求url拼接标志区分，通用util函数封装使用（包括请求接口，数据处理），js对象key值处理，数据跳转传参，wx:if页面显隐控制
#### 2.更多电影
* 内容为更多电影，每次加载20条数据，下拉刷新，上滑增加
* 知识点：接收跳转数据，全局变量globalData使用，通用util函数封装使用（包括请求接口，数据处理），template嵌套使用，
#### 3.电影详情
* 内容为电影详情
* 知识点：全局变量globalData使用，请求url拼接，通用util函数封装使用（包括请求接口，数据处理），接收跳转数据，监听用户上拉和下拉触底事件，loading api优化
</details>

<details>
<summary>其它</summary>
</details>
