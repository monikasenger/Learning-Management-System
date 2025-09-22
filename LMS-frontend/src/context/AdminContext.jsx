
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Token state from localStorage
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  //  Backend base URL from env
  const BASE_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  //  Axios headers with auth token
  const getHeaders = () => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // --------- User Management ---------
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/users`, getHeaders());
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/admin/create-user`,
        data,
        getHeaders()
      );
      fetchUsers();
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const updateUser = async (id, updates) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/admin/users/${id}`,
        updates,
        getHeaders()
      );
      fetchUsers();
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/users/${id}`, getHeaders());
      fetchUsers();
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  // --------- Course Approvals ---------
  const fetchPendingCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/pending-courses`,
        getHeaders()
      );
      setPendingCourses(res.data);
    } catch (err) {
      console.error("Error fetching pending courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const approveCourse = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/admin/courses/${id}/approve`,
        {},
        getHeaders()
      );
      fetchPendingCourses();
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const rejectCourse = async (id) => {
    try {
      await axios.post(
        `${BASE_URL}/api/admin/courses/${id}/reject`,
        {},
        getHeaders()
      );
      fetchPendingCourses();
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  // --------- Students ---------
  const fetchRegisteredStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/students/registered`,
        getHeaders()
      );
      setRegisteredStudents(res.data);
    } catch (err) {
      console.error("Error fetching registered students:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/students/enrolled`,
        getHeaders()
      );
      setEnrolledStudents(res.data);
    } catch (err) {
      console.error("Error fetching enrolled students:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        pendingCourses,
        registeredStudents,
        enrolledStudents,
        loading,
        token,
        setToken, 
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
        fetchPendingCourses,
        approveCourse,
        rejectCourse,
        fetchRegisteredStudents,
        fetchEnrolledStudents,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
