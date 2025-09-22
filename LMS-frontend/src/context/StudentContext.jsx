
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StudentContext = createContext();
export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const BASE_URL = import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== token) setToken(storedToken);
  }, [token]);

  // ---------- COURSES ----------
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/api/student/courses`, authHeader());
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyCourses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/api/student/my-courses`, authHeader());
      setMyCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching my courses:", err);
      setMyCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const enrollCourse = async (courseId) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/student/courses/${courseId}/enroll`,
        {},
        authHeader()
      );
      await fetchMyCourses();
      return data;
    } catch (err) {
      console.error("Error enrolling in course:", err);
      throw err;
    }
  };

  // ---------- PROFILE ----------
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/student/me`, authHeader());
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const updateProfile = async (formData) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/api/student/me`, formData, {
        ...authHeader(),
        headers: { ...authHeader().headers, "Content-Type": "multipart/form-data" },
      });
      setProfile(data);
      return data;
    } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
    }
  };

  // ---------- ASSIGNMENTS ----------
  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/api/student/assignments`, authHeader());
      setAssignments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseAssignments = async (courseId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/student/courses/${courseId}/assignments`,
        authHeader()
      );
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching course assignments:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

const submitAssignment = async (assignmentId, courseId, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignmentId", assignmentId); 

    const { data } = await axios.post(
      `${BASE_URL}/api/student/courses/${courseId}/assignments`,
      formData,
      {
        ...authHeader(),
        headers: { ...authHeader().headers, "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  } catch (err) {
    console.error("Error submitting assignment:", err);
    throw err;
  }
};



  // ---------- REVIEWS ----------
  const addReview = async (courseId, rating, comment) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/student/courses/${courseId}/review`,
        { rating, comment },
        authHeader()
      );
      return data;
    } catch (err) {
      console.error("Error adding review:", err);
      throw err;
    }
  };

  // ---------- Auto-load on mount ----------
  useEffect(() => {
    if (token) {
      fetchCourses();
      fetchMyCourses();
      fetchProfile();
      fetchAssignments();
    }
  }, [token]);

  return (
    <StudentContext.Provider
      value={{
        courses,
        myCourses,
        profile,
        assignments,
        loading,
        token,
        setToken,
        fetchCourses,
        enrollCourse,
        fetchMyCourses,
        fetchProfile,
        updateProfile,
        fetchAssignments,
        fetchCourseAssignments,
        submitAssignment,
        addReview,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
