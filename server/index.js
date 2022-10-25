import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import postingsRoutes from "./routes/postings.js";

dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "30MB", extended: true }));
app.use(express.urlencoded({ limit: "30MB", extended: true }));
app.use("/postings", postingsRoutes);

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
