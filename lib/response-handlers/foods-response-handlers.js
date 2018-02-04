import $ from 'jquery'
import {handleResponse} from '../response-handlers/initial-response-handler'

export function renderFoods(foods) {
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

export function removeFood(id) {
  $(`[data-food-id=${id}]`).remove()
}

export function missingFoodField(name, calories) {
  if (name === "") {
    $('#missing-name-alert').empty().append("Please enter a food name")
  } else {
    $('#missing-name-alert').empty()
  }

  if (calories === "") {
    $('#missing-calories-alert').empty().append("Please enter a calorie amount")
  } else {
    $('#missing-calories-alert').empty()
  }
}

export function renderNewFood(food) {
  let foodInArray = [food]

  renderFoods(foodInArray)
}

export function search(q) {
  if (q === "") return $('.table-row').show()

  $('.table-row').hide()
  $(`.table-row:contains('${q}')`).show()
}

export function clearAlerts() {
  $(".alerts").empty()
}

export function clearNewFoodForm() {
  $('#new-food-form [type=text]').val('')
}
