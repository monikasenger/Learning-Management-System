import bcrypt from 'bcryptjs'
import CourseModel from "../models/CourseModel.js";
import UserModel from "../models/UserModel.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, role,phone, password } = req.body;
    if (!name || !email || !role||!phone) return res.status(400).json({ message: 'Name, email, role required' });
    if (!['instructor', 'student', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    const existing = await UserModel.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email exists' });
    const hashed = await bcrypt.hash(password || 'ChangeMe123', 10);
    const user = await UserModel.create({ name, email, role,phone, password: hashed, isApproved: true });
    res.json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) delete updates.password; // admin should use specific reset endpoint if needed
    const user = await UserModel.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPendingCourses = async (req, res) => {
  try {
    const pending = await CourseModel.find({ isApproved: false }).populate('instructor', 'name email');
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveCourse = async (req, res) => {
  try {
    const c = await CourseModel.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    res.json(c);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectCourse = async (req, res) => {
  try {
    await CourseModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rejected and deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const roleMiddleware = function(allowedRoles = []){
return (req,res,next) => {
if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
next();
}
}
// Registered students (not enrolled anywhere)
export const listRegisteredStudents = async (req, res) => {
  try {
    const students = await UserModel.find({ role: "student" });
    const enrolledStudentIds = (
      await CourseModel.find().select("enrolledStudents")
    ).flatMap(c => c.enrolledStudents.map(id => id.toString()));

    const registeredOnly = students.filter(
      s => !enrolledStudentIds.includes(s._id.toString())
    );

    res.json(registeredOnly);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Enrolled students
export const listEnrolledStudents = async (req, res) => {
  try {
    const courses = await CourseModel.find().populate("enrolledStudents", "name email");
    const enrolled = courses.flatMap(c =>
      c.enrolledStudents.map(st => ({ ...st.toObject(), course: c.title }))
    );
    res.json(enrolled);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
