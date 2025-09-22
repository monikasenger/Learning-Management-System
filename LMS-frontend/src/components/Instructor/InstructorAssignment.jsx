
import React, { useEffect, useState } from "react";
import {useNavigate ,useParams } from "react-router-dom";
import { useInstructor } from "../../context/InstructorContext";
import { FileText, PlusCircle, Eye } from "lucide-react";
import AssignmentSubmissions from "./AssignmentSubmissions";

const InstructorAssignment = () => {
  const navigate= useNavigate();
  const { courseId } = useParams();
  const {
    modules,
    students,
    assignments,
    fetchModules,
    fetchEnrolledStudents,
    createAssignment,
    fetchAssignmentsByCourse,
    loading,
    error,
  } = useInstructor();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    fetchModules(courseId);
    fetchEnrolledStudents(courseId);
    fetchAssignmentsByCourse(courseId);
  }, [courseId]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !selectedModule || !dueDate) return alert("All fields required");
    try {
      await createAssignment(courseId, { title, description, moduleId: selectedModule, dueDate });
      setTitle(""); setDescription(""); setSelectedModule(""); setDueDate("");
      fetchAssignmentsByCourse(courseId);
    } catch (err) { console.error(err); }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FileText size={28} /> Assignments
      </h2>

      {/* Create Assignment Form */}
      <form onSubmit={handleCreate} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <PlusCircle size={18} /> Create New Assignment
        </h3>
        <select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)} className="border p-2 rounded w-full mb-2" required>
          <option value="">Select Module</option>
          {modules.map((mod) => (<option key={mod._id} value={mod._id}>{mod.title}</option>))}
        </select>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded w-full mb-2" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded w-full mb-2" />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border p-2 rounded w-full mb-2" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Assignment</button>
      </form>

      {/* Assignments List */}
      {assignments.length === 0 ? <p>No assignments yet</p> :
        <div className="space-y-4">
          {assignments.map(a => (
            <div key={a._id} className="p-3 border rounded flex justify-between items-center hover:bg-gray-50">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-gray-500">{a.description}</p>
                <p className="text-gray-400">Due: {new Date(a.dueDate).toLocaleDateString()}</p>
              </div>
<button
  className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
  onClick={() => navigate(`/instructor/courses/${courseId}/assignments/${a._id}/submissions`)}
>
  <Eye size={16} /> View Submissions
</button>

            </div>
          ))}
        </div>
      }


    </div>
  );
};

export default InstructorAssignment;
