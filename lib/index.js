const $ = require('jquery')
require('./styles.scss')
const foodFetches = require('./fetch-requests/foods-fetch-requests')
const foodListeners = require ('./event-listeners/foods-event-listeners')
const mealFetchRequests = require('./fetch-requests/meal-fetch-requests')

$(document).ready( () => {
  foodFetches.getAllFoods()
  foodListeners.newFoodSubmit()
  foodListeners.deleteFood()
  mealFetchRequests.getAllMeals()
  mealFetchRequests.getAllFoodsMealsPage()
})
