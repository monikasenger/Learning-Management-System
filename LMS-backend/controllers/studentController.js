import AssignmentModel from "../models/AssignmentModel.js";
import CourseModel from "../models/CourseModel.js";
import UserModel from "../models/UserModel.js";

//  List all approved courses (anyone can see)
export const listCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({ isApproved: true }).populate('instructor', 'name');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Enroll student in a course
export const enroll = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (!course.enrolledStudents.includes(req.user._id)) {
      course.enrolledStudents.push(req.user._id);
      await course.save();
    }
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Get only courses in which student is enrolled
export const myCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({ enrolledStudents: req.user._id })
      .populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//  Get student profile (self only)
export const myProfile = async (req, res) => {
  try {
    const student = await UserModel.findById(req.user._id).select("-password");
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Update student profile (cannot change name, email, role)
export const updateProfile = async (req, res) => {
  try {
    const { name, email, role, ...rest } = req.body; // block these fields
    let updatedFields = { ...rest };

    // Agar file upload hui hai, uska URL save kare
    if (req.file) {
      updatedFields.photo = req.file.path; // Cloudinary ka URL
    }

    const updated = await UserModel.findByIdAndUpdate(
      req.user._id,
      { $set: updatedFields },
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const submitAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { assignmentId } = req.body;

    const assignment = await AssignmentModel.findOne({
      _id: assignmentId,
      course: courseId,
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    //  Check if assignment already submitted by this student
    const alreadySubmitted = assignment.submissions.some(
      (s) => s.student.toString() === req.user._id.toString()
    );
    if (alreadySubmitted) {
      return res.status(400).json({ message: "Assignment already submitted" });
    }

    //  Check if due date passed
    if (assignment.dueDate && new Date() > new Date(assignment.dueDate)) {
      return res.status(400).json({ message: "Cannot submit after due date" });
    }

    let fileUrl;
    if (req.file) fileUrl = req.file.path;

    assignment.submissions.push({
      student: req.user._id,
      fileUrl,
      submittedAt: new Date(),
    });

    await assignment.save();
    res.json({ message: "Assignment submitted successfully!", fileUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get all assignments for logged-in student
export const getAssignments = async (req, res) => {
  try {
    const courses = await CourseModel.find({ enrolledStudents: req.user._id }).select("_id");

    const assignments = await AssignmentModel.find({
      course: { $in: courses.map((c) => c._id) },
    }).populate("course", "title");

    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check if student enrolled hai ya nahi
    const course = await CourseModel.findOne({
      _id: courseId,
      enrolledStudents: req.user._id,
    });

    if (!course) {
      return res.status(403).json({ message: "You are not enrolled in this course" });
    }

    const assignments = await AssignmentModel.find({ course: courseId });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};