import { Meal } from "../models/meals.js"

function newMeal(req, res) {
  console.log('clicked newMeal')
  Meal.find({}, function (err, meals) {
    res.render('meals/new', {
      title: 'Add Meal',
      meals
    })
  })
}

function create(req, res){
  console.log('clicked create meal')
  Meal.create(req.body, function(err, meal){
    res.redirect('/meals/new')
  })
}

export {
  newMeal as new,
  create
}