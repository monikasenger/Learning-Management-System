
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  // -------- Token state sync with localStorage --------
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // -------- Backend base URL --------
  const BASE_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // -------- Axios headers with auth token --------
  const getHeaders = () => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // -------- Get all public courses --------
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/courses`);
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // -------- Get single course with modules + lessons --------
  const fetchCourseDetail = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/courses/${id}`);
      setCourseDetail(data);
    } catch (err) {
      console.error("Error fetching course detail:", err);
      setCourseDetail(null);
    } finally {
      setLoading(false);
    }
  };

  // -------- Search courses by query --------
  const searchCourses = async (query) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/courses/search?query=${query}`
      );
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error searching courses:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        courseDetail,
        loading,
        token,
        setToken,
        fetchCourses,
        fetchCourseDetail,
        searchCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

//  Hook for easy access
export const useCourses = () => useContext(CoursesContext);
