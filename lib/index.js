const foodFetches = require('./fetch-requests/foods-fetch-requests')
const foodListeners = require ('./event-listeners/foods-event-listeners')
const mealEventListeners = require('./event_listeners/meal-event-listeners')

$(document).ready( () => {
  foodFetches.getAllFoods()
  foodListeners.newFoodSubmit()
  mealEventListeners.eventListenerFunction()
})
