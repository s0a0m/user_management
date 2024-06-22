import httpServer from '#Config/http.js'
import connectDB from '#Config/db.js'

const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL

const boostrap = () => {
  httpServer.listen(PORT, async () => {
    await connectDB(MONGODB_URL)
    console.log(`Server listening on port ${PORT}.`)
  })
}

boostrap()
