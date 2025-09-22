import express from "express";
import { getCourseDetail, listPublic, searchCourses } from "../controllers/coursesController.js";

const coursesRoutes = express.Router();


coursesRoutes.get('/', listPublic);
coursesRoutes.get('/:id', getCourseDetail);
coursesRoutes.get("/search",searchCourses);
export default coursesRoutes;
