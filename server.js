import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import 'dotenv/config'
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
  origin: true
}
app.get('/', (req, res) => {
  res.send('Api is working')

})
// _____________________databaseconnection
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log("Connected to Database")).catch(console.error)


// _________middleware__________
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoute) ///domain api register
app.use('/api/v1/users', userRoute) ///domain api register
app.use('/api/v1/auth', authRoute) ///domain api register
app.use('/api/v1/doctors', doctorRoute) ///domain api register
app.use('/api/v1/review', reviewRoute) ///domain api register
app.use('/api/v1/users', userRoute)///domain api register

app.listen(port, () => {
  // connectDB();
  console.log('Server is running on port ' + port)

})


