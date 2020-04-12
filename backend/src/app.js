import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'

import logger from './utils/logger'
import configs from './configs'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
  app.use('/docs', express.static(path.join(__dirname, '../docs/')))
}

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use(express.static('public'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, x-access-token')
  res.setHeader('Content-Type', 'application/json')
  next()
})

// parse Content-Type: application/json
app.use(bodyParser.json())

app.use(cookieParser())

// parse Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./routes').default)

app.listen(configs.PORT, () => logger.info(`> Ready on port ${configs.PORT}`))

// keep server running
process.on('uncaughtException', err => logger.error('uncaughtException: ' + err))
process.on('unhandledRejection', err => logger.error('unhandledRejection: ' + err))
