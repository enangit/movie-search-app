import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5001;
const API_KEY = process.env.API_KEY ? process.env.API_KEY : "";
const API_URI = process.env.API_URI ? process.env.API_URI : "";

export {
    API_KEY,
    API_URI,
    PORT
}
