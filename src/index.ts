import "dotenv/config";

import express from "express";
import { handleAuth } from "./routes/handleAuth";
import { handleCallback } from "./routes/handleCallback";

const port = process.env.SERVER_PORT || 3000;
const app = express();

app.router.get("/auth", handleAuth);
app.router.get("/callback", handleCallback);

app.listen(port, () => console.log(`Sveltia Authenticator listening on port ${port}.`))