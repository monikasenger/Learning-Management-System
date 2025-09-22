
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";


export const registerStudent = async (req, res) => {
  try {
    const { name, email, password,phone} = req.body;
    if (!email || !password || !name ||!phone) return res.status(400).json({ message: 'Name, email and password required' });
    const existing = await UserModel.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
     //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    const user = await UserModel.create({ name, email, phone,password: hashedPassword, role: 'student', isApproved: true });
    return res.json({ message: 'Registered', userId: user._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    if (user.role !== 'admin' && !user.isApproved) return res.status(403).json({ message: 'Account not approved' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email,phone:user.phone, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
