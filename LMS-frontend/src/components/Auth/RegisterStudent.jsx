import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Lock, UserPlus } from "lucide-react";

const RegisterStudent = () => {
  const { registerStudent } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerStudent(formData);
      setMessage(res.message || " Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-6 text-center flex justify-center items-center gap-2 text-purple-700">
          <UserPlus size={28} /> Student Register
        </h2>

        {/* Success / Error Message */}
        {message && <p className="text-center text-blue-600 mb-4">{message}</p>}

        {/* Name */}
        <div className="flex items-center border rounded mb-4 p-2 bg-gray-50">
          <User className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full bg-transparent outline-none"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center border rounded mb-4 p-2 bg-gray-50">
          <Mail className="text-gray-500 mr-2" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="flex items-center border rounded mb-4 p-2 bg-gray-50">
          <Phone className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full bg-transparent outline-none"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded mb-6 p-2 bg-gray-50">
          <Lock className="text-gray-500 mr-2" size={18} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Register
        </button>

        {/* Switch to Login */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterStudent;
