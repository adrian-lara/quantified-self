const postNewFood = require('../response-handlers/foods-response-handler').postNewFood
const removeFood = require('../response-handlers/foods-response-handler').removeFood
const deleteFoodRecord = require('../fetch-requests/foods-fetch-requests').deleteFoodRecord

const newFoodSubmit = () => {
  $('#new-food-submit-button').on("click", (event) => {
    event.preventDefault(event)

    let name = $('#new-food-form [name=new-food-name').val()
    let calories = $('#new-food-form [name=new-food-calories').val()
    postNewFood(name, calories)
  })
}

function deleteFood() {
  $('#foods-table').on("click", ".delete-btns", (event) => {
    let id = event.target.dataset.deleteBtnId
    removeFood(id)
    deleteFoodRecord(id)
  })
}

module.exports = {
  newFoodSubmit,
  deleteFood,
}
