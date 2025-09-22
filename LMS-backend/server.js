import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/mongoodb.js";
import adminRoutes from "./routes/adminRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import coursesRoutes from "./routes/coursesRoutes.js";

connectDB(); 


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/student',studentRoutes );
app.use('/api/courses', coursesRoutes)

app.get("/", (req, res) => res.send("LMS API Running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
