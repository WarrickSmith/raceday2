import { Elysia } from 'elysia'
import { raceMeetingController } from '../controllers/raceMeetingController'

const raceMeetingRoutes = new Elysia({ prefix: '/race-meetings' })

raceMeetingRoutes
  .get('/fetch', raceMeetingController.fetchAndStoreRaceMeetings)
  .get('/', raceMeetingController.getAllRaceMeetings)
  .get('/:id', raceMeetingController.getRaceMeetingById)
  .post('/', raceMeetingController.createRaceMeeting)
  .put('/:id', raceMeetingController.updateRaceMeeting)
  .delete('/:id', raceMeetingController.deleteRaceMeeting)

export default raceMeetingRoutes
