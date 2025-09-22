
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
  module: { type: mongoose.Schema.Types.ObjectId, ref: "module" },
  dueDate: Date,
  submissions: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      fileUrl: String, // student submission
      grade: Number,
      submittedAt: Date,
    },
  ],
});

const AssignmentModel = mongoose.models.assignment || mongoose.model("assignment", assignmentSchema);
export default AssignmentModel;
