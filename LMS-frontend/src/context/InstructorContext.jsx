
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const InstructorContext = createContext();

export const useInstructor = () => useContext(InstructorContext);

export const InstructorProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]); // ✅ NEW
  const [studentAssignments, setStudentAssignments] = useState([]); // ✅ NEW
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Token state from localStorage
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Backend base URL
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Auth header helper
  const authHeader = () => ({
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  // ---------- COURSES ----------
  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/instructor/my-courses`,
        authHeader()
      );
      setCourses(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (courseData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/instructor/courses`,
        courseData,
        authHeader()
      );
      setCourses((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (id, courseData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${BASE_URL}/api/instructor/courses/${id}`,
        courseData,
        authHeader()
      );
      setCourses((prev) => prev.map((c) => (c._id === id ? data : c)));
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    try {
      setLoading(true);
      await axios.delete(
        `${BASE_URL}/api/instructor/courses/${id}`,
        authHeader()
      );
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- MODULES ----------
  const fetchModules = async (courseId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/instructor/courses/${courseId}/modules`, authHeader());
     
      setModules(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const addModule = async (courseId, moduleData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/instructor/courses/${courseId}/modules`,
        moduleData,
        authHeader()
      );
      setModules((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateModule = async (moduleId, moduleData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${BASE_URL}/api/instructor/modules/${moduleId}`,
        moduleData,
        authHeader()
      );
      setModules((prev) =>
        prev.map((m) => (m._id === moduleId ? data : m))
      );
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteModule = async (moduleId) => {
    try {
      setLoading(true);
      await axios.delete(
        `${BASE_URL}/api/instructor/modules/${moduleId}`,
        authHeader()
      );
      setModules((prev) => prev.filter((m) => m._id !== moduleId));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- LESSONS ----------
  const fetchLessons = async (moduleId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/instructor/modules/${moduleId}/lessons`,
        authHeader()
      );
      setLessons(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const addLesson = async (moduleId, lessonData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/instructor/modules/${moduleId}/lessons`,
        lessonData,
        authHeader()
      );
      setLessons((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };



  // ---------- STUDENTS ----------
  const fetchEnrolledStudents = async (courseId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/instructor/courses/${courseId}/students`,
        authHeader()
      );
      setStudents(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- ASSIGNMENTS ----------
  const createAssignment = async (courseId, assignmentData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/instructor/courses/${courseId}/assignments`,
        { ...assignmentData, courseId },
        authHeader()
      );
      setAssignments((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignmentsByCourse = async (courseId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/instructor/courses/${courseId}/assignments`,
        authHeader()
      );
      setAssignments(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const gradeSubmission = async (assignmentId, studentId, grade) => {
    try {
      setLoading(true);
         setError(null);
      const { data } = await axios.put(
        `${BASE_URL}/api/instructor/assignments/${assignmentId}/grade/${studentId}`,
        { grade },
        authHeader()
      );
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // get submissions by assignment
const fetchSubmissionsByAssignment = async (assignmentId) => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `${BASE_URL}/api/instructor/assignments/${assignmentId}/submissions`,
      authHeader()
    );
    setSubmissions(data);
    return data; 
  } catch (err) {
    setError(err.response?.data?.message || err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};



  // ---------- PROFILE ----------
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/instructor/me`,
        authHeader()
      );
      setProfile(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfileData = async (profileData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${BASE_URL}/api/instructor/me`,
        profileData,
        authHeader()
      );
      setProfile(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <InstructorContext.Provider
      value={{
        courses,
        modules,
        lessons,
        students,
        assignments,
        submissions, 
        studentAssignments,
        profile,
        loading,
        error,
        token,
        setToken,
        // Courses
        fetchMyCourses,
        createCourse,
        updateCourse,
        deleteCourse,
        // Modules
        fetchModules,
        addModule,
        updateModule,
        deleteModule,
        // Lessons
        fetchLessons,
        addLesson,

        // Students
        fetchEnrolledStudents,
        // Assignments
        createAssignment,
        fetchAssignmentsByCourse,
        gradeSubmission,
        fetchSubmissionsByAssignment, 
        // Profile
        fetchProfile,
        updateProfileData,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};
