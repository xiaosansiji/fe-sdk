# fe-sdk
这是一个嵌入其他站点的 Javascript SDK，主要用于采集页面性能指标及统计PV/UV信息。

采集性能主要依赖 window.performance 接口，因该接口兼容至 IE8+，所以暂时只能采集IE8以上及其他现代浏览器。

项目使用 rollup 打包，构建产出目录为 ./dist ,可以在浏览器端直接通过 `<script>` 引入。

Inspired by [browsertime](https://github.com/sitespeedio/browsertime)

## UV
用户未登陆时，根据当前时间戳及一个随机数生成 userID，放到 cookie 中。