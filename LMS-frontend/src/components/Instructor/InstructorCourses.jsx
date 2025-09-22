
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInstructor } from "../../context/InstructorContext";
import { PlusCircle, Eye, Edit2, Trash2, FileText } from "lucide-react";

const InstructorCourses = () => {
  const { courses, deleteCourse, createCourse, fetchMyCourses, loading } = useInstructor();
  const [showForm, setShowForm] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", description: "", price: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse(newCourse);
      setNewCourse({ title: "", description: "", price: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header + Add Button */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <PlusCircle size={24} /> My Courses
        </h2>
        <button
          className={`px-4 py-2 rounded-lg text-white transition ${
            showForm ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Course"}
        </button>
      </div>

      {/* Add Course Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-4 rounded-lg mb-6 space-y-3"
        >
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            className="w-full border p-2 rounded focus:outline-blue-500"
            required
          />
          <textarea
            placeholder="Course Description"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            className="w-full border p-2 rounded focus:outline-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newCourse.price}
            onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
            className="w-full border p-2 rounded focus:outline-blue-500"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusCircle size={18} /> Save
          </button>
        </form>
      )}

      {/* Courses Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left border">Title</th>
              <th className="p-3 text-left border">Description</th>
              <th className="p-3 text-center border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500">
                  Loading courses...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500">
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border">{course.title}</td>
                  <td className="p-3 border">{course.description}</td>
                  <td className="p-3 border flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => navigate(`/instructor/courses/${course._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Eye size={16} /> View
                    </button>
                    <button
                      onClick={() => alert("Edit feature coming soon!")}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                    {/* Assignments Button */}
                    <button
                      onClick={() => navigate(`/instructor/courses/${course._id}/assignments`)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FileText size={16} /> Assignments
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorCourses;
