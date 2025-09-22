
import { useEffect } from "react";
import { useInstructor } from "../../context/InstructorContext";
import InstructorCourses from "./InstructorCourses";
import { Book, Layers, FileText, Users } from "lucide-react";

const InstructorDashboard = () => {
  const { 
    courses, 
    fetchMyCourses, 
    modules, 
    lessons, 
    students, 
    fetchEnrolledStudents 
  } = useInstructor();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  useEffect(() => {
    courses.forEach(c => fetchEnrolledStudents(c._id));
  }, [courses]);

  const totalModules = modules.length;
 
  const totalStudents = students.length;

  const stats = [
    { title: "Total Courses", value: courses.length, icon: <Book size={28} />, color: "bg-blue-500" },
    { title: "Enrolled Students", value: totalStudents, icon: <Users size={28} />, color: "bg-yellow-500" },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        🏫 Instructor Dashboard
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className={`${s.color} text-white p-4 rounded-xl shadow-lg flex justify-between items-center transition transform hover:scale-105`}
          >
            <div>
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
            <div>{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Courses Component */}
      <InstructorCourses />
    </div>
  );
};

export default InstructorDashboard;
