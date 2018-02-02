const $ = require('jquery')
const url = `https://protected-basin-11627.herokuapp.com/`

const handleResponse = require('../response-handlers/initial-response-handler')

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

function removeFood(id) {
  $(`[data-food-id=${id}]`).remove()
}

const missingFoodField = (name, calories) => {
  if (name === "") $('#missing-name-alert').append("Please enter a food name")
  if (calories === "") $('#missing-calories-alert').append("Please enter a calorie amount")
}

const renderNewFood = (food) => {
  let foodInArray = [food]

  renderFoods(foodInArray)
}

function search(q) {
  if (q === "") return $('.table-row').show()

  $('.table-row').hide()
  $(`.table-row:contains('${q}')`).show()
}

module.exports = {
  renderFoods,
  removeFood,
  missingFoodField,
  renderNewFood,
  search,
}
