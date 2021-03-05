(function(modules) {
            // 已加载的模块
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

                // 绑定模块内的this
                moduleFunc.call(module.exports, require, module, module.exports);
                module.loaded = true;
                return module.exports;
            }

            return require('E:\git_bash\mini\mini-pack\src\index.js')
        })({'E:\git_bash\mini\mini-pack\src\index.js': function(require, module, exports) {"use strict";

var _esm = require("./esm1.js");

var _esm2 = require("./esm2.js");

var cjs1 = require('./cjs1.js');

var cjs2 = require('./cjs2.js');

document.getElementById('btn1').addEventListener('click', function () {
  (0, _esm.say)();
});
document.getElementById('btn2').addEventListener('click', function () {
  (0, _esm2.say)();
});
document.getElementById('btn3').addEventListener('click', function () {
  cjs1.count++;
  console.log("cjs1.countcount\u8C03\u7528\u6B21\u6570\u4E3A: ".concat(cjs1.count));
});
document.getElementById('btn4').addEventListener('click', function () {
  cjs2.count++;
  console.log("cjs1.countcount\u8C03\u7528\u6B21\u6570\u4E3A: ".concat(cjs2.count));
});},'./esm1.js': function(require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.say = say;
exports.str1 = void 0;
var count = 0;

function say() {
  count++;
  console.log("esm1\u7684count\u8C03\u7528\u6B21\u6570\u4E3A: ".concat(count));
}

var str1 = 'str1';
exports.str1 = str1;},'./esm2.js': function(require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.say = say;
exports.str2 = void 0;

var cjs2 = require('./cjs2.js');

var count = 0;

function say() {
  count++;
  cjs2.count++;
  console.log("esm2\u7684count\u8C03\u7528\u6B21\u6570\u4E3A: ".concat(count));
  console.log("esm2\u8C03\u7528cjs2\u7684count\uFF0Ccount\u4E3A: ".concat(cjs2.count));
}

var str2 = 'str2';
exports.str2 = str2;},'./cjs2.js': function(require, module, exports) {"use strict";

var count = 0;
module.exports = {
  count: count
};},'./cjs1.js': function(require, module, exports) {"use strict";

var count = 0;
module.exports = {
  count: count
};},})