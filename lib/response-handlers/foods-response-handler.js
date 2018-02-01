const $ = require('jquery')
const url = `https://protected-basin-11627.herokuapp.com/`

const handleResponse = require('../response-handlers/initial-response-handler')
const renderFoods = require('../fetch-requests/foods-fetch-requests').renderFoods

const postNewFood = (name, calories) => {
  let newFood = { food: {'name': name, 'calories': calories}}

  let postOptions = {
    method: "POST",
    body: JSON.stringify(newFood),
    headers: {'Content-Type': 'application/json'},
  }
  fetch(`${url}/api/v1/foods`, postOptions)
  .then(response => handleResponse(response))
}

function removeFood(id) {
  $(`[data-food-id=${id}]`).remove()
}

const missingFoodField = (name, calories) => {
  if (name === "") $('#missing-name-alert').append("Please enter a food name")
  if (calories === "") $('#missing-calories-alert').append("Please enter a calorie amount")
}

const renderNewFood = (name, calories) => {
  let foodInArray = [{ "name": name, "calories": calories }]

  renderFoods(foodInArray)
}

module.exports = {
  postNewFood,
  removeFood,
  missingFoodField,
  renderNewFood,
}
