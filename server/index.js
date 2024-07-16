import cors from "cors"; //for security purpose
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
// import PostRouter from "./routes/Posts.js";
import generateImageRoute from "./routes/GenerateImage.js";
import posts from "./routes/Posts.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/generateImage/", generateImageRoute);
app.use("/api/post/", posts);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});


// app.use("/api/post", PostRouter);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello Developer!",
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.error("Failed to connect to DB");
      console.error(err);
    });
};
const startServer = async () => {
  try {
    connectDB();
    app.listen(8000, () => console.log("Server is running."));
  } catch (error) {
    console.log(error);
  }
};

startServer();
