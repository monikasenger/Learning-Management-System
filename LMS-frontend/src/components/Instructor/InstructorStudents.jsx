import React, { useEffect, useState } from "react";
import { useInstructor } from "../../context/InstructorContext";
import { User, Mail, Smartphone } from "lucide-react";

const InstructorStudent = ({ courseId }) => {
  const { fetchEnrolledStudents, students, loading, error } = useInstructor();
  const [localStudents, setLocalStudents] = useState([]);

  useEffect(() => {
    if (courseId) fetchEnrolledStudents(courseId);
  }, [courseId]);

  useEffect(() => {
    setLocalStudents(students);
  }, [students]);

  if (loading) return <p className="text-gray-500">Loading students...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <User size={28} /> Enrolled Students
      </h2>

      {localStudents.length === 0 ? (
        <p className="text-gray-500">No students enrolled yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-3 text-left">
                  <div className="flex items-center gap-2">
                    <User size={18} /> Name
                  </div>
                </th>
                <th className="border p-3 text-left">
                  <div className="flex items-center gap-2">
                    <Mail size={18} /> Email
                  </div>
                </th>
                <th className="border p-3 text-left">
                  <div className="flex items-center gap-2">
                    <Smartphone size={18} /> Phone
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {localStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50 align-top">
                  <td className="border p-3">{student.name}</td>
                  <td className="border p-3">{student.email}</td>
                  <td className="border p-3">{student.phone || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InstructorStudent;
