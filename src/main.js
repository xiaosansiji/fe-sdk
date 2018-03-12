import userAgent from './browser/userAgent'
import windowSize from './browser/windowSize'
import firstPaint from './timmings/firstPaint'
import fullyLoaded from './timmings/fullyLoaded'
import resourceTimings from './timmings/resourceTimings'

function main () {
    console.log('userAgent:', userAgent())
    console.log('windowSize:', windowSize())
    console.log('fullyLoaded:', fullyLoaded())
    console.log('resourceTimings:', resourceTimings())
}
main()