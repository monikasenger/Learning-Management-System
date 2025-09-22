import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { InstructorProvider } from './context/InstructorContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import { StudentProvider } from './context/StudentContext.jsx'
import { CoursesProvider } from './context/CourseContext.jsx'

createRoot(document.getElementById('root')).render(

     <AuthProvider>

    <InstructorProvider>
     <StudentProvider>
  
    <AdminProvider>
   <CoursesProvider>

      <App/>  
   </CoursesProvider>
        
  
</AdminProvider>
</StudentProvider>

    </InstructorProvider>
 

  </AuthProvider>
     

)
