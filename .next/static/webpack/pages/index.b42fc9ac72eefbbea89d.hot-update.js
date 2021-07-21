webpackHotUpdate_N_E("pages/index",{

/***/ "./ethers/ethers.js":
/*!**************************!*\
  !*** ./ethers/ethers.js ***!
  \**************************/
/*! exports provided: provider, signer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"provider\", function() { return provider; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signer\", function() { return signer; });\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ \"./node_modules/ethers/lib.esm/index.js\");\n// May need to use this syntax for frontend:\n\nconsole.log(\"Step Zero; Very Beginning\"); // Creating variable instance of\n// provider to give value based\n// if using MetaMask or not.\n\nvar provider;\nvar signer; // Conditional that uses the inject web3 from metamask\n// under certain conditions. Otherwise, it connects using\n// Alchemy.\n\nif ( true && typeof window.ethereum !== 'undefined') {\n  console.log(\"Step One: MetaMask\"); // ethereum.request({ method: 'eth_requestAccounts' }); // THIS LINE SHOULD BE PROMPTED BY A USER'S ACTIOIN (IS LINE NEEDED?)\n  // A Web3Provider wraps a standard Web3 provider, which is\n  // what Metamask injects as window.ethereum into each page\n\n  var _provider = new ethers__WEBPACK_IMPORTED_MODULE_0__[\"ethers\"].providers.Web3Provider(window.ethereum);\n\n  signer = _provider.getSigner();\n  console.log(\"Step Two: Signer from MetaMask - \".concat(signer));\n}\n/* else {\n   console.log(\"Step One: Alchemy\");\n   // FIX, RIGHT NOW WE *HAVE* TO USE METAMASK, OTHERWISE ERRORS OUT\n   // We are on the server *OR* the user is not running metamask\n   const network = \"ropsten\";\n   const provider = ethers.getDefaultProvider(network, { alchemy: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_ROPSTEN}` });\n   // const provider = new ethers.providers.AlchemyProvider(network, `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_ROPSTEN}` );\n   // signer = provider.getSigner();\n   console.log(`Step Two: Provider from Alchemy - ${provider}`);\n}*/\n// Export instance of Ethers' provider\n\n\n\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/next/dist/compiled/webpack/harmony-module.js */ \"./node_modules/next/dist/compiled/webpack/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vZXRoZXJzL2V0aGVycy5qcz9hNmFkIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJwcm92aWRlciIsInNpZ25lciIsIndpbmRvdyIsImV0aGVyZXVtIiwiZXRoZXJzIiwicHJvdmlkZXJzIiwiV2ViM1Byb3ZpZGVyIiwiZ2V0U2lnbmVyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMkJBQVosRSxDQUVBO0FBQ0E7QUFDQTs7QUFDQSxJQUFJQyxRQUFKO0FBQ0EsSUFBSUMsTUFBSixDLENBRUE7QUFDQTtBQUNBOztBQUNBLElBQUksU0FBaUMsT0FBT0MsTUFBTSxDQUFDQyxRQUFkLEtBQTJCLFdBQWhFLEVBQTZFO0FBQ3pFTCxTQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBWixFQUR5RSxDQUV6RTtBQUNBO0FBQ0E7O0FBQ0EsTUFBTUMsU0FBUSxHQUFHLElBQUlJLDZDQUFNLENBQUNDLFNBQVAsQ0FBaUJDLFlBQXJCLENBQWtDSixNQUFNLENBQUNDLFFBQXpDLENBQWpCOztBQUNBRixRQUFNLEdBQUdELFNBQVEsQ0FBQ08sU0FBVCxFQUFUO0FBQ0FULFNBQU8sQ0FBQ0MsR0FBUiw0Q0FBZ0RFLE1BQWhEO0FBQ0g7QUFBQTtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFDQSIsImZpbGUiOiIuL2V0aGVycy9ldGhlcnMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNYXkgbmVlZCB0byB1c2UgdGhpcyBzeW50YXggZm9yIGZyb250ZW5kOlxuaW1wb3J0IHsgZXRoZXJzIH0gZnJvbSAnZXRoZXJzJztcblxuY29uc29sZS5sb2coXCJTdGVwIFplcm87IFZlcnkgQmVnaW5uaW5nXCIpXG5cbi8vIENyZWF0aW5nIHZhcmlhYmxlIGluc3RhbmNlIG9mXG4vLyBwcm92aWRlciB0byBnaXZlIHZhbHVlIGJhc2VkXG4vLyBpZiB1c2luZyBNZXRhTWFzayBvciBub3QuXG5sZXQgcHJvdmlkZXI7XG5sZXQgc2lnbmVyO1xuXG4vLyBDb25kaXRpb25hbCB0aGF0IHVzZXMgdGhlIGluamVjdCB3ZWIzIGZyb20gbWV0YW1hc2tcbi8vIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucy4gT3RoZXJ3aXNlLCBpdCBjb25uZWN0cyB1c2luZ1xuLy8gQWxjaGVteS5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmV0aGVyZXVtICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUubG9nKFwiU3RlcCBPbmU6IE1ldGFNYXNrXCIpO1xuICAgIC8vIGV0aGVyZXVtLnJlcXVlc3QoeyBtZXRob2Q6ICdldGhfcmVxdWVzdEFjY291bnRzJyB9KTsgLy8gVEhJUyBMSU5FIFNIT1VMRCBCRSBQUk9NUFRFRCBCWSBBIFVTRVInUyBBQ1RJT0lOIChJUyBMSU5FIE5FRURFRD8pXG4gICAgLy8gQSBXZWIzUHJvdmlkZXIgd3JhcHMgYSBzdGFuZGFyZCBXZWIzIHByb3ZpZGVyLCB3aGljaCBpc1xuICAgIC8vIHdoYXQgTWV0YW1hc2sgaW5qZWN0cyBhcyB3aW5kb3cuZXRoZXJldW0gaW50byBlYWNoIHBhZ2VcbiAgICBjb25zdCBwcm92aWRlciA9IG5ldyBldGhlcnMucHJvdmlkZXJzLldlYjNQcm92aWRlcih3aW5kb3cuZXRoZXJldW0pO1xuICAgIHNpZ25lciA9IHByb3ZpZGVyLmdldFNpZ25lcigpO1xuICAgIGNvbnNvbGUubG9nKGBTdGVwIFR3bzogU2lnbmVyIGZyb20gTWV0YU1hc2sgLSAke3NpZ25lcn1gKTtcbn0vKiBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0ZXAgT25lOiBBbGNoZW15XCIpO1xuICAgIC8vIEZJWCwgUklHSFQgTk9XIFdFICpIQVZFKiBUTyBVU0UgTUVUQU1BU0ssIE9USEVSV0lTRSBFUlJPUlMgT1VUXG4gICAgLy8gV2UgYXJlIG9uIHRoZSBzZXJ2ZXIgKk9SKiB0aGUgdXNlciBpcyBub3QgcnVubmluZyBtZXRhbWFza1xuICAgIGNvbnN0IG5ldHdvcmsgPSBcInJvcHN0ZW5cIjtcbiAgICBjb25zdCBwcm92aWRlciA9IGV0aGVycy5nZXREZWZhdWx0UHJvdmlkZXIobmV0d29yaywgeyBhbGNoZW15OiBgaHR0cHM6Ly9ldGgtcm9wc3Rlbi5hbGNoZW15YXBpLmlvL3YyLyR7cHJvY2Vzcy5lbnYuQUxDSEVNWV9ST1BTVEVOfWAgfSk7XG4gICAgLy8gY29uc3QgcHJvdmlkZXIgPSBuZXcgZXRoZXJzLnByb3ZpZGVycy5BbGNoZW15UHJvdmlkZXIobmV0d29yaywgYGh0dHBzOi8vZXRoLXJvcHN0ZW4uYWxjaGVteWFwaS5pby92Mi8ke3Byb2Nlc3MuZW52LkFMQ0hFTVlfUk9QU1RFTn1gICk7XG4gICAgLy8gc2lnbmVyID0gcHJvdmlkZXIuZ2V0U2lnbmVyKCk7XG4gICAgY29uc29sZS5sb2coYFN0ZXAgVHdvOiBQcm92aWRlciBmcm9tIEFsY2hlbXkgLSAke3Byb3ZpZGVyfWApO1xufSovXG5cbi8vIEV4cG9ydCBpbnN0YW5jZSBvZiBFdGhlcnMnIHByb3ZpZGVyXG5leHBvcnQgeyBwcm92aWRlciwgc2lnbmVyIH0gOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./ethers/ethers.js\n");

/***/ })

})