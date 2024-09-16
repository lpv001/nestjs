import * as dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET: string= process.env.JWT_SECRET || "yourfavorithboyfriend"
const JWT_EXPIRES: string= process.env.JWT_EXPIRES || "1h"

export {
    JWT_SECRET,
    JWT_EXPIRES
}