import * as dotenv from 'dotenv';

dotenv.config();

export const user = process.env.DB_USER;
export const password = process.env.DB_PASSWORD;
export const db = process.env.DB_NAME;
export const port = process.env.PORT || 3333;
