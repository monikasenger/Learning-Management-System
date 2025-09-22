import { useEffect, useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Edit2, Trash2, UserPlus, Phone } from "lucide-react";

const Users = () => {
  const { users, fetchUsers, deleteUser, createUser, updateUser } = useAdmin();

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "student",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) await updateUser(editingUser._id, formData);
    else await createUser(formData);
    setFormData({ name: "", email: "", phone: "", role: "student", password: "" });
    setEditingUser(null);
    setShowForm(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ ...user, password: "" });
    setShowForm(true);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
        👥 Manage Users
      </h2>

      {/* Add / Update User Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-5 bg-white rounded-2xl shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4">
            {editingUser ? "Update User" : "Add User"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
              disabled={editingUser}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
            {!editingUser && (
              <input
                type="password"
                name="password"
                placeholder="Password (optional)"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            )}
          </div>

          <div className="mt-4 flex gap-3 flex-wrap">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              {editingUser ? <Edit2 size={18} /> : <UserPlus size={18} />}
              {editingUser ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingUser(null);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  role: "student",
                  password: "",
                });
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Add User Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          <UserPlus size={18} /> Add User
        </button>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left flex items-center gap-1">
                <Phone size={16} /> Phone
              </th>
              <th className="border p-3 text-left">Role</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 transition">
                <td className="border p-3">{u.name}</td>
                <td className="border p-3">{u.email}</td>
                <td className="border p-3">{u.phone || "-"}</td>
                <td className="border p-3 capitalize">{u.role}</td>
                <td className="border p-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleEdit(u)}
                    className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
