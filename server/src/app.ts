import express from "express";
import cors from "cors";
import type { Express } from "express-serve-static-core";
const app: Express = express();

import { PORT } from "./config/config.js";
import router from "./routes/routes.js";

app.use(cors());
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
