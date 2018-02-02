import $ from 'jquery'
import {handleResponse} from '../response-handlers/initial-response-handler'
import {
  removeFood,
  renderFoods,
  renderNewFood,
  clearAlerts,
  clearNewFoodForm
} from '../response-handlers/foods-response-handler'

const url = `https://protected-basin-11627.herokuapp.com/`


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
