import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInstructor } from "../../context/InstructorContext";

const AssignmentSubmissions = () => {
  const { assignmentId } = useParams(); 
  const { fetchSubmissionsByAssignment, gradeSubmission } = useInstructor();

  const [submissions, setSubmissions] = useState([]);
  const [grades, setGrades] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!assignmentId) return;

    const loadSubmissions = async () => {
      try {
        setLoading(true);
        const data = await fetchSubmissionsByAssignment(assignmentId);
        setSubmissions(data); // ensure data is set
        // Initialize grades
        const initialGrades = {};
        data.forEach(sub => {
          initialGrades[sub.student._id] = sub.grade || "";
        });
        setGrades(initialGrades);
      } catch (err) {
        setError(err.message || "Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, [assignmentId]);

  const handleGradeChange = (studentId, value) => {
    setGrades(prev => ({ ...prev, [studentId]: value }));
  };

  const handleGradeSubmit = async (studentId) => {
    const grade = grades[studentId];
    if (!grade) return alert("Enter a grade");

    try {
      await gradeSubmission(assignmentId, studentId, grade);
      alert("Grade submitted!");
    } catch (err) {
      alert(err.message || "Failed to submit grade");
    }
  };

  if (loading) return <p>Loading submissions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!submissions || submissions.length === 0) return <p>No submissions yet.</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Assignment Submissions</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2 text-left">Student Name</th>
            <th className="border p-2 text-left">Submitted File</th>
            <th className="border p-2 text-left">Grade(out of 10)</th>
            <th className="border p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(s => (
            <tr key={s.student._id}>
              <td className="border p-2">{s.student.name}</td>
              <td className="border p-2">
                {s.fileUrl ? (
                  <a
                    href={s.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                ) : (
                  "Not Submitted"
                )}
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={grades[s.student._id]}
                  onChange={e => handleGradeChange(s.student._id, e.target.value)}
                  className="border p-1 rounded w-20"
                />
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleGradeSubmit(s.student._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentSubmissions;
