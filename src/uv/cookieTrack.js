import Cookies from 'js-cookie'
import utils from '../utils'
import config from '../config'

const { cookie: { name, expires } } = config

// Cookies 默认兼容至 IE8，如要兼容 IE6-7，可以添加对应 polyfill，see https://github.com/douglascrockford/JSON-js
export default function cookieTrack () {
    try {
        if (!Cookies.get(name)) {
            Cookies.set(
                name,
                utils.genUserID(), // generat user ID by time now & random num
                { expires: expires }
            )
        }
    } catch (e) {
        console.error('your browser do not support js-cookie')
    }
}