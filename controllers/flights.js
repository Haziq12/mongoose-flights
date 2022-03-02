import { Flight } from "../models/flights.js"
import { Meal } from "../models/meals.js"

function index(req, res) {
  console.log('clicked index')
  Flight.find({}, function (error, flights) {
    res.render("flights/index", {
      error: error,
      flights: flights,
      title: 'All Flights'
    })
  })
}

function newFlight(req, res){
  res.render('flights/new', {
    title: 'Add Flight'
  })
  
}

function create(req, res){
  const flight = new Flight(req.body)
  for (value in req.body.date){
    
  }
  for(let key in req.body){
    if(req.body[key]==='') delete req.body[key]
  }
  console.log('after', req.body)
  flight.save(function(err){
    if(err) return res.redirect('/flights/new')
    res.redirect('/flights/')
  })
}

function show(req, res){
  Flight.findById(req.params.id)
  .populate('meals')
  .exec(function(err, flight){
    Meal.find({_id: {$nin: flight.meals}}, function(err, meals){
      res.render('flights/show', {
        flight: flight,
        title: 'Flight Details',
        meals
      })
    })
  })
}

function createTicket(req, res){
  Flight.findById(req.params.id, function(err, flight){
    flight.tickets.push(req.body)
    flight.save(function(err){
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteFlight(req, res){
  Flight.findByIdAndDelete(req.params.id, function(err, flight){
    res.redirect('/flights')
  })
}

function addToMeal(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    flight.meals.push(req.body.mealId)
    flight.save(function (err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlight as new,
  index,
  create,
  show,
  createTicket,
  deleteFlight as delete,
  addToMeal
}
