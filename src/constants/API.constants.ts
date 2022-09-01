import { config } from 'dotenv';

config();
const { env } = process;


export const UBIDOTS = {
  API_VERSION: env.API_VERSION || 'v1.6',
  TOKEN: env.UBIDOTS_TOKEN,
  API_KEY: env.UBIDOTS_API_KEY,
};