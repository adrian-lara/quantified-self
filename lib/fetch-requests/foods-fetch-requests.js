const $ = require('jquery')
const url = `https://protected-basin-11627.herokuapp.com/`
import {handleResponse} from '../response-handlers/initial-response-handler'
const removeFood = require('../response-handlers/foods-response-handler').removeFood
const renderFoods = require('../response-handlers/foods-response-handler').renderFoods
const renderNewFood = require('../response-handlers/foods-response-handler').renderNewFood

const getAllFoods = () => {
  fetch(`${url}/api/v1/foods`)
    .then(response => handleResponse(response))
    .then(foods => renderFoods(foods))
    .catch(error => console.error({ error }))
}

function deleteFoodRecord(id) {
  fetch(`${url}/api/v1/foods/${id}`, { method: 'DELETE' })
    .then(removeFood(id))
    .catch(error => console.alert(error))
}

function postNewFood(name, calories) {
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
}

module.exports = {
  getAllFoods,
  deleteFoodRecord,
  renderFoods,
  postNewFood,
}
