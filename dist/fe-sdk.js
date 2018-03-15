(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function windowSize() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    return x + 'x' + y;
}

function firstPaint() {
    var p = window.performance,
        timing = p.timing,
        entries = p.getEntriesByType('paint');

    if (entries.length > 0) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var entry = _step.value;

                if (entry.name === 'first-paint') return Number(entry.startTime.toFixed(0));
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
    } else if (timing.timeToNonBlankPaint) {
        return Number((timing.timeToNonBlankPaint - timing.navigationStart).toFixed(0));
    }
    return undefined;
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

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var js_cookie = createCommonjsModule(function (module, exports) {
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof undefined === 'function' && undefined.amd) {
		undefined(factory);
		registeredInModuleLoader = true;
	}
	{
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var utils = {
    typeDecide: function typeDecide(o, type) {
        return Object.prototype.toString.call(o) === "[object " + type + "]";
    },
    serializeObj: function serializeObj(obj) {
        var parames = '';
        Object.keys(obj).forEach(function (name) {
            if (utils.typeDecide(obj[name], 'Object')) {
                parames += name + '=' + utils.stringify(obj[name]);
            } else {
                parames += name + '=' + obj[name] + '^';
            }
        });
        return encodeURIComponent(parames.substr(0, parames.length - 1));
    },
    stringify: function stringify(obj) {
        if (window.JSON && window.JSON.stringify) {
            return JSON.stringify(obj);
        }
        var t = typeof obj === "undefined" ? "undefined" : _typeof(obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n,
                v,
                json = [],
                arr = obj && obj.constructor == Array;

            // fix.
            var self = arguments.callee;

            for (n in obj) {
                if (obj.hasOwnProperty(n)) {

                    v = obj[n];
                    t = typeof v === "undefined" ? "undefined" : _typeof(v);
                    if (obj.hasOwnProperty(n)) {
                        if (t == "string") v = '"' + v + '"';else if (t == "object" && v !== null)
                            // v = jQuery.stringify(v)
                            v = self(v);
                        json.push((arr ? "" : '"' + n + '":') + String(v));
                    }
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    },
    assignObject: function assignObject(obj1, obj2) {
        for (var name in obj2) {
            if (obj2.hasOwnProperty(name)) {
                obj1[name] = obj2[name];
            }
        }
        return obj1;
    },
    genUserID: function genUserID(randomLength) {
        return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36);
    }
};

var config = {
    cookie: {
        name: 'fe-sdk',
        expires: 7
    }
};

var _config$cookie = config.cookie;
var name = _config$cookie.name;
var expires = _config$cookie.expires;

// Cookies 默认兼容至 IE8，如要兼容 IE6-7，可以添加对应 polyfill，see https://github.com/douglascrockford/JSON-js

function cookieTrack() {
    try {
        if (!js_cookie.get(name)) {
            js_cookie.set(name, utils.genUserID(), // generat user ID by time now & random num
            { expires: expires });
        }
    } catch (e) {
        console.error('your browser do not support js-cookie');
    }
}

var Events = function () {
    function Events() {
        classCallCheck(this, Events);

        this.handlers = {};
    }

    createClass(Events, [{
        key: "on",
        value: function on(event, handler) {
            this.handlers[event] = this.handlers[event] || [];
            this.handlers[event].push(handler);
            return this.handlers[event];
        }
    }, {
        key: "off",
        value: function off(event) {
            if (this.handlers[event]) {
                delete this.handlers[event];
            }
        }
    }, {
        key: "trigger",
        value: function trigger(event, args) {
            var _this = this;

            var arg = args || [];
            var funcs = this.handlers[event];
            if (funcs) {
                return funcs.every(function (f) {
                    var ret = f.apply(_this, arg);
                    return ret === false ? false : true;
                });
            }
            return true;
        }
    }]);
    return Events;
}();

var Report = function (_Events) {
    inherits(Report, _Events);

    function Report(options) {
        classCallCheck(this, Report);

        var _this = possibleConstructorReturn(this, (Report.__proto__ || Object.getPrototypeOf(Report)).call(this));

        var config = {
            dataKey: '', //上报数据的属性名，用于服务器获取数据
            mergeReport: true, // mergeReport 是否合并上报， false 关闭， true 启动（默认）
            delay: 1000, // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
            url: '', // 指定错误上报地址
            getPath: '', // get请求路径
            postPath: '', // post请求路径
            random: 1 // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
        };
        _this.config = utils.assignObject(config, options);
        _this.queue = {
            get: [],
            post: []
        };
        _this.getUrl = _this.config.url + _this.config.getPath;
        _this.postUrl = _this.config.url + _this.config.postPath;
        return _this;
    }

    createClass(Report, [{
        key: 'reportByGet',
        value: function reportByGet(data) {
            this.sendData('get', data);
        }
    }, {
        key: 'reportByPost',
        value: function reportByPost(data) {
            this.sendData('post', data);
        }
    }, {
        key: 'sendData',
        value: function sendData(type, data) {
            if (this.catchData(type, data)) {
                this.delayReport();
            }
        }
    }, {
        key: 'delayReport',
        value: function delayReport(cb) {
            var _this2 = this;

            if (!this.trigger('beforeReport')) return;
            var delay = this.config.mergeReport ? this.config.delay : 0;
            setTimeout(function () {
                if (!_this2.trigger('beforeSend')) return;
                _this2.report(cb);
            }, delay);
        }
        // push数据到pool

    }, {
        key: 'catchData',
        value: function catchData(type, data) {
            var rnd = Math.random();
            if (rnd >= this.config.random) {
                return false;
            }
            this.queue[type].push(data);
            return this.queue[type];
        }
    }, {
        key: 'report',
        value: function report(cb) {
            var _this3 = this;

            Promise.all([this.getRequest(), this.postRequest()]).then(function (urls) {
                _this3.trigger('afterReport');
                cb && cb.call(_this3, urls);
            });
        }
    }, {
        key: 'getRequest',
        value: function getRequest() {
            var _this4 = this;

            return new Promise(function (resolve) {
                if (_this4.queue.get.length === 0) {
                    resolve();
                } else {
                    var parames = _this4._getParames('get');
                    var url = _this4.getUrl + '?' + _this4.config.dataKey + '=' + parames;
                    var img = new window.Image();
                    img.onload = function () {
                        resolve(parames);
                    };
                    img.src = url;
                }
            });
        }
    }, {
        key: 'postRequest',
        value: function postRequest() {
            var _this5 = this;

            return new Promise(function (resolve) {
                if (_this5.queue.post.length === 0) {
                    resolve();
                } else {
                    var parames = _this5._getParames('post');
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            resolve(parames);
                        }
                    };
                    xmlhttp.open("POST", _this5.postUrl, true);
                    // xmlhttp.setRequestHeader("Content-Type", "application/json")
                    var data = {};
                    data[_this5.config.dataKey] = parames;
                    xmlhttp.send(utils.stringify(data));
                }
            });
        }
    }, {
        key: '_getParames',
        value: function _getParames(type) {
            var queue = this.queue[type];
            var mergeReport = this.config.mergeReport;
            var curQueue = mergeReport ? queue : [queue.shift()];
            if (mergeReport) this.queue[type] = [];

            var parames = curQueue.map(function (obj) {
                return utils.serializeObj(obj);
            }).join('|');
            return parames;
        }
    }]);
    return Report;
}(Events);

function main() {
    console.log('windowSize:', windowSize());
    console.log('firstPaint:', firstPaint());
    console.log('fullyLoaded:', fullyLoaded());
    console.log('resourceTimings:', resourceTimings());
    cookieTrack();
    var webper = {
        windowSize: windowSize(),
        firstPaint: firstPaint(),
        fullyLoaded: fullyLoaded(),
        resourceTimings: resourceTimings()
    };
    var rep = new Report({
        dataKey: 'webper', //上报数据的属性名，用于服务器获取数据
        mergeReport: true, // mergeReport 是否合并上报， false 关闭， true 启动（默认）
        delay: 1000, // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
        url: 'http://localhost:3000', // 指定错误上报地址
        getPath: '/read.gif', // get请求路径
        postPath: '/post/webper', // post请求路径
        random: 1 // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
    });

    rep.on('afterReport', function () {
        console.log('report success');
    });
    rep.reportByPost(webper, function (data) {
        console.log(data);
    });
    rep.reportByGet(webper, function (data) {
        console.log(data);
    });
}
main();

})));
