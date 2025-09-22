import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/rolesMiddleware.js";
import {  enroll, getAssignments, getCourseAssignments, listCourses, myCourses, myProfile,  submitAssignment,  updateProfile } from "../controllers/studentController.js";
import upload from "../middlewares/multer.js";

const studentRoutes = express.Router();

studentRoutes.use(authMiddleware);
studentRoutes.use(roleMiddleware(['student']));

studentRoutes.get('/courses', listCourses);
studentRoutes.get('/my-courses',myCourses);
studentRoutes.post('/courses/:id/enroll', enroll);

studentRoutes.get("/me",  myProfile);
studentRoutes.put("/me",upload.single("photo"), updateProfile);
studentRoutes.post("/courses/:courseId/assignments",upload.single("file"), submitAssignment);
studentRoutes.get("/assignments", getAssignments); 
studentRoutes.get("/courses/:courseId/assignments", getCourseAssignments); 
export default studentRoutes;
