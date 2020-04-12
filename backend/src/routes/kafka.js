import { Router } from 'express'

import * as kafka from '../controllers/kafka'

/*
  Create,      /
  Delete,     / An Le
  Directory  /
*/

const routes = new Router()

routes.post('/topic', kafka.createTopic)
routes.post('/producer', kafka.pushMessagToProducer)

export default routes

/*
  Create,      /
  Delete,     / An Le
  Directory  /
*/