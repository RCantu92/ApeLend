webpackHotUpdate_N_E("pages/index",{

/***/ "./ethers/ethers.js":
/*!**************************!*\
  !*** ./ethers/ethers.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(process, module) {/* harmony import */ var _Users_robertocantu_blockchain_programming_ApeLend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _Users_robertocantu_blockchain_programming_ApeLend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_robertocantu_blockchain_programming_ApeLend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_robertocantu_blockchain_programming_ApeLend_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ethers */ \"./node_modules/ethers/lib.esm/index.js\");\n\n\n// May need to use this syntax for frontend:\n\n\nfunction main() {\n  return _main.apply(this, arguments);\n} // Export instance of Ethers' provider\n\n\nfunction _main() {\n  _main = Object(_Users_robertocantu_blockchain_programming_ApeLend_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_Users_robertocantu_blockchain_programming_ApeLend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n    var provider, signer, network, _provider, _signer;\n\n    return _Users_robertocantu_blockchain_programming_ApeLend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            if (!( true && typeof window.web3 !== 'undefined')) {\n              _context.next = 7;\n              break;\n            }\n\n            _context.next = 3;\n            return window.ethereum.enable();\n\n          case 3:\n            provider = new ethers__WEBPACK_IMPORTED_MODULE_2__[\"ethers\"].providers.Web3Provider(window.ethereum);\n            signer = provider.getSigner();\n            _context.next = 10;\n            break;\n\n          case 7:\n            // We are on the server *OR* the user is not running metamask\n            network = \"ropsten\";\n            _provider = ethers__WEBPACK_IMPORTED_MODULE_2__[\"ethers\"].getDefaultProvider(network, {\n              alchemy: process.env.ALCHEMY_ROPSTEN\n            });\n            _signer = _provider.getSigner;\n\n          case 10:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _main.apply(this, arguments);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (main);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ \"./node_modules/process/browser.js\"), __webpack_require__(/*! ./../node_modules/next/dist/compiled/webpack/harmony-module.js */ \"./node_modules/next/dist/compiled/webpack/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vZXRoZXJzL2V0aGVycy5qcz9hNmFkIl0sIm5hbWVzIjpbIm1haW4iLCJ3aW5kb3ciLCJ3ZWIzIiwiZXRoZXJldW0iLCJlbmFibGUiLCJwcm92aWRlciIsImV0aGVycyIsInByb3ZpZGVycyIsIldlYjNQcm92aWRlciIsInNpZ25lciIsImdldFNpZ25lciIsIm5ldHdvcmsiLCJnZXREZWZhdWx0UHJvdmlkZXIiLCJhbGNoZW15IiwicHJvY2VzcyIsImVudiIsIkFMQ0hFTVlfUk9QU1RFTiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7O1NBRWVBLEk7O0VBc0JmOzs7O3lUQXRCQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBSVEsU0FBaUMsT0FBT0MsTUFBTSxDQUFDQyxJQUFkLEtBQXVCLFdBSmhFO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBT2NELE1BQU0sQ0FBQ0UsUUFBUCxDQUFnQkMsTUFBaEIsRUFQZDs7QUFBQTtBQVFjQyxvQkFSZCxHQVF5QixJQUFJQyw2Q0FBTSxDQUFDQyxTQUFQLENBQWlCQyxZQUFyQixDQUFrQ1AsTUFBTSxDQUFDRSxRQUF6QyxDQVJ6QjtBQVNjTSxrQkFUZCxHQVN1QkosUUFBUSxDQUFDSyxTQUFULEVBVHZCO0FBQUE7QUFBQTs7QUFBQTtBQVdRO0FBQ01DLG1CQVpkLEdBWXdCLFNBWnhCO0FBYWNOLHFCQWJkLEdBYXlCQyw2Q0FBTSxDQUFDTSxrQkFBUCxDQUEwQkQsT0FBMUIsRUFBbUM7QUFBRUUscUJBQU8sRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDO0FBQXZCLGFBQW5DLENBYnpCO0FBY2NQLG1CQWRkLEdBY3VCSixTQUFRLENBQUNLLFNBZGhDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUF1QmVWLG1FQUFmIiwiZmlsZSI6Ii4vZXRoZXJzL2V0aGVycy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE1heSBuZWVkIHRvIHVzZSB0aGlzIHN5bnRheCBmb3IgZnJvbnRlbmQ6XG5pbXBvcnQgeyBldGhlcnMgfSBmcm9tICdldGhlcnMnO1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICAgIC8vIENvbmRpdGlvbmFsIHRoYXQgdXNlcyB0aGUgaW5qZWN0IHdlYjMgZnJvbSBtZXRhbWFza1xuICAgIC8vIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucy4gT3RoZXJ3aXNlLCBpdCBjb25uZWN0cyB1c2luZ1xuICAgIC8vIEFsY2hlbXkuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cud2ViMyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gQSBXZWIzUHJvdmlkZXIgd3JhcHMgYSBzdGFuZGFyZCBXZWIzIHByb3ZpZGVyLCB3aGljaCBpc1xuICAgICAgICAvLyB3aGF0IE1ldGFtYXNrIGluamVjdHMgYXMgd2luZG93LmV0aGVyZXVtIGludG8gZWFjaCBwYWdlXG4gICAgICAgIGF3YWl0IHdpbmRvdy5ldGhlcmV1bS5lbmFibGUoKVxuICAgICAgICBjb25zdCBwcm92aWRlciA9IG5ldyBldGhlcnMucHJvdmlkZXJzLldlYjNQcm92aWRlcih3aW5kb3cuZXRoZXJldW0pO1xuICAgICAgICBjb25zdCBzaWduZXIgPSBwcm92aWRlci5nZXRTaWduZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBhcmUgb24gdGhlIHNlcnZlciAqT1IqIHRoZSB1c2VyIGlzIG5vdCBydW5uaW5nIG1ldGFtYXNrXG4gICAgICAgIGNvbnN0IG5ldHdvcmsgPSBcInJvcHN0ZW5cIjtcbiAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBldGhlcnMuZ2V0RGVmYXVsdFByb3ZpZGVyKG5ldHdvcmssIHsgYWxjaGVteTogcHJvY2Vzcy5lbnYuQUxDSEVNWV9ST1BTVEVOIH0pO1xuICAgICAgICBjb25zdCBzaWduZXIgPSBwcm92aWRlci5nZXRTaWduZXI7XG4gICAgfVxuXG4gICAgLy8gRm9yIEluZnVyYSBBUEkgKFVzZSBjb25kaXRpb25hbCBpbiBmdXR1cmUsIGluIGNhc2UgdXNlciBkb2VzIG5vdCBoYXZlIE1ldGFNYXNrKVxuICAgIC8vIChUSElTIElTIEZST00gRUFUVEhFQkxPQ0tTKVxuICAgIC8vIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5wcm92aWRlcnMuQWxjaGVteVByb3ZpZGVyKCd0ZXN0bmV0IG5hbWUnLCBJTkZVUkFfVEVTVE5FVF9BUElfS0VZKTtcbn1cblxuLy8gRXhwb3J0IGluc3RhbmNlIG9mIEV0aGVycycgcHJvdmlkZXJcbmV4cG9ydCBkZWZhdWx0IG1haW47Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./ethers/ethers.js\n");

/***/ })

})