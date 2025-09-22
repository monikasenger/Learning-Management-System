import { useEffect } from "react";
import { useStudent } from "../../context/StudentContext";
import { BookOpen, User, Phone, Mail, CheckCircle } from "lucide-react";

const StudentDashboard = () => {
  const { profile, myCourses, assignments, fetchProfile, fetchMyCourses } =
    useStudent();

  useEffect(() => {
    fetchProfile();
    fetchMyCourses();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">
        🎓 Student Dashboard
      </h2>

      {/* Profile Card */}
      {profile && (
        <div className="mb-8 p-6 bg-white border rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <User className="w-6 h-6 text-blue-500" />
            Welcome, {profile.name}
          </h3>
          <div className="text-gray-600 space-y-1">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" /> {profile.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />{" "}
              {profile.phone || "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Enrolled Courses */}
        <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6 text-green-500" />
            Enrolled Courses
          </h3>
          <p className="text-2xl font-bold text-gray-800">{myCourses.length}</p>
        </div>

        {/* Profile Status */}
        <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <CheckCircle className="w-6 h-6 text-purple-500" />
            Profile Status
          </h3>
          <p className="text-lg font-medium text-gray-700">
            {profile ? " Active" : " Loading..."}
          </p>
        </div>

        {/* Assignments (extra card if needed) */}
        <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6 text-orange-500" />
            Assignments
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            {assignments?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
