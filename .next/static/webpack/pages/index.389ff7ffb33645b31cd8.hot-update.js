webpackHotUpdate_N_E("pages/index",{

/***/ "./ethers/ethers.js":
/*!**************************!*\
  !*** ./ethers/ethers.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(process, module) {/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ \"./node_modules/ethers/lib.esm/index.js\");\n// May need to use this syntax for frontend:\n\nvar signer; // Conditional that uses the inject web3 from metamask\n// under certain conditions. Otherwise, it connects using\n// Alchemy.\n\nif ( true && typeof window.web3 !== 'undefined') {\n  window.ethereum.enable(); // A Web3Provider wraps a standard Web3 provider, which is\n  // what Metamask injects as window.ethereum into each page\n\n  var provider = new ethers__WEBPACK_IMPORTED_MODULE_0__[\"ethers\"].providers.Web3Provider(window.ethereum);\n  signer = provider.getSigner();\n} else {\n  // We are on the server *OR* the user is not running metamask\n  // const network = \"ropsten\";\n  //const provider = ethers.getDefaultProvider(network, { alchemy: process.env.ALCHEMY_ROPSTEN });\n  var _provider = new ethers__WEBPACK_IMPORTED_MODULE_0__[\"ethers\"].providers.JsonRpcProvider(\"https://eth-ropsten.alchemyapi.io/v2/\".concat(process.env.ALCHEMY_ROPSTEN));\n\n  signer = _provider.getSigner();\n} // For Infura API (Use conditional in future, in case user does not have MetaMask)\n// (THIS IS FROM EATTHEBLOCKS)\n// const provider = new ethers.providers.AlchemyProvider('testnet name', INFURA_TESTNET_API_KEY);\n// Export instance of Ethers' provider\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (signer);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ \"./node_modules/process/browser.js\"), __webpack_require__(/*! ./../node_modules/next/dist/compiled/webpack/harmony-module.js */ \"./node_modules/next/dist/compiled/webpack/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vZXRoZXJzL2V0aGVycy5qcz9hNmFkIl0sIm5hbWVzIjpbInNpZ25lciIsIndpbmRvdyIsIndlYjMiLCJldGhlcmV1bSIsImVuYWJsZSIsInByb3ZpZGVyIiwiZXRoZXJzIiwicHJvdmlkZXJzIiwiV2ViM1Byb3ZpZGVyIiwiZ2V0U2lnbmVyIiwiSnNvblJwY1Byb3ZpZGVyIiwicHJvY2VzcyIsImVudiIsIkFMQ0hFTVlfUk9QU1RFTiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQSxJQUFJQSxNQUFKLEMsQ0FFQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSSxTQUFpQyxPQUFPQyxNQUFNLENBQUNDLElBQWQsS0FBdUIsV0FBNUQsRUFBeUU7QUFFckVELFFBQU0sQ0FBQ0UsUUFBUCxDQUFnQkMsTUFBaEIsR0FGcUUsQ0FHckU7QUFDQTs7QUFDQSxNQUFNQyxRQUFRLEdBQUcsSUFBSUMsNkNBQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsWUFBckIsQ0FBa0NQLE1BQU0sQ0FBQ0UsUUFBekMsQ0FBakI7QUFDQUgsUUFBTSxHQUFHSyxRQUFRLENBQUNJLFNBQVQsRUFBVDtBQUNILENBUEQsTUFPTztBQUNIO0FBQ0E7QUFDQTtBQUNBLE1BQU1KLFNBQVEsR0FBRyxJQUFJQyw2Q0FBTSxDQUFDQyxTQUFQLENBQWlCRyxlQUFyQixnREFBNkVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxlQUF6RixFQUFqQjs7QUFDQWIsUUFBTSxHQUFHSyxTQUFRLENBQUNJLFNBQVQsRUFBVDtBQUNILEMsQ0FFRztBQUNBO0FBQ0E7QUFFSjs7O0FBQ2VULHFFQUFmIiwiZmlsZSI6Ii4vZXRoZXJzL2V0aGVycy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE1heSBuZWVkIHRvIHVzZSB0aGlzIHN5bnRheCBmb3IgZnJvbnRlbmQ6XG5pbXBvcnQgeyBldGhlcnMgfSBmcm9tICdldGhlcnMnO1xuXG5sZXQgc2lnbmVyO1xuXG4vLyBDb25kaXRpb25hbCB0aGF0IHVzZXMgdGhlIGluamVjdCB3ZWIzIGZyb20gbWV0YW1hc2tcbi8vIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucy4gT3RoZXJ3aXNlLCBpdCBjb25uZWN0cyB1c2luZ1xuLy8gQWxjaGVteS5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LndlYjMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgXG4gICAgd2luZG93LmV0aGVyZXVtLmVuYWJsZSgpO1xuICAgIC8vIEEgV2ViM1Byb3ZpZGVyIHdyYXBzIGEgc3RhbmRhcmQgV2ViMyBwcm92aWRlciwgd2hpY2ggaXNcbiAgICAvLyB3aGF0IE1ldGFtYXNrIGluamVjdHMgYXMgd2luZG93LmV0aGVyZXVtIGludG8gZWFjaCBwYWdlXG4gICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZXRoZXJzLnByb3ZpZGVycy5XZWIzUHJvdmlkZXIod2luZG93LmV0aGVyZXVtKTtcbiAgICBzaWduZXIgPSBwcm92aWRlci5nZXRTaWduZXIoKTtcbn0gZWxzZSB7XG4gICAgLy8gV2UgYXJlIG9uIHRoZSBzZXJ2ZXIgKk9SKiB0aGUgdXNlciBpcyBub3QgcnVubmluZyBtZXRhbWFza1xuICAgIC8vIGNvbnN0IG5ldHdvcmsgPSBcInJvcHN0ZW5cIjtcbiAgICAvL2NvbnN0IHByb3ZpZGVyID0gZXRoZXJzLmdldERlZmF1bHRQcm92aWRlcihuZXR3b3JrLCB7IGFsY2hlbXk6IHByb2Nlc3MuZW52LkFMQ0hFTVlfUk9QU1RFTiB9KTtcbiAgICBjb25zdCBwcm92aWRlciA9IG5ldyBldGhlcnMucHJvdmlkZXJzLkpzb25ScGNQcm92aWRlcihgaHR0cHM6Ly9ldGgtcm9wc3Rlbi5hbGNoZW15YXBpLmlvL3YyLyR7cHJvY2Vzcy5lbnYuQUxDSEVNWV9ST1BTVEVOfWApO1xuICAgIHNpZ25lciA9IHByb3ZpZGVyLmdldFNpZ25lcigpO1xufVxuXG4gICAgLy8gRm9yIEluZnVyYSBBUEkgKFVzZSBjb25kaXRpb25hbCBpbiBmdXR1cmUsIGluIGNhc2UgdXNlciBkb2VzIG5vdCBoYXZlIE1ldGFNYXNrKVxuICAgIC8vIChUSElTIElTIEZST00gRUFUVEhFQkxPQ0tTKVxuICAgIC8vIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5wcm92aWRlcnMuQWxjaGVteVByb3ZpZGVyKCd0ZXN0bmV0IG5hbWUnLCBJTkZVUkFfVEVTVE5FVF9BUElfS0VZKTtcblxuLy8gRXhwb3J0IGluc3RhbmNlIG9mIEV0aGVycycgcHJvdmlkZXJcbmV4cG9ydCBkZWZhdWx0IHNpZ25lcjsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./ethers/ethers.js\n");

/***/ })

})