import windowSize from './browser/windowSize'
import firstPaint from './timmings/firstPaint'
import fullyLoaded from './timmings/fullyLoaded'
import resourceTimings from './timmings/resourceTimings'
import cookieTrack from './uv/cookieTrack'
import Report from './report'

function main () {
    console.log('windowSize:', windowSize())
    console.log('firstPaint:', firstPaint())
    console.log('fullyLoaded:', fullyLoaded())
    console.log('resourceTimings:', resourceTimings())
    cookieTrack()
    const webper = {
        windowSize: windowSize(),
        firstPaint: firstPaint(),
        fullyLoaded: fullyLoaded(),
        resourceTimings: resourceTimings(),
    }
    const rep = new Report({
        dataKey: 'webper', //上报数据的属性名，用于服务器获取数据
        mergeReport: true, // mergeReport 是否合并上报， false 关闭， true 启动（默认）
        delay: 1000, // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
        url: 'http://localhost:3000', // 指定错误上报地址
        getPath: '/read.gif', // get请求路径
        postPath: '/post/webper', // post请求路径
        random: 1, // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
    })

    rep.on('afterReport', function () {
        console.log('report success')
    })
    rep.reportByPost(webper, function (data) {
        console.log(data)
    })
    rep.reportByGet(webper, function (data) {
        console.log(data)
    })
}
main()