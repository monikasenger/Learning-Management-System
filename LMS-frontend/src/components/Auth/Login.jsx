import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock ,LogIn} from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(formData.email, formData.password);

      // Role-based navigation
      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else if (loggedInUser.role === "instructor") {
        navigate("/instructor");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
         <h2 className="text-3xl font-bold mb-6 text-center flex justify-center items-center gap-2 text-purple-700">
          <LogIn size={28} /> Login
        </h2>
        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

        {/* Email Field */}
        <div className="flex items-center border rounded mb-3 px-2">
          <Mail className="w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 outline-none"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center border rounded mb-4 px-2">
          <Lock className="w-5 h-5 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 outline-none"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
         <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Login
        </button>

        {/* Navigate to Register */}
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
