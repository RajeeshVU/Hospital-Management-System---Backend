import express from 'express'
import { configDotenv } from 'dotenv'; 
const app=express()
const env=configDotenv()

const port = process.env.PORT;
app.use(express.json())
app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
  })
  .on('error', (error) => {
    console.error(`Error starting server: ${error.message}`);
  });