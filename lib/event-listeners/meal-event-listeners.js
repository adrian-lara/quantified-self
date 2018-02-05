const $ = require('jquery')
import {filterFoods, addFoodsToMeals, sortByCaloriesDesc, sortByCaloriesAsc, sortByCaloriesOrig} from '../response-handlers/meal-response-handlers'
import {deleteFoodFromMeal} from '../fetch-requests/meal-fetch-requests'

export function addEventListeners() {
  $('#search-foods-by-name').on('keyup', filterFoods);

  $('#add-food-to-meal-buttons').on('click', function() {
    event.preventDefault();
    addFoodsToMeals(event);
  })

  $('#meals-tables').on('click', '.delete-btns', function() {
    var foodId =  event.target.dataset.deleteBtnId
    var mealId = event.target.parentElement.parentElement.parentElement.dataset.mealId
    deleteFoodFromMeal(mealId, foodId);
  })

  $('#foods-table-meals-page').on('click','#calorie-cell', function() {
    if (event.target.dataset.sort === "default") {
      sortByCaloriesDesc(event);
      event.target.dataset.sort = "desc";
    }
    else if (event.target.dataset.sort === "desc") {
      sortByCaloriesAsc(event);
      event.target.dataset.sort = "asc";
    }
    else {
      sortByCaloriesOrig(event);
      event.target.dataset.sort = "default";
    }
  })
}
