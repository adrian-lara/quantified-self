const url = `https://protected-basin-11627.herokuapp.com/`

const handleResponse = require('../response-handlers/initial-response-handler')

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

module.exports = {
  postNewFood,
  removeFood,
}
