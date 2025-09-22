import AssignmentModel from '../models/AssignmentModel.js';
import CourseModel from '../models/CourseModel.js';
import LessonModel from '../models/LessonModel.js';
import ModuleModel from '../models/ModuleModel.js';
import UserModel from '../models/UserModel.js';


export const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const course = await CourseModel.create({ title, description, price: price || 0, instructor: req.user._id, isApproved: false });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await CourseModel.findOneAndUpdate({ _id: req.params.id, instructor: req.user._id }, req.body, { new: true });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await CourseModel.findOneAndDelete({ _id: req.params.id, instructor: req.user._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addModule = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Module title required' });
    // verify instructor owns course
    const course = await CourseModel.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (String(course.instructor) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    const module = await ModuleModel.create({ title, course: req.params.id });
    course.modules.push(module._id);
    await course.save();
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addLesson = async (req, res) => {
 try {
    const { title, contentType, contentText } = req.body;
    const moduleObj = await ModuleModel.findById(req.params.id).populate('course');
    if (!moduleObj) return res.status(404).json({ message: 'Module not found' });
    if (String(moduleObj.course.instructor) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    let contentUrl;
    if (req.file) contentUrl = req.file.path; // multer + cloudinary returns file path as `req.file.path`

    const lesson = await LessonModel.create({
      title,
      contentType,
      contentText,
      contentUrl,
      module: req.params.id
    });

    moduleObj.lessons.push(lesson._id);
    await moduleObj.save();

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEnrolledStudents = async (req, res) => {
  try {
    const course = await CourseModel.findOne({ _id: req.params.id, instructor: req.user._id }).populate('enrolledStudents', 'name email');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course.enrolledStudents || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMyCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({ instructor: req.user._id }).populate('modules');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateModule = async (req, res) => {
  try {
    const { title } = req.body;
    const module = await ModuleModel.findById(req.params.id).populate("course");
    if (!module) return res.status(404).json({ message: "Module not found" });
    if (String(module.course.instructor) !== String(req.user._id))
      return res.status(403).json({ message: "Forbidden" });

    module.title = title || module.title;
    await module.save();
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteModule = async (req, res) => {
  try {
    const module = await ModuleModel.findById(req.params.id).populate("course");
    if (!module) return res.status(404).json({ message: "Module not found" });
    if (String(module.course.instructor) !== String(req.user._id))
      return res.status(403).json({ message: "Forbidden" });

    await LessonModel.deleteMany({ module: module._id }); // remove lessons
    await module.deleteOne();
    res.json({ message: "Module deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// ---------------- MODULES ----------------
export const getModules = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id).populate("modules");
    if (!course) return res.status(404).json({ message: "Course not found" });
    if (String(course.instructor) !== String(req.user._id))
      return res.status(403).json({ message: "Forbidden" });

    res.json(course.modules || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- LESSONS ----------------
export const getLessons = async (req, res) => {
  try {
   const module = await ModuleModel.findById(req.params.id)
  .populate("lessons")
  .populate("course");
  if (!module) return res.status(404).json({ message: "Module not found" });
  
if (String(module.course.instructor) !== String(req.user._id))
  return res.status(403).json({ message: "Forbidden" });

    res.json(module.lessons || []);
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

//  Update student profile 
export const updateProfile = async (req, res) => {
  try {
    const { name, email, role, ...rest } = req.body;
    let updatedFields = { ...rest };

    if (req.file) {
      updatedFields.photo = req.file.path; 
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

// Instructor creates assignment
export const createAssignment = async (req,res)=>{
  try {
    const { title, description, moduleId, dueDate } = req.body;
const { courseId } = req.params;
    if (!title || !moduleId)
      return res.status(400).json({ message: "Title, course and module are required" });

    // Verify course & module belong to instructor
    const course = await CourseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    if (String(course.instructor) !== String(req.user._id))
      return res.status(403).json({ message: "Forbidden" });

    const moduleObj = await ModuleModel.findById(moduleId);
    if (!moduleObj) return res.status(404).json({ message: "Module not found" });
    if (String(moduleObj.course) !== courseId)
      return res.status(400).json({ message: "Module does not belong to this course" });

    const assignment = await AssignmentModel.create({
      title,
      description,
      course: courseId,
      module: moduleId,
      dueDate,
      submissions: [],
    });

    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Instructor grades submission
export const gradeSubmission = async (req, res) => {
  try {
    const { assignmentId, studentId } = req.params;
    const { grade } = req.body;

    // Assignment fetch karo
    const assignment = await AssignmentModel.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    //  Course check karo ki ye instructor ka hi hai
    const course = await CourseModel.findById(assignment.course);
    if (!course || String(course.instructor) !== String(req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    //  Student ki submission find karo
    const submission = assignment.submissions.find(
      (s) => String(s.student) === studentId
    );

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    //  Grade update karo
    submission.grade = grade;
    await assignment.save();

    res.json({
      message: "Graded successfully",
      updatedSubmission: submission, // frontend ke liye updated data bhej diya
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get assignments by course
export const getAssignmentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await CourseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    if (String(course.instructor) !== String(req.user._id))
      return res.status(403).json({ message: "Forbidden" });

    const assignments = await AssignmentModel.find({ course: courseId }).populate("module", "title");
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- ASSIGNMENTS ----------------

// Get submissions of a specific assignment
export const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await AssignmentModel.findById(assignmentId)
      .populate("submissions.student", "name email");

    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    res.json(assignment.submissions || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

