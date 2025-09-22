import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title:{ type: String, required: true },
  description:{ type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
 modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'module' }],
price: { type: Number, default: 0 },
isApproved: { type: Boolean, default: false },
enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
reviews: [
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now },
  }
]
,
createdAt: { type: Date, default: Date.now }
});

const CourseModel = mongoose.models.course || mongoose.model('course', courseSchema)

export default CourseModel