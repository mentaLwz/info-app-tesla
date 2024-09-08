import { cleanEnv, str } from "envalid";

const serverEnv = cleanEnv(process.env, {
  API_BASE_URL: str(),
})

export const publicEnv = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || serverEnv.API_BASE_URL,
};

export default serverEnv