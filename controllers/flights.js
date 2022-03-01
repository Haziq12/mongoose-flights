import { Flight } from "../models/flights.js"

function index(req, res) {
  console.log('clicked index')
  Flight.find({}, function (error, flights) {
    res.render("flights/index", {
      error: error,
      flights: flights,
    })
  })
}

function newFlight(req, res){
  res.render('flights/new')
}

function create(req, res){
  const flight = new Flight(req.body)
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
  Flight.findById(req.params.id, function(err, flight){
    res.render('flights/show', {
      flight: flight,
      title: 'Flight Details'
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

export {
  newFlight as new,
  index,
  create,
  show,
  createTicket,
  deleteFlight as delete
}
