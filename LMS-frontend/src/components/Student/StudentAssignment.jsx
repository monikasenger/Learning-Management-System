import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStudent } from "../../context/StudentContext";
import { ArrowLeft, FileText, Upload } from "lucide-react";

const StudentAssignment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { fetchCourseAssignments, submitAssignment, loading, profile } = useStudent();

  const [assignments, setAssignments] = useState([]);
  const [submitting, setSubmitting] = useState(null);
  const [submittedAssignments, setSubmittedAssignments] = useState({}); 

  useEffect(() => {
    const loadAssignments = async () => {
      const data = await fetchCourseAssignments(courseId);
      setAssignments(data);

      const submittedMap = {};
      data.forEach((a) => {
        if (a.submissions && a.submissions.some((s) => s.student === profile._id)) {
          submittedMap[a._id] = true;
        }
      });
      setSubmittedAssignments(submittedMap);
    };
    if (profile) loadAssignments();
  }, [courseId, fetchCourseAssignments, profile]);

  const handleFileSubmit = async (assignmentId, file) => {
    try {
      setSubmitting(assignmentId);
      await submitAssignment(assignmentId, courseId, file);

      setSubmittedAssignments((prev) => ({ ...prev, [assignmentId]: true }));
      alert(" Assignment submitted successfully!");

      const data = await fetchCourseAssignments(courseId);
      setAssignments(data);
    } catch (err) {
      alert(err.response?.data?.message || " Failed to submit assignment");
      console.error(err);
    } finally {
      setSubmitting(null);
    }
  };

  const isDue = (dueDate) => {
    if (!dueDate) return true;
    return new Date() <= new Date(dueDate);
  };

  if (loading && assignments.length === 0) {
    return <p className="animate-pulse text-gray-600">⏳ Loading assignments...</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FileText className="w-7 h-7 text-blue-500" />
        Course Assignments
      </h2>

      {assignments.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {assignments.map((assignment) => {
            const due = isDue(assignment.dueDate);
            const submitted = submittedAssignments[assignment._id];

            return (
              <div key={assignment._id} className="bg-white border rounded-xl shadow-md p-5 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{assignment.title}</h3>
                <p className="text-gray-600 mb-2">{assignment.description}</p>
                <p className="text-sm text-gray-500 mb-3">
                  Due Date: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : "Not specified"}
                </p>

                <label
                  className={`flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer transition
                    ${submitted ? "bg-green-500 text-white" :
                      due ? "bg-blue-500 text-white hover:bg-blue-600" :
                      "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {submitted ? " Submitted" :
                    submitting === assignment._id ? "Submitting..." :
                    due ? "Upload Assignment" : "Not Yet Due"}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => e.target.files.length > 0 && handleFileSubmit(assignment._id, e.target.files[0])}
                    disabled={submitting === assignment._id || submitted || !due}
                  />
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 italic">No assignments available for this course.</p>
      )}
    </div>
  );
};

export default StudentAssignment;
