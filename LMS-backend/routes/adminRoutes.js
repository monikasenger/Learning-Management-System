import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/rolesMiddleware.js";
import { approveCourse, createUser, deleteUser, getPendingCourses,listEnrolledStudents, listRegisteredStudents, listUsers, rejectCourse, updateUser } from "../controllers/adminController.js";


const adminRoutes = express.Router();
adminRoutes.use(authMiddleware);
adminRoutes.use(roleMiddleware(['admin']));

// user management
adminRoutes.post('/create-user', createUser);
adminRoutes.get('/users',listUsers);
adminRoutes.put('/users/:id', updateUser);
adminRoutes.delete('/users/:id', deleteUser);

// course approvals
adminRoutes.get('/pending-courses', getPendingCourses);
adminRoutes.post('/courses/:id/approve', approveCourse);
adminRoutes.post('/courses/:id/reject', rejectCourse);

// view assignments
adminRoutes.get("/students/registered", listRegisteredStudents);
adminRoutes.get("/students/enrolled", listEnrolledStudents);

export default adminRoutes;
 