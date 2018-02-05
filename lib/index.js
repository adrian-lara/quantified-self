import $ from 'jquery'

import {getAllFoods} from './fetch-requests/foods-fetch-requests'
import {foodListeners} from './event-listeners/foods-event-listeners'

const mealFetchRequests = require('./fetch-requests/meal-fetch-requests')
const mealEventListeners = require('./event-listeners/meal-event-listeners')

$(document).ready( () => {
  getAllFoods()
  foodListeners()
  mealFetchRequests.getAllMeals()
  mealFetchRequests.getAllFoodsMealsPage()
  mealEventListeners.addEventListeners()
})
