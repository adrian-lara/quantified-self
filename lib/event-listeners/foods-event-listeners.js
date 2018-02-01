const postNewFood = require('../response-handlers/foods-response-handler').postNewFood
const removeFood = require('../response-handlers/foods-response-handler').removeFood
const deleteFoodRecord = require('../fetch-requests/foods-fetch-requests').deleteFoodRecord
const missingFoodField = require('../response-handlers/foods-response-handler').missingFoodField
const renderNewFood = require('../response-handlers/foods-response-handler').renderNewFood

const newFoodSubmit = () => {
  $('#new-food-submit-button').on("click", (event) => {
    event.preventDefault(event)

    let name = $('#new-food-form [name=new-food-name').val()
    let calories = $('#new-food-form [name=new-food-calories').val()

    if (name === "") return missingFoodField(name)

    postNewFood(name, calories)
    renderNewFood(name, calories)
  })
}

function deleteFood() {
  $('#foods-table').on("click", ".delete-btns", (event) => {
    let id = event.target.dataset.deleteBtnId
    deleteFoodRecord(id)
    removeFood(id)
  })
}

module.exports = {
  newFoodSubmit,
  deleteFood,
}
