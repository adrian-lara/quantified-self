const $ = require('jquery')

export function renderMeals(meals) {
  var caloriesForEveryMeal = 0
  for(var i = 0; i < meals.length; i++) {
    var totalCalories = 0
    addMealTable(meals[i]);
    for(var j = 0; j < meals[i].foods.length; j++) {
      addFoodRowsToMeal(meals[i], meals[i].foods[j]);
      totalCalories += meals[i].foods[j].calories;
    }
    caloriesForEveryMeal += totalCalories;
    addTotalCaloriesRow(meals[i],totalCalories);
    addRemainingCaloriesRow(meals[i], totalCalories);
  }
  addTotalsTable(caloriesForEveryMeal);
}

function addMealTable(meal) {
  $('#meals-tables').append(`<h2>${meal.name}</h2><table data-meal-id="${meal.id}" id="${meal.name.toLowerCase()}"><tr><th>Name</th><th>Calories</th></tr></table>`)
}

function addFoodRowsToMeal(meal,food) {
  $(`#${meal.name.toLowerCase()}`).append(`<tr data-id=${food.id}><td>${food.name}</td><td>${food.calories}</td></tr>`);
}

function addTotalCaloriesRow(meal, totalCalories) {
  $(`#${meal.name.toLowerCase()}`).append(`<tr><td>Total Calories</td><td>${totalCalories}</td></tr>`)
}

function addRemainingCaloriesRow(meal, totalCalories) {
  var allottedCalorieHash = {"snack":200, "breakfast":400, "lunch":600, "dinner":800}
  if (allottedCalorieHash[meal.name.toLowerCase()] === undefined) {
    $(`#${meal.name.toLowerCase()}`).append(`<tr><td>No Allotted Calories for ${meal.name}</td><td></td></tr>`)
  }
  else {
    var remCalorieAmnt = allottedCalorieHash[meal.name.toLowerCase()] - totalCalories
    $(`#${meal.name.toLowerCase()}`).append(`<tr><td>Remaining Calories</td><td id="${meal.name.toLowerCase()}-rem-cal">${remCalorieAmnt}</td></tr>`)
    if (remCalorieAmnt < 0) {
      $(`#${meal.name.toLowerCase()}-rem-cal`).css("color", "red");
    }
    else {
      $(`#${meal.name.toLowerCase()}-rem-cal`).css("color", "green");
    }
  }
}

function addTotalsTable(total) {
  var totalTableRemCalories = 2000 - total
  $('#meals-tables').append(`<h2>Total</h2><table><tr><td>Goal Calories</td><td>2000</td></tr><tr><td>Calories Consumed</td><td>${total}</td></tr><tr><td>Remaining Calories</td><td>${totalTableRemCalories}</td></tr></table>`)
}
