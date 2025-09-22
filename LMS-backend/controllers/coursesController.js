import CourseModel from "../models/CourseModel.js";

export const getCourseDetail = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id)
      .populate({ path: 'modules', populate: { path: 'lessons' } })
      .populate('instructor', 'name');
    if (!course || !course.isApproved) return res.status(404).json({ message: 'Not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listPublic = async (req, res) => {
  try {
    const courses = await CourseModel.find({ isApproved: true }).populate('instructor', 'name');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const searchCourses = async (req,res)=>{
  const { query } = req.query;
  const courses = await CourseModel.find({
    isApproved:true,
    title: { $regex: query, $options: "i" } // case insensitive
  }).populate("instructor","name");
  res.json(courses);
};

