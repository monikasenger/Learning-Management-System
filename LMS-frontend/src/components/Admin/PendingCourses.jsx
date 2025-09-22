
import { useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { CheckCircle, XCircle, BookOpen, User } from "lucide-react";

const PendingCourses = () => {
  const { pendingCourses, fetchPendingCourses, approveCourse, rejectCourse } = useAdmin();

  useEffect(() => {
    fetchPendingCourses();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        📝 Pending Courses
      </h2>

      {pendingCourses.length === 0 ? (
        <p className="text-gray-500 text-lg">No pending courses.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingCourses.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div>
                <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                  <BookOpen size={22} /> {c.title}
                </h3>
                <p className="mt-2 text-gray-600">{c.description}</p>
                <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                  <User size={16} /> {c.instructor?.name} ({c.instructor?.email})
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => approveCourse(c._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  <CheckCircle size={18} /> Approve
                </button>
                <button
                  onClick={() => rejectCourse(c._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  <XCircle size={18} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingCourses;
