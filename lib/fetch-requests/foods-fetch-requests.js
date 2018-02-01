const $ = require('jquery')
const url = `https://protected-basin-11627.herokuapp.com/`
import {handleResponse} from '../response-handlers/initial-response-handler'
const removeFood = require('../response-handlers/foods-response-handler').removeFood


const getAllFoods = () => {
  fetch(`${url}/api/v1/foods`)
    .then(response => handleResponse(response))
    .then(foods => renderFoods(foods))
    .catch(error => console.error({ error }))
}

function renderFoods(foods) {
  foods.forEach(food => {
    $('#foods-table').append(`
      <tr class="table-row" data-food-id="${food.id}">
        <td>
          ${food.name}
          <span hidden class="filter-target">${food.name.toLowerCase()}</span>
        </td>
        <td>${food.calories}</td>
        <td class="delete-btns">
          <img data-delete-btn-id="${food.id}" src="http://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/24/Delete-icon.png" alt="Delete Button">
        </td>
      </tr>
      `)
  })
}

function deleteFoodRecord(id) {
  fetch(`${url}/api/v1/foods/${id}`, { method: 'DELETE' })
    .then(removeFood(id))
    .catch(error => console.alert(error))
}

module.exports = {
  getAllFoods,
  deleteFoodRecord,
  renderFoods,
}
