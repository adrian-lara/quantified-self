const $ = require('jquery')
import {filterFoods, addFoodsToMeals} from '../response-handlers/meal-response-handlers'

export function addEventListeners() {
  $('#search-foods-by-name').on('keyup', filterFoods);

  $('#add-food-to-meal-buttons').on('click', function() {
    event.preventDefault();
    addFoodsToMeals(event);
  })

}
