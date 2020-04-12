import { Router } from 'express'
import kafka from './kafka'

/*
  Create,      /
  Delete,     / An Le
  Directory  /
*/

const routes = Router()

routes.get('/', (req, res) => res.status(200).json('API'))
routes.use('/kafka', kafka)

routes.use((err, req, res, next) => {
  if (err.name !== 'HttpError' || !err.errorCode) return next(err)
  res.status(err.errorCode).json({ message: err.message })
})

export default routes

/*
  Create,      /
  Delete,     / An Le
  Directory  /
*/