const $ = require('jquery')

export function renderMeals(meals) {
  for(var i = 0; i < meals.length; i++) {
    addMealTable(meals[i]);
      for(var j = 0; j < meals[i].foods.length; j++) {
        addFoodRowsToMeal(meals[i], meals[i].foods[j]);
      }
  }
}

export function addMealTable(meal) {
  $('#meals-tables').append(`<table id="${meal.name.toLowerCase()}"><tr><th>${meal.name}</th><th>Calories</th></tr></table>`)
}

export function addFoodRowsToMeal(meal,food) {
  $(`#${meal.name.toLowerCase()}`).append(`<tr data-id=><td>${food.name}</td><td>${food.calories}</td></tr>`);
}
