const postNewFood = require('../response-handlers/foods-response-handler').postNewFood
const renderNewFood = require('../response-handlers/foods-response-handler').renderNewFood

const newFoodSubmit = () => {
  $('#new-food-submit-button').on("click", (event) => {
    event.preventDefault(event)

    let name = $('#new-food-form [name=new-food-name').val()
    let calories = $('#new-food-form [name=new-food-calories').val()
    postNewFood(name, calories)
    renderNewFood(name, calories)
  })
}

module.exports = {
  newFoodSubmit
}
