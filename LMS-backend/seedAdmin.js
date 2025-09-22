import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import UserModel from "./models/UserModel.js";
import connectDB from "./config/mongoodb.js";

dotenv.config();

async function seedAdmin() {
  try {
    // Connect DB
    await connectDB();

    // Check if admin exists in LMS database
    const existingAdmin = await UserModel.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists with email:", existingAdmin.email);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // Create admin
    const admin = new UserModel({
        name: "Admin", 
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isApproved: true,
    });

    await admin.save();
    console.log("✅ Admin user created successfully in LMS database!");
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin();
