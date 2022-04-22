# vue-music

本项目基于Vue3开发的，是一个仿网易云音乐的移动端项目

本项目的布局样式参照的是网易云音乐在Chrome开发者工具里切换为移动端的样式和[react-music](https://github.com/maomao1996/react-music)该项目

本项目数据来源于开源项目：[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)，需要自己部署

本项目主要的实现的功能有：

- 推荐歌单
- 歌单列表
- 排行榜
- 搜索（热门搜索、搜索建议、搜索历史）
- 歌曲列表
- 歌手信息
- 歌单详情
- 专辑详情
- 评论列表
- 歌曲播放
- 等等......

[在线演示地址](http://1.15.112.209:8080/home)

## 如何安装运行

```shell
# 1. 下载 NeteaseCloudMusicApi
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

# 安装依赖
npm install

# 服务端运行 访问 http://localhost:3000
node app.js

# 2. 下载本项目
git clone https://github.com/zhanup/vue-music

# 安装依赖
npm install

# 运行项目 访问 http://localhost:8080
npm run serve
```
## 项目技术

- Vue3 - 一套用于构建用户界面的渐进式框架
- Vue-Router - Vue.js 的官方路由
- Pinia - 新一代的 Vue.js 状态管理工具
- Axios - 网络请求库
- Dayjs - 一个处理时间的工具库
- Sass - CSS 预处理器
- Vue3-Lazy - Vue3 图片懒加载
- Better-Scroll - 一款重点解决移动端各种滚动场景需求的插件
- Vconsole - 移动端开发调试工具