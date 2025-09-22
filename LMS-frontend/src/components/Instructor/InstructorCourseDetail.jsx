
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInstructor } from "../../context/InstructorContext";
import { Edit2, Trash2, PlusCircle, BookOpen, ChevronLeft, FileText } from "lucide-react";

const InstructorCourseDetail = () => {
  const { id } = useParams(); // courseId
  const navigate = useNavigate();

  const {
    courses,
    modules,
    lessons,
    fetchModules,
    fetchLessons,
    addModule,
    addLesson,
    updateModule,
    updateLesson,
    deleteModule,
    deleteLesson,
  } = useInstructor();

  const course = courses.find(c => c._id === id);

  const [newModule, setNewModule] = useState("");
  const [newLesson, setNewLesson] = useState({ title: "", content: "", moduleId: "" });
  const [editingModule, setEditingModule] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);

  useEffect(() => { if(id) fetchModules(id); }, [id]);

  const handleAddModule = async () => {
    if(!newModule.trim()) return;
    await addModule(id, { title: newModule });
    setNewModule("");
  };

  const handleAddLesson = async () => {
    if(!newLesson.title.trim() || !newLesson.moduleId) return;
    await addLesson(newLesson.moduleId, newLesson);
    setNewLesson({ title: "", content: "", moduleId: "" });
  };

  const handleUpdateModule = async (moduleId) => {
    if(!editingModule?.title.trim()) return;
    await updateModule(moduleId, { title: editingModule.title });
    setEditingModule(null);
  };

  const handleUpdateLesson = async (lessonId, moduleId) => {
    if(!editingLesson?.title.trim()) return;
    await updateLesson(lessonId, { title: editingLesson.title });
    setEditingLesson(null);
  };

  if(!course) return <div className="p-6">Course not found</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <BookOpen size={24} /> {course.title}
          </h2>
          <p className="text-gray-600 mt-1">{course.description}</p>
          <p className="text-gray-500 mt-1 flex items-center gap-1">
            💰 Price: ₹{course.price}
          </p>
        </div>
        <button onClick={()=>navigate(-1)} className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition">
          <ChevronLeft size={18} /> Back
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText size={20} /> Modules
      </h3>

      <ul className="space-y-4">
        {modules.map(m => (
          <li key={m._id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
            {/* Module */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              {editingModule?._id === m._id ? (
                <div className="flex gap-2 flex-1">
                  <input type="text" value={editingModule.title}
                    onChange={(e)=>setEditingModule({...editingModule,title:e.target.value})}
                    className="border px-2 py-1 rounded flex-1"
                  />
                  <button onClick={()=>handleUpdateModule(m._id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-1">
                    <Edit2 size={16} /> Save
                  </button>
                  <button onClick={()=>setEditingModule(null)} className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg">Cancel</button>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <span className="font-medium text-lg">{m.title}</span>
                  <div className="flex gap-2">
                    <button onClick={()=>setEditingModule(m)} className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                      <Edit2 size={16} /> Edit
                    </button>
                    <button onClick={()=>deleteModule(m._id)} className="flex items-center gap-1 text-red-500 hover:text-red-600">
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Lessons */}
            <div className="mt-3 ml-4">
              <h4 className="font-semibold mb-2 flex items-center gap-1">
                <BookOpen size={16} /> Lessons
              </h4>
              <ul className="space-y-2">
                {lessons.filter(l=>l.moduleId===m._id).map(l=>(
                  <li key={l._id} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
                    {editingLesson?._id === l._id ? (
                      <div className="flex gap-2 flex-1">
                        <input type="text" value={editingLesson.title}
                          onChange={(e)=>setEditingLesson({...editingLesson,title:e.target.value})}
                          className="border px-2 py-1 rounded flex-1"
                        />
                        <button onClick={()=>handleUpdateLesson(l._id,m._id)} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1">
                          <Edit2 size={16} /> Save
                        </button>
                        <button onClick={()=>setEditingLesson(null)} className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded-lg">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center w-full">
                        <span>{l.title}</span>
                        <div className="flex gap-2">
                          <button onClick={()=>setEditingLesson(l)} className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                            <Edit2 size={16} /> Edit
                          </button>
                          <button onClick={()=>deleteLesson(l._id)} className="flex items-center gap-1 text-red-500 hover:text-red-600">
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* Add Lesson */}
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Lesson title"
                  value={newLesson.moduleId===m._id?newLesson.title:""}
                  onChange={(e)=>setNewLesson({...newLesson,title:e.target.value,moduleId:m._id})}
                  className="border px-2 py-1 rounded flex-1"
                />
                <button onClick={handleAddLesson} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1">
                  <PlusCircle size={16} /> Add Lesson
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Module */}
      <div className="flex gap-2 mt-6 mb-4">
        <input type="text" placeholder="New Module Title" value={newModule}
          onChange={(e)=>setNewModule(e.target.value)} className="border px-3 py-2 rounded flex-1"
        />
        <button onClick={handleAddModule} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-1">
          <PlusCircle size={18} /> Add Module
        </button>
      </div>
    </div>
  );
};

export default InstructorCourseDetail;
