import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import connectDB from "./server/config/db.js";
import dotenv from "dotenv";
import postsRoutes from "./server/routes/postRoutes.js";

dotenv.config();

connectDB();

const app = express();

// app.get("/", (req, res) => {
//   res.send("API is running!");
// });

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

app.use("/api/posts", postsRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running!");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
