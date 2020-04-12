import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.GDT_BACKEND_PORT,
  KAFKA_HOST: process.env.KAFKA_HOST,
}
