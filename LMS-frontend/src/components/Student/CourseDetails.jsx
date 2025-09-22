import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Layers, PlayCircle, User } from "lucide-react";
import { useCourses } from "../../context/CourseContext";

const CourseDetails = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { courseDetail, fetchCourseDetail, loading } = useCourses();

  useEffect(() => {
    if (courseId) {
      fetchCourseDetail(courseId);
    }
  }, [courseId]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-pulse text-gray-600"> Loading course...</p>
      </div>
    );

  if (!courseDetail)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-semibold"> Course not found</p>
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Course Header */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-500" />
          {courseDetail.title}
        </h2>
        <p className="text-gray-600 mb-3">{courseDetail.description}</p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          Instructor: {courseDetail?.instructor?.name || "Unknown"}
        </p>
      </div>

      {/* Modules Section */}
      <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
        <Layers className="w-6 h-6 text-green-600" />
        Modules & Lessons
      </h3>
      {courseDetail.modules?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courseDetail.modules.map((module) => (
            <div
              key={module._id}
              className="bg-white border rounded-xl shadow-md p-5 hover:shadow-xl transition"
            >
              <h4 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-500" />
                {module.title}
              </h4>
              {module.lessons?.length > 0 ? (
                <ul className="space-y-2 mb-4">
                  {module.lessons.map((lesson) => (
                    <li
                      key={lesson._id}
                      className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      <PlayCircle className="w-4 h-4 text-blue-500" />
                      {lesson.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm italic mb-4">
                  No lessons available.
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No modules available</p>
      )}

      {/* View Assignments Button */}
      <div className="mt-6 mb-4">
        <button
          onClick={() => navigate(`/student/courses/${courseId}/assignments`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          View Assignments
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
