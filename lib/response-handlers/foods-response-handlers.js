import $ from 'jquery'
import {handleResponse} from '../response-handlers/initial-response-handler'

export function renderFoods(foods) {
  foods.forEach(food => {
    $('#foods-table-header').after(`
      <tr class="table-row" data-food-id="${food.id}">
        <td class="food-table-cell" contenteditable="true">
          <span class="food-table-content name">${food.name}</span>
        </td>
        <td class="food-table-cell" contenteditable="true">
          <span class="food-table-content calories">${food.calories}</span>
        </td>
        <td class="delete-btns">
          <img data-delete-btn-id="${food.id}" src="http://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/24/Delete-icon.png" alt="Delete Button">
        </td>
        <td hidden><span class="filter-target">${food.name.toLowerCase()}</span></td>
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

export function updateSearchFilter(food, prop, $targetRow) {
  if (prop === "name") {
    let $hiddenFilterField = $targetRow.children[3].firstChild
    $hiddenFilterField.replaceWith(
      `<span class="filter-target">${food[prop].toLowerCase()}</span>`
    )
  }
}
