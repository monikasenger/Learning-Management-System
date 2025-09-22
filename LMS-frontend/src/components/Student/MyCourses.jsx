import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../../context/CourseContext";
import { useStudent } from "../../context/StudentContext";
import { BookOpen, User, Eye } from "lucide-react";

const MyCourses = () => {
  const { myCourses, fetchMyCourses, loading } = useStudent();
  const navigate = useNavigate();
  const { fetchCourseDetail } = useCourses();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-pulse text-gray-600 text-lg"> Loading courses...</p>
      </div>
    );

  const handleViewDetail = async (id) => {
    await fetchCourseDetail(id);
    navigate(`/student/courses/${id}`);
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <BookOpen className="w-6 h-6 text-purple-600" /> My Enrolled Courses
      </h2>

      {(!myCourses || myCourses.length === 0) ? (
        <p className="text-gray-500 text-lg">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800">
                <BookOpen className="w-5 h-5 text-blue-500" />
                {course.title}
              </h3>
              <p className="text-gray-600 mb-3 line-clamp-3">{course.description}</p>
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                <User className="w-4 h-4 text-gray-400" /> Instructor: {course?.instructor?.name || "N/A"}
              </p>
              <button
                onClick={() => handleViewDetail(course._id)}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 rounded-lg hover:opacity-90 transition"
              >
                <Eye className="w-4 h-4" />
                View Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
