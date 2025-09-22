import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/rolesMiddleware.js";
import {
  addLesson,
  addModule,
  createCourse,
  deleteCourse,
  getEnrolledStudents,
  getMyCourses,
  updateCourse,
  updateModule,
  deleteModule,
  getModules,
  getLessons,
  myProfile,
  updateProfile,
  createAssignment,
  gradeSubmission,
  getAssignmentsByCourse,
  getSubmissionsByAssignment,
} from "../controllers/instructorController.js";
import upload from "../middlewares/multer.js";

const instructorRoutes = express.Router();

instructorRoutes.use(authMiddleware);
instructorRoutes.use(roleMiddleware(["instructor"]));

// ---------- Courses ----------
instructorRoutes.post("/courses", createCourse);
instructorRoutes.put("/courses/:id", updateCourse);
instructorRoutes.delete("/courses/:id", deleteCourse);

// My courses
instructorRoutes.get("/my-courses", getMyCourses);

// ---------- Modules ----------
instructorRoutes.post("/courses/:id/modules", addModule);
instructorRoutes.get("/courses/:id/modules", getModules);
instructorRoutes.put("/modules/:id", updateModule);
instructorRoutes.delete("/modules/:id", deleteModule);

// ---------- Lessons ----------
instructorRoutes.post("/modules/:id/lessons",upload.single("file"), addLesson);
instructorRoutes.get("/modules/:id/lessons",getLessons)

// ---------- Enrolled Students ----------
instructorRoutes.get("/courses/:id/students", getEnrolledStudents);

// ---------- Assignments ----------
instructorRoutes.post("/courses/:courseId/assignments", createAssignment);
instructorRoutes.get("/courses/:courseId/assignments", getAssignmentsByCourse);
instructorRoutes.put("/assignments/:assignmentId/grade/:studentId", gradeSubmission);
instructorRoutes.get("/assignments/:assignmentId/submissions", getSubmissionsByAssignment);



instructorRoutes.get("/me", myProfile);
instructorRoutes.put("/me",upload.single("photo"), updateProfile);
export default instructorRoutes;
