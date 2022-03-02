import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()


router.get('/new', flightsCtrl.new)
router.get('/:id', flightsCtrl.show)
router.get('/', flightsCtrl.index)



router.post('/', flightsCtrl.create)
router.post('/:id/tickets', flightsCtrl.createTicket)

router.delete('/:id', flightsCtrl.delete)

router.post("/:id/meals", flightsCtrl.addToMeal)

export {
  router
}
