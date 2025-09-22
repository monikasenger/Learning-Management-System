import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Layout/ProtectedRoute";

import Home from "./pages/Home";

import Login from "./components/Auth/Login";
import RegisterStudent from "./components/Auth/RegisterStudent";

// Admin Pages
import PendingCourses from "./components/Admin/PendingCourses";


// Layout
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AdminDashboard from "./components/Admin/AdminDashboard";
import InstructorDashboard from "./components/Instructor/InstructorDashboard";
import InstructorCourses from "./components/Instructor/InstructorCourses";
import StudentDashboard from "./components/Student/StudentDashboard";
import InstructorStudents from "./components/Instructor/InstructorStudents";
import Users from "./components/Admin/Users";
import InstructorCourseDetail from "./components/Instructor/InstructorCourseDetail";
import StudentProfile from "./components/Student/StudentProfile";
import MyCourses from "./components/Student/MyCourses";
import CourseDetails from "./components/Student/CourseDetails";
import Courses from "./pages/Courses";
import InstructorAssignment from "./components/Instructor/InstructorAssignment";
import AssignmentSubmissions from "./components/Instructor/AssignmentSubmissions";
import StudentAssignment from "./components/Student/StudentAssignment";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterStudent />} />
<Route path="/courses" element={<Courses />} />
              {/* Profile */}
            

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <AdminDashboard/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/pending-courses"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <PendingCourses />
                  </ProtectedRoute>
                }
              />


              {/* Instructor Routes */}
              <Route
                path="/instructor"
                element={
                  <ProtectedRoute roles={["instructor"]}>
                    <InstructorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/instructor/courses"
                element={
                  <ProtectedRoute roles={["instructor"]}>
                    <InstructorCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/instructor/courses/:id"
                element={
                  <ProtectedRoute roles={["instructor"]}>
                    <InstructorCourseDetail />
                  </ProtectedRoute>
                }
              />
              <Route
             path="/instructor/courses/:courseId/assignments"
                element={
                  <ProtectedRoute roles={["instructor"]}>
                    <InstructorAssignment />
                  </ProtectedRoute>
                }
              />
                 <Route
                path="/instructor/courses/:courseId/assignments/:assignmentId/submissions"
                element={
                  <ProtectedRoute roles={["instructor"]}>
                    <AssignmentSubmissions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/instructor/students"
                element={
                  <ProtectedRoute roles={["instructor"]}>
                  <InstructorStudents/>
                  </ProtectedRoute>
                }
              />

              {/* Student Routes */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute roles={["student"]}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
                 <Route
                path="/student/courses/:courseId/assignments"
                element={
                  <ProtectedRoute roles={["student"]}>
                    <StudentAssignment />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/student/profile"
                element={
                  <ProtectedRoute roles={["student"]}>
                    <StudentProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/courses/:id"
                element={
                  <ProtectedRoute roles={["student"]}>
                    <CourseDetails/>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/student/my-courses"
                element={
                  <ProtectedRoute roles={["student"]}>
               <MyCourses/>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
