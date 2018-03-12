(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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

function fullyLoaded() {
    // lets use the Resource Timing API, so it is important that we run
    // this after all request/responses finished
    if (window.performance && window.performance.getEntriesByType) {
        var resources = window.performance.getEntriesByType('resource');
        var max = 0;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = resources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var resource = _step.value;

                if (resource.responseEnd > max) {
                    max = resource.responseEnd;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return Number(max.toFixed(0));
    } else {
        return -1;
    }
}

function resourceTimings() {
    var resources = [];
    if (window.performance && window.performance.getEntriesByType) {
        var timings = window.performance.getEntriesByType('resource');

        // we can do more cool stuff with resouce timing v2 in the
        // future
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = timings[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var resource = _step.value;

                resources.push({
                    name: resource.name,
                    duration: Number(resource.duration.toFixed(2))
                });
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return resources;
}

function main() {
    console.log('userAgent:', userAgent());
    console.log('windowSize:', windowSize());
    console.log('fullyLoaded:', fullyLoaded());
    console.log('resourceTimings:', resourceTimings());
}
main();

})));
