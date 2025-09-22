import { useState, useEffect } from "react";
import { useStudent } from "../../context/StudentContext";
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";

const StudentProfile = () => {
  const { profile, fetchProfile, updateProfile, loading } = useStudent();
  const [formData, setFormData] = useState({
    photo: "",
    address: { line1: "", line2: "" },
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        photo: profile.photo || "",
        address: profile.address || { line1: "", line2: "" },
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "line1" || name === "line2") {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      alert(" Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      alert(" Error updating profile");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-pulse text-gray-600 text-lg"> Loading profile...</p>
      </div>
    );

  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">No profile found</p>
      </div>
    );

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto bg-white shadow-lg rounded-3xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
        <img
          src={
            formData.photo ||
            "https://via.placeholder.com/150?text=No+Photo"
          }
          alt="Profile"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-300 shadow-md"
        />
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <User className="w-6 h-6 text-purple-600" /> My Profile
            </h2>
            <button
              onClick={() => setEditMode((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-1 rounded-md bg-gray-800 text-white hover:bg-gray-900 transition"
            >
              {editMode ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>
          {editMode && (
            <div className="mb-4">
              <label className="block font-semibold mb-1">Photo URL</label>
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                className="w-full p-2 border rounded shadow-sm"
                placeholder="Enter photo URL"
              />
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Non-editable fields */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <div className="flex-1">
            <label className="block font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" /> Name
            </label>
            <input
              type="text"
              value={profile.name}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" /> Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <div className="flex-1">
            <label className="block font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" /> Role
            </label>
            <input
              type="text"
              value={profile.role}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" /> Phone
            </label>
            <input
              type="text"
              value={profile.phone}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
        </div>

        {/* Editable fields */}
        <div>
          <label className="block font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" /> Address Line 1
          </label>
          <input
            type="text"
            name="line1"
            value={formData.address.line1}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded ${
              editMode ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div>
          <label className="block font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" /> Address Line 2
          </label>
          <input
            type="text"
            name="line2"
            value={formData.address.line2}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded ${
              editMode ? "" : "bg-gray-100"
            }`}
          />
        </div>

        {editMode && (
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default StudentProfile;
