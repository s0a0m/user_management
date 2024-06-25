import mongoose from 'mongoose'

const connectDB = (url) =>
  mongoose
    .connect(url)
    .then(() => console.log('Database connected.'))
    .catch((error) => {
      console.error('Database connection error:', error)
      process.exit(1)
    })

const disconnectDB = () => {
  mongoose.disconnect(() => {
    console.log('Database disconnected.')
  })
}

export { connectDB, disconnectDB }
