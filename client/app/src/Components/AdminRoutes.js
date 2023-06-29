import { Route } from 'react-router-dom';
import Admin from '../Components/Admin';
import AdminCourseList from '../Components/AdminCourseList';
import AdminFacultyList from '../Components/AdminFacultylist';
import AdminAddFaculty from '../Components/AdminAddFaculty';
import AdminFacultyProfile from '../Components/AdminFacultyProfile';
import AdminFacultyCourses from '../Components/AdminFacultyCourses';
import AdminFacultyAddCourse from '../Components/AdminFacultyAddCourse';
import AdminFacultyCourseEnrolledStudents from '../Components/AdminFacultyCourseEnrolledStudents';
import AdminFacultyCourseUpdateGrades from '../Components/AdminFacultyCourseUpdateGrades';
import AdminStudentList from '../Components/AdminStudentList';
import AdminStudentProfile from '../Components/AdminStudentProfile';
import AdminAddStudent from '../Components/AdminAddStudent';
import AdminStudentCourses from '../Components/AdminStudentCourses';
import AdminStudentEnrollCourse from '../Components/AdminStudentEnrollCourse';


const AdminRoutes = () => {
    return ( 

        <>
     <Route exact path="/admin">
      <Admin />
     </Route>

     <Route exact path="/admin/courseList">
      <AdminCourseList />
     </Route>

     <Route exact path="/admin/facultyList">
      <AdminFacultyList />
     </Route>

     <Route exact path="/admin/facultyList/addFaculty">
      <AdminAddFaculty />
     </Route>

     <Route exact path="/admin/facultyList/faculty/:facId">
      <AdminFacultyProfile />
     </Route>

     <Route exact path="/admin/facultyList/faculty/:facId/courses">
      <AdminFacultyCourses />
     </Route>

     <Route exact path="/admin/facultyList/faculty/:facId/courses/addCourse">
      <AdminFacultyAddCourse />
     </Route>

     <Route exact path="/admin/facultyList/faculty/:facId/courses/:courseId/studentsEnrolled">
      < AdminFacultyCourseEnrolledStudents/>
     </Route>

     <Route exact path="/admin/facultyList/faculty/:facId/courses/:courseId/studentsEnrolled/updateGrade/:courseName/:studId/:studName">
      <AdminFacultyCourseUpdateGrades  />
     </Route>

     <Route exact path="/admin/studentList">
      <AdminStudentList />
     </Route>

     <Route exact path="/admin/studentList/addStudents">
      <AdminAddStudent />
     </Route>

     <Route exact path="/admin/studentList/students/:studId">
      <AdminStudentProfile />
     </Route>

     <Route exact path="/admin/studentList/students/:studId/courses">
      <AdminStudentCourses />
     </Route>

     <Route exact path="/admin/studentList/students/:studId/courses/enrollNewCourses">
      <AdminStudentEnrollCourse />
     </Route>
        </>
     );
}
 
export default AdminRoutes;