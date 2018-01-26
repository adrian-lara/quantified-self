/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var foodFetches = __webpack_require__(1);

	$(document).ready(function () {
	  foodFetches.getAllFoods();
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var url = 'https://protected-basin-11627.herokuapp.com/';
	var handleResponse = __webpack_require__(2);

	var getAllFoods = function getAllFoods() {
	  fetch(url + '/api/v1/foods').then(function (response) {
	    return handleResponse(response);
	  }).then(function (foods) {
	    return renderFoods(foods);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var renderFoods = function renderFoods(foods) {
	  foods.forEach(function (food) {
	    $('#foods-table').append('\n      <tr>\n        <td>' + food.name + '</td>\n        <td>' + food.calories + '</td>\n        <td>(button placeholder)</td>\n      </tr>\n      ');
	  });
	};

	module.exports = {
	  getAllFoods: getAllFoods
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	var handleResponse = function handleResponse(response) {
	  return response.json().then(function (json) {
	    if (!response.ok) {
	      var error = {
	        status: response.status,
	        statusText: response.statusText,
	        json: json
	      };
	      return Promise.reject(error);
	    }
	    return json;
	  });
	};

	module.exports = handleResponse;

/***/ })
/******/ ]);