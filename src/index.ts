import cluster from 'cluster'
import cors from 'cors'
import { forkChildren } from 'edge-server-tools'
import express from 'express'
import http from 'http'

import { config } from './config'

// call the packages we need
const app = express()
app.use(cors())
app.use('/', express.static('dist'))

const mylog = console.log

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

router.use(function (req, res, next) {
  mylog('Something is happening.')
  next() // make sure we go to the next routes and don't stop here
})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /v1
app.use('/v1', router)

// ---------------------------------------------------------------------
// INITIALIZATION
// ---------------------------------------------------------------------

async function main(): Promise<void> {
  const { httpPort, httpHost } = config
  if (cluster.isPrimary) {
    forkChildren()
  } else {
    // Start the HTTP server:
    const httpServer = http.createServer(app)
    httpServer.listen(httpPort, `${httpHost}`)
    mylog(`Server cluster node listening on port ${httpPort}`)
  }
}

main().catch(e => mylog(e))
