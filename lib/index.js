const foodFetches = require('./fetch-requests/foods-fetch-requests')
const foodListeners = require ('./event-listeners/foods-event-listeners')
const mealEventListeners = require('./event_listeners/meal-event-listeners')
const meatFetchRequests = require('../fetch-requests/meal-fetch-requests')

$(document).ready( () => {
  foodFetches.getAllFoods()
  foodListeners.newFoodSubmit()
  mealFetchRequests.getAllMeals()
})
