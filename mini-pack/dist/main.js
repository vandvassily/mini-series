(function(modules) {
            var installedModules = {};
            function require(moduleId) {
                if(installedModules[moduleId]) {
                    return installedModules[moduleId].exports;
                }
                var module = installedModules[moduleId] = {
                    i: moduleId,
                    loaded: false,
                    exports: {}
                };
                
                var moduleFunc = modules[moduleId];

                moduleFunc(require, module, module.exports);
                module.loaded = true;
                return module.exports;
            }

            return require('E:\git_bash\mini\mini-pack\src\index.js')
        })({'E:\git_bash\mini\mini-pack\src\index.js': function(require, module, exports) {"use strict";

var _about = require("./about.js");

var constant = require('./constant.js');

var num = '123';
console.log(num);
console.log(constant.arr);
var sum = constant.sum(3, 4);
console.log("\u8BA1\u7B97\u4E24\u6570\u4E4B\u548C\u4E3A: ".concat(sum));
var btn1 = document.getElementById('btn1');
btn1.addEventListener('click', function (e) {
  (0, _about.say)(num);
}, false);},'./about.js': function(require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.say = say;
exports.aboutStr = void 0;

var cjs2 = require('./cjs2.js');

function say(text) {
  count++;
  cjs2.count++;
  console.log("say\u8C03\u7528\u6B21\u6570\u4E3A: ".concat(count, ", say: ").concat(text));
  console.log("constant\u8C03\u7528\u6B21\u6570\u4E3A: ".concat(cjs2.count));
}

var count = 0;
var aboutStr = 'about string';
exports.aboutStr = aboutStr;},'./cjs2.js': function(require, module, exports) {"use strict";

var count = 0;
module.exports = {
  count: count
};},'./constant.js': function(require, module, exports) {"use strict";

var _about = require("./about.js");

var arr = ['this', 'is', 'commonJS'];
var constantStr = 'this is commonJS string';

var cjs2 = require('./cjs2.js');

var count = 0;
/**
 * 计算两数之和
 * @param {number} a
 * @param {number} b
 */

var sum = function sum() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return a + b;
};

var btn2 = document.getElementById('btn2');
btn2.addEventListener('click', function (e) {
  (0, _about.say)(111);
  cjs2.count++;
  console.log("cjs2\u8C03\u7528\u6B21\u6570\u4E3A: ".concat(cjs2.count));
}, false);
console.log(_about.aboutStr);
module.exports = {
  arr: arr,
  constantStr: constantStr,
  sum: sum,
  count: count
};},})