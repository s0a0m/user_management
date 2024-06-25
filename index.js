import httpServer from '#Config/http.js'
import { connectDB, disconnectDB } from '#Config/db.js'

const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL

const boostrap = () => {
  httpServer.listen(PORT, async () => {
    await connectDB(MONGODB_URL)
    console.log(`Server listening on port ${PORT}.`)
  })

  process.on('SIGINT', async () => {
    console.log('Shutting down server and disconnecting databas...')
    server.close(() => {
      disconnectDB()
      process.exit(0)
    })
  })
}

boostrap()
