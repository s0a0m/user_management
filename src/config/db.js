import mongoose from 'mongoose'

const connectDB = (url) =>
  mongoose
    .connect(url)
    .then(() => console.log('Database connected.'))
    .catch((error) => {
      console.error('Database connection error:', error)
      process.exit(1)
    })

export default connectDB
