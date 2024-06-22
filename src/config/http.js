import { createServer } from 'node:http'
import expressApp from '#Config/express.js'

const httpServer = createServer(expressApp)

export default httpServer
