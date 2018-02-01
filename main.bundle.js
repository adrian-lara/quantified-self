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
	var foodListeners = __webpack_require__(4);

	$(document).ready(function () {
	  foodFetches.getAllFoods();
	  foodListeners.newFoodSubmit();
	  foodListeners.deleteFood();
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var url = 'https://protected-basin-11627.herokuapp.com';
	var handleResponse = __webpack_require__(2);
	var removeFood = __webpack_require__(3).removeFood;

	var getAllFoods = function getAllFoods() {
	  fetch(url + '/api/v1/foods').then(function (response) {
	    return handleResponse(response);
	  }).then(function (foods) {
	    return renderFoods(foods);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	function renderFoods(foods) {
	  foods.forEach(function (food) {
	    $('#foods-table').append('\n      <tr data-food-id="' + food.id + '">\n        <td>' + food.name + '</td>\n        <td>' + food.calories + '</td>\n        <td class="delete-btns">\n          <img data-delete-btn-id="' + food.id + '" src="http://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/24/Delete-icon.png" alt="Delete Button">\n        </td>\n      </tr>\n      ');
	  });
	}

	function deleteFoodRecord(id) {
	  fetch(url + '/api/v1/foods/' + id, { method: 'DELETE' }).then(removeFood(id)).catch(function (error) {
	    return console.alert(error);
	  });
	}

	module.exports = {
	  getAllFoods: getAllFoods,
	  deleteFoodRecord: deleteFoodRecord,
	  renderFoods: renderFoods
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var url = 'https://protected-basin-11627.herokuapp.com/';

	var handleResponse = __webpack_require__(2);
	var renderFoods = __webpack_require__(1).renderFoods;

	var postNewFood = function postNewFood(name, calories) {
	  var newFood = { food: { 'name': name, 'calories': calories } };

	  var postOptions = {
	    method: "POST",
	    body: JSON.stringify(newFood),
	    headers: { 'Content-Type': 'application/json' }
	  };
	  fetch(url + '/api/v1/foods', postOptions).then(function (response) {
	    return handleResponse(response);
	  });
	};

	function removeFood(id) {
	  $('[data-food-id=' + id + ']').remove();
	}

	var missingFoodField = function missingFoodField(name) {
	  if (name === "") $('#missing-name-alert').append("Please enter a food name");
	};

	var renderNewFood = function renderNewFood(name, calories) {
	  var foodInArray = [{ "name": name, "calories": calories }];

	  renderFoods(foodInArray);
	};

	module.exports = {
	  postNewFood: postNewFood,
	  removeFood: removeFood,
	  missingFoodField: missingFoodField,
	  renderNewFood: renderNewFood
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var postNewFood = __webpack_require__(3).postNewFood;
	var missingFoodField = __webpack_require__(3).missingFoodField;
	var renderNewFood = __webpack_require__(3).renderNewFood;
	var deleteFoodRecord = __webpack_require__(1).deleteFoodRecord;

	var newFoodSubmit = function newFoodSubmit() {
	  $('#new-food-submit-button').on("click", function (event) {
	    event.preventDefault(event);

	    var name = $('#new-food-form [name=new-food-name').val();
	    var calories = $('#new-food-form [name=new-food-calories').val();

	    if (name === "") return missingFoodField(name);

	    postNewFood(name, calories);
	    renderNewFood(name, calories);
	  });
	};

	function deleteFood() {
	  $('#foods-table').on("click", ".delete-btns", function (event) {
	    var id = event.target.dataset.deleteBtnId;
	    deleteFoodRecord(id);
	  });
	}

	module.exports = {
	  newFoodSubmit: newFoodSubmit,
	  deleteFood: deleteFood
	};

/***/ })
/******/ ]);