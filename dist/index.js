import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { registerRoutes } from "./routes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(bodyParser.json());
// Register all routes
const server = await registerRoutes(app);
// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
