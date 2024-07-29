import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  API_HOST: str(),
  API_KEY: str(),
  MONGO_URL: str(),
})

export default env