import { config } from "dotenv";

config();
const env = process.env;

const environments = {
  port: env.PORT || 4000,
  timeZone:env.TIME_ZONE,
  mongoUrl:env.DATABASE_URL,
  secretKey:env.SECRET_KEY,
  refreshKey:env.SECRET_REFRESH_KEY
};

export default environments;
