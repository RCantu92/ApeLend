webpackHotUpdate_N_E("pages/index",{

/***/ "./ethers/ethers.js":
/*!**************************!*\
  !*** ./ethers/ethers.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(process, module) {/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ \"./node_modules/ethers/lib.esm/index.js\");\n// May need to use this syntax for frontend:\n\nvar signer; // Conditional that uses the inject web3 from metamask\n// under certain conditions. Otherwise, it connects using\n// Alchemy.\n\nif ( true && typeof window.web3 !== 'undefined') {\n  // A Web3Provider wraps a standard Web3 provider, which is\n  // what Metamask injects as window.ethereum into each page\n  // await window.ethereum.enable();\n  var _provider = new ethers__WEBPACK_IMPORTED_MODULE_0__[\"ethers\"].providers.Web3Provider(window.ethereum);\n\n  signer = _provider.getSigner();\n} else {\n  // We are on the server *OR* the user is not running metamask\n  var network = \"ropsten\";\n  provider = ethers__WEBPACK_IMPORTED_MODULE_0__[\"ethers\"].getDefaultProvider(network, {\n    alchemy: process.env.ALCHEMY_ROPSTEN\n  });\n  signer = provider.getSigner();\n} // For Infura API (Use conditional in future, in case user does not have MetaMask)\n// (THIS IS FROM EATTHEBLOCKS)\n// const provider = new ethers.providers.AlchemyProvider('testnet name', INFURA_TESTNET_API_KEY);\n// Export instance of Ethers' provider\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (signer);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ \"./node_modules/process/browser.js\"), __webpack_require__(/*! ./../node_modules/next/dist/compiled/webpack/harmony-module.js */ \"./node_modules/next/dist/compiled/webpack/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vZXRoZXJzL2V0aGVycy5qcz9hNmFkIl0sIm5hbWVzIjpbInNpZ25lciIsIndpbmRvdyIsIndlYjMiLCJwcm92aWRlciIsImV0aGVycyIsInByb3ZpZGVycyIsIldlYjNQcm92aWRlciIsImV0aGVyZXVtIiwiZ2V0U2lnbmVyIiwibmV0d29yayIsImdldERlZmF1bHRQcm92aWRlciIsImFsY2hlbXkiLCJwcm9jZXNzIiwiZW52IiwiQUxDSEVNWV9ST1BTVEVOIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBLElBQUlBLE1BQUosQyxDQUVBO0FBQ0E7QUFDQTs7QUFDQSxJQUFJLFNBQWlDLE9BQU9DLE1BQU0sQ0FBQ0MsSUFBZCxLQUF1QixXQUE1RCxFQUF5RTtBQUNyRTtBQUNBO0FBQ0E7QUFDQSxNQUFNQyxTQUFRLEdBQUcsSUFBSUMsNkNBQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsWUFBckIsQ0FBa0NMLE1BQU0sQ0FBQ00sUUFBekMsQ0FBakI7O0FBQ0FQLFFBQU0sR0FBR0csU0FBUSxDQUFDSyxTQUFULEVBQVQ7QUFDSCxDQU5ELE1BTU87QUFDSDtBQUNBLE1BQU1DLE9BQU8sR0FBRyxTQUFoQjtBQUNBTixVQUFRLEdBQUdDLDZDQUFNLENBQUNNLGtCQUFQLENBQTBCRCxPQUExQixFQUFtQztBQUFFRSxXQUFPLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQztBQUF2QixHQUFuQyxDQUFYO0FBQ0FkLFFBQU0sR0FBR0csUUFBUSxDQUFDSyxTQUFULEVBQVQ7QUFDSCxDLENBRUc7QUFDQTtBQUNBO0FBRUo7OztBQUNlUixxRUFBZiIsImZpbGUiOiIuL2V0aGVycy9ldGhlcnMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNYXkgbmVlZCB0byB1c2UgdGhpcyBzeW50YXggZm9yIGZyb250ZW5kOlxuaW1wb3J0IHsgZXRoZXJzIH0gZnJvbSAnZXRoZXJzJztcblxubGV0IHNpZ25lcjtcblxuLy8gQ29uZGl0aW9uYWwgdGhhdCB1c2VzIHRoZSBpbmplY3Qgd2ViMyBmcm9tIG1ldGFtYXNrXG4vLyB1bmRlciBjZXJ0YWluIGNvbmRpdGlvbnMuIE90aGVyd2lzZSwgaXQgY29ubmVjdHMgdXNpbmdcbi8vIEFsY2hlbXkuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy53ZWIzICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEEgV2ViM1Byb3ZpZGVyIHdyYXBzIGEgc3RhbmRhcmQgV2ViMyBwcm92aWRlciwgd2hpY2ggaXNcbiAgICAvLyB3aGF0IE1ldGFtYXNrIGluamVjdHMgYXMgd2luZG93LmV0aGVyZXVtIGludG8gZWFjaCBwYWdlXG4gICAgLy8gYXdhaXQgd2luZG93LmV0aGVyZXVtLmVuYWJsZSgpO1xuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5wcm92aWRlcnMuV2ViM1Byb3ZpZGVyKHdpbmRvdy5ldGhlcmV1bSk7XG4gICAgc2lnbmVyID0gcHJvdmlkZXIuZ2V0U2lnbmVyKCk7XG59IGVsc2Uge1xuICAgIC8vIFdlIGFyZSBvbiB0aGUgc2VydmVyICpPUiogdGhlIHVzZXIgaXMgbm90IHJ1bm5pbmcgbWV0YW1hc2tcbiAgICBjb25zdCBuZXR3b3JrID0gXCJyb3BzdGVuXCI7XG4gICAgcHJvdmlkZXIgPSBldGhlcnMuZ2V0RGVmYXVsdFByb3ZpZGVyKG5ldHdvcmssIHsgYWxjaGVteTogcHJvY2Vzcy5lbnYuQUxDSEVNWV9ST1BTVEVOIH0pO1xuICAgIHNpZ25lciA9IHByb3ZpZGVyLmdldFNpZ25lcigpO1xufVxuXG4gICAgLy8gRm9yIEluZnVyYSBBUEkgKFVzZSBjb25kaXRpb25hbCBpbiBmdXR1cmUsIGluIGNhc2UgdXNlciBkb2VzIG5vdCBoYXZlIE1ldGFNYXNrKVxuICAgIC8vIChUSElTIElTIEZST00gRUFUVEhFQkxPQ0tTKVxuICAgIC8vIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5wcm92aWRlcnMuQWxjaGVteVByb3ZpZGVyKCd0ZXN0bmV0IG5hbWUnLCBJTkZVUkFfVEVTVE5FVF9BUElfS0VZKTtcblxuLy8gRXhwb3J0IGluc3RhbmNlIG9mIEV0aGVycycgcHJvdmlkZXJcbmV4cG9ydCBkZWZhdWx0IHNpZ25lcjsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./ethers/ethers.js\n");

/***/ })

})