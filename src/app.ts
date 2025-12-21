import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();



app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routes

// routes declaration
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the  Elib apis" });
});


export { app };







