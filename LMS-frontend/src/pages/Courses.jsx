
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, User, Search } from "lucide-react";
import { useStudent } from "../context/StudentContext";
import { useCourses } from "../context/CourseContext";
import { useAuth } from "../context/AuthContext";

const Courses = () => {
  const { token } = useAuth();
  const { courses, fetchCourses, loading } = useCourses(); 
  const { enrollCourse } = useStudent(); 
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchCourses(); 
  }, []);

  useEffect(() => {
    const results = courses.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search, courses]);

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

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-2 text-purple-700">
          <BookOpen size={32} /> Explore All Courses
        </h1>
        <p className="text-gray-600 mt-2">
          Browse all available courses and start your learning journey 🚀
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-lg mx-auto mb-8 relative">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none shadow-sm"
        />
        <Search
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      {/* Courses List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          No courses found for your search.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
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
      )}
    </div>
  );
};

export default Courses;
