const $ = require('jquery')
const postNewFood = require('../fetch-requests/foods-fetch-requests').postNewFood
const missingFoodField = require('../response-handlers/foods-response-handler').missingFoodField
const deleteFoodRecord = require('../fetch-requests/foods-fetch-requests').deleteFoodRecord
const search = require('../response-handlers/foods-response-handler').search


const newFoodSubmit = () => {
  $('#new-food-submit-button').on("click", (event) => {
    event.preventDefault(event)

    let name = $('#new-food-form [name=new-food-name').val()
    let calories = $('#new-food-form [name=new-food-calories').val()

    if (name === "" || calories === "") return missingFoodField(name, calories)

    postNewFood(name, calories)
  })
}

function deleteFood() {
  $('#foods-table').on("click", ".delete-btns", (event) => {
    let id = event.target.dataset.deleteBtnId
    deleteFoodRecord(id)
  })
}

function filterFood() {
  $('.filter-form [name=filter-form-value]').on("keyup", function() {
    let q = $('.filter-form [name=filter-form-value]').val()
    search(q)
  })
}

module.exports = {
  newFoodSubmit,
  deleteFood,
  filterFood,
}
