const $ = require('jquery')
const url = `https://serene-plateau-95160.herokuapp.com`
import {handleResponse} from '../response-handlers/initial-response-handler'
import {renderMeals, renderFoods, reRenderMeal} from '../response-handlers/meal-response-handlers'

export function getAllMeals() {
  fetch(`${url}/api/v1/meals`)
    .then(response => handleResponse(response))
    .then(meals => renderMeals(meals))
    .catch(error => console.error({ error }))
}

export function getAllFoodsMealsPage() {
  fetch(`${url}/api/v1/foods`)
    .then(response => handleResponse(response))
    .then(foods => renderFoods(foods))
    .catch(error => console.error({ error }))
}

export function postFoodToMeals(mealId, foodId) {
  var postOptions = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
  }
  fetch(`${url}/api/v1/meals/${mealId}/foods/${foodId}`, postOptions)
  .then(response => handleResponse(response))
  .then(getFoodsForOneMeal(mealId))
  .catch(error => console.error({ error }))
}

function getFoodsForOneMeal(mealId) {
  fetch(`${url}/api/v1/meals/${mealId}/foods`)
    .then(response => handleResponse(response))
    .then(meal => reRenderMeal(meal))
    .catch(error => console.error({ error }))
}

export function deleteFoodFromMeal(mealId,foodId) {
  var deleteOptions = {
    method: "DELETE"
  }
  fetch(`${url}/api/v1/meals/${mealId}/foods/${foodId}`, deleteOptions)
  .then(response => handleResponse(response))
  .then(getFoodsForOneMeal(mealId))
  .catch(error => console.error({ error }))
}
