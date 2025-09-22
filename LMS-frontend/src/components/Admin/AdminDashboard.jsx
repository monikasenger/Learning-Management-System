
import { useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Users, UserCheck, BookOpen, FileText} from "lucide-react";

const AdminDashboard = () => {
  const { users, fetchUsers, pendingCourses, fetchPendingCourses } = useAdmin();

  useEffect(() => {
    fetchUsers();
    fetchPendingCourses();
  }, []);

  const students = users.filter((u) => u.role === "student").length;
  const instructors = users.filter((u) => u.role === "instructor").length;

  const cards = [
    { title: "Total Students", value: students, icon: <Users size={36} />, color: "bg-blue-500" },
    { title: "Total Instructors", value: instructors, icon: <UserCheck size={36} />, color: "bg-green-500" },
    { title: "Pending Courses", value: pendingCourses.length, icon: <BookOpen size={36} />, color: "bg-purple-500" },

  ];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2">
            📊 Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome Admin! Manage users, courses, and assignments from here.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`${card.color} text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:scale-105 transition-transform`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg md:text-xl font-semibold">{card.title}</h2>
                <p className="text-3xl md:text-4xl font-bold mt-2">{card.value}</p>
              </div>
              <div className="opacity-80">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default AdminDashboard;

