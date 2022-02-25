import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import sequelize from './core/db'
import './models/models'
import cors from 'cors'
import router from './router/index'
import fileUpload from 'express-fileupload'
import path from 'path'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error-middleware'

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)
app.use(express.static(path.resolve(__dirname, 'static'))) //enable to send static to client
app.use(fileUpload({}))
app.use('/api', router)

//Error handler
app.use(errorMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true, benchmark: true })
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
