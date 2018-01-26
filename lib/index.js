const foodFetches = require('./fetch-requests/foods-fetch-requests')

$(document).ready( () => {
  foodFetches.getAllFoods()
})
