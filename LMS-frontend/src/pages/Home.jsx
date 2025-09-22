
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, User, LogIn, GraduationCap } from "lucide-react";
import { useStudent } from "../context/StudentContext";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";

const Home = () => {
  const { token } = useAuth();
  const { courses, fetchCourses, loading } = useCourses(); //  useCourses for list
  const { enrollCourse } = useStudent(); //  useStudent only for enrollment
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses(); //  Always fetch, login required nahi hai
  }, []);

  const handleEnroll = async (courseId) => {
    if (!token) {
      alert("Please login to enroll in a course.");
      navigate("/login");
      return;
    }

    try {
      const res = await enrollCourse(courseId);
      alert(res.message || "Enrolled successfully! ");
      navigate(`/courses/${courseId}`);
    } catch (err) {
      console.error("Enrollment failed:", err);
      alert("Enrollment failed. Try again!");
    }
  };

  const displayedCourses = courses.slice(0, 20);

  return (
    <div>
      {/* Banner */}
      <div className="relative bg-gradient-to-r from-purple-700 to-pink-600 text-white py-16 px-6 md:px-12 lg:px-24 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex justify-center items-center gap-2">
            <GraduationCap size={40} className="text-yellow-300" /> Learn Smarter, Grow Faster 🚀
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-100">
            Access top quality courses, guided by expert instructors. Start your learning journey today!
          </p>
          <button
            onClick={() => {
              const section = document.getElementById("courses-section");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition"
          >
            Explore Courses
          </button>
        </div>
      </div>

      <div className="p-6 md:p-10">
        {!token && (
          <div className="mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Welcome to LMS Portal</h2>
            <p className="text-lg flex items-center justify-center gap-2">
              <LogIn size={20} /> Please login to enroll in courses
            </p>
          </div>
        )}

        <h3
          id="courses-section"
          className="text-2xl font-semibold mb-6 flex items-center gap-2"
        >
          <BookOpen size={24} className="text-purple-600" /> Available Courses
        </h3>

        {loading ? (
          <p className="text-center text-gray-500">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500">No courses available right now.</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCourses.map((c) => (
                <li
                  key={c._id}
                  className="p-5 border rounded-xl shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition-transform"
                >
                  <h4 className="font-bold text-lg mb-2 text-gray-800 flex items-center gap-2">
                    <BookOpen size={20} className="text-pink-600" /> {c.title}
                  </h4>
                  <p className="text-gray-600 mb-3 line-clamp-3">{c.description}</p>
                  <span className="block text-sm text-gray-500 mb-4 flex items-center gap-1">
                    <User size={16} /> Instructor: {c.instructor?.name || "N/A"}
                  </span>
                  <button
                    onClick={() => handleEnroll(c._id)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-md hover:opacity-90 transition"
                  >
                    Enroll Now
                  </button>
                </li>
              ))}
            </ul>

            {courses.length > 20 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => navigate("/courses")}
                  className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
                >
                  View More Courses →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
