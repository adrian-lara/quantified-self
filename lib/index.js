const foodFetches = require('./fetch-requests/foods-fetch-requests')
const foodListeners = require ('./event-listeners/foods-event-listeners')

$(document).ready( () => {
  foodFetches.getAllFoods()
  foodListeners.newFoodSubmit()
})
