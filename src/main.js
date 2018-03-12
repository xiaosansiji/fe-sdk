import userAgent from './browser/userAgent'
import windowSize from './browser/windowSize'

function main () {
    console.log('userAgent:', userAgent())
    console.log('windowSize:', windowSize())
}
main()