const $ = require('jquery')
import {filterFoods, addFoodsToMeals} from '../response-handlers/meal-response-handlers'
import {deleteFoodFromMeal} from '../fetch-requests/meal-fetch-requests'

export function addEventListeners() {
  $('#search-foods-by-name').on('keyup', filterFoods);

  $('#add-food-to-meal-buttons').on('click', function() {
    event.preventDefault();
    addFoodsToMeals(event);
  })

  $('#meals-tables').on('click', function(event) {
    event.preventDefault();
    var foodId =  event.target.dataset.deleteBtnId
    var mealId = event.target.parentElement.parentElement.parentElement.dataset.mealId
    deleteFoodFromMeal(mealId, foodId);
  })

}
