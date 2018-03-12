'use strict';

function userAgent() {
    return navigator.userAgent;
}

function windowSize() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    return x + 'x' + y;
}

function main() {
    console.log('userAgent:', userAgent);
    console.log('windowSize:', windowSize);
}

module.exports = main;
