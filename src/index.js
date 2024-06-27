import express from "express";
import cors from "cors";
import environments from "./config/environments/environments.js";
import { errorLogger, logger } from "./utils/logger/logger.js";
import publicRoutes from "./publicRoute.js";
import adminLogin from './adminLogin.js'
import { db } from "./config/dbConnection/db.js";
import { errorHandler } from "./middleware/errorHandling.js";
import MongoServices from "./shared/genericService/genericService.js";
import bodyParser from "body-parser";
const app = express();
app.use(cors());
app.use(logger);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app
  .listen(environments, () => {
    console.log(`Server started on port ${environments.port}!`);
  })
  .on("error", (err) => {
    console.log(`Error starting server running: ${err.message}`);
  });

app.use("/api/public", publicRoutes);
app.use("/api/admin", adminLogin);

// app.use(authGuard)
// app.use(roleGuard)
app.use("/api/admin", adminLogin)


app.use(errorHandler);
app.use(errorLogger);
