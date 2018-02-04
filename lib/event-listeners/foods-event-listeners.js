import $ from 'jquery'
import {postNewFood, deleteFoodRecord} from '../fetch-requests/foods-fetch-requests'
import {search, missingFoodField} from '../response-handlers/foods-response-handlers'

export function foodListeners() {
  $('#new-food-submit-button').on("click", (event) => {
    event.preventDefault(event)

    let name = $('#new-food-form [name=new-food-name').val()
    let calories = $('#new-food-form [name=new-food-calories').val()

    if (name === "" || calories === "") return missingFoodField(name, calories)

    postNewFood(name, calories)
  })

  $('#foods-table').on("click", ".delete-btns", (event) => {
    let id = event.target.dataset.deleteBtnId
    deleteFoodRecord(id)
  })

  $('.filter-form [name=filter-form-value]').on("keyup", () => {
    let q = $('.filter-form [name=filter-form-value]').val()
    search(q)
  })
}
