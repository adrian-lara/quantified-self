import $ from 'jquery'
import {handleResponse} from '../response-handlers/initial-response-handler'
import {
  removeFood,
  renderFoods,
  renderNewFood,
  clearAlerts,
  clearNewFoodForm,
  updateSearchFilter,
} from '../response-handlers/foods-response-handlers'

const url = `https://serene-plateau-95160.herokuapp.com`


export function getAllFoods() {
  fetch(`${url}/api/v1/foods`)
    .then(response => handleResponse(response))
    .then(foods => renderFoods(foods))
    .catch(error => console.error({ error }))
}

export function deleteFoodRecord(id) {
  fetch(`${url}/api/v1/foods/${id}`, { method: 'DELETE' })
    .then(removeFood(id))
    .catch(error => console.alert(error))
}

export function postNewFood(name, calories) {
  let newFood = { food: {'name': name, 'calories': calories}}

  let postOptions = {
    method: "POST",
    body: JSON.stringify(newFood),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  fetch(`${url}/api/v1/foods`, postOptions)
    .then(response => handleResponse(response))
    .then(food => renderNewFood(food))
    .then(clearAlerts())
    .then(clearNewFoodForm())
}

export function updateFood(newValue, prop, $targetRow) {
  let foodId = $targetRow.dataset.foodId
  let foodInfo = { food: {[prop]: newValue} }

  let patchOptions = {
    method: 'PATCH',
    body: JSON.stringify(foodInfo),
    headers: {'Content-Type': 'application/json'},
  }

  fetch(`${url}/api/v1/foods/${foodId}`, patchOptions)
    .then(response => handleResponse(response))
    .then(food => updateSearchFilter(food, prop, $targetRow))
    .catch(error => console.alert(error))
}
