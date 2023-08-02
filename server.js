import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import ConnectDB from "./config/db.js";
import cors from "cors";
import bellRoute from "./routes/bellRoutes.js";
import userRoute from "./routes/userRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import examRoutes from './routes/examRoutes.js';
import registerRoutes from './routes/registerRoutes.js'
import fessRoute from './routes/fessRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import attendenceRoutes from "./routes/attendenceRoutes.js"
import notesRoutes from "./routes/notesRoutes.js"
import fileUpload from 'express-fileupload';
import douts from './routes/doutsRoutes.js'
import marksRoutes from "./routes/marksRoutes.js"
import attendenceTeacherRoutes from "./routes/attendenceTeacherRoutes.js"
import classRoutes from "./routes/ClassTimeTableRoutes.js"
// Env Config
dotenv.config();

// Dtabase Config
ConnectDB();

// Rest object
const app = express();

// Middileware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload({
  limits: { fileSize: 500 * 1024 * 1024 },
  tempFileDir: './uploads/', // Make sure this points to a valid directory
}));

// ALL Routes
app.use("/api", bellRoute);
app.use("/api", userRoute);
app.use("/api", teacherRoutes);
app.use("/api", studentRoutes);
app.use("/api", noticeRoutes) ;
app.use("/api", examRoutes);
app.use('/api', registerRoutes);
app.use('/api', fessRoute)
app.use('/api', eventRoutes)
app.use('/api', attendenceRoutes)
app.use('/api', notesRoutes)
app.use('/api', marksRoutes)
app.use('/api', attendenceTeacherRoutes)
app.use('/api', classRoutes)
app.use('/api', douts)
// APIs
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SMS App</h1>");
});

// Port
const PORT = process.env.PORT || 2000;

// Run
app.listen(PORT, () => {
  console.log(` ${process.env.MESSAGE} : ${PORT}`);
});
