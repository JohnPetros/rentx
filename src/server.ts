import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerConfig from './swagger.json'

import 'reflect-metadata'
import './database'
import './shared/container'

import { router } from './routes'

const app = express()

app.use(express.json())

app.use(router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.listen(3333, () => console.log('Server is Running!'))
