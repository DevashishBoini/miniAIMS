import React from 'react';
import {BrowserRouter as Router ,Route,Switch,Redirect} from "react-router-dom";
import FacultyProfile from './Components/FacultyProfile';
import FacultyCourses from './Components/FacultyCourses';
import FacultyAddCourse from './Components/FacultyAddCourse';
import FacultyCourseEnrolledStudents from './Components/FacultyCourseEnrolledStudents';
import FacultyCourseUpdateGrades from './Components/FacultyCourseUpdateGrades';
import StudentProfile from './Components/StudentProfile';
import StudentCourses from './Components/StudentCourses';
import StudentEnrollCourse from './Components/StudentEnrollCourse';
import Admin from './Components/Admin';
import AdminCourseList from './Components/AdminCourseList';
import AdminFacultyList from './Components/AdminFacultylist';
import AdminAddFaculty from './Components/AdminAddFaculty';
import AdminFacultyProfile from './Components/AdminFacultyProfile';
import AdminFacultyCourses from './Components/AdminFacultyCourses';
import AdminFacultyAddCourse from './Components/AdminFacultyAddCourse';
import AdminFacultyCourseEnrolledStudents from './Components/AdminFacultyCourseEnrolledStudents';
import AdminFacultyCourseUpdateGrades from './Components/AdminFacultyCourseUpdateGrades';
import AdminStudentList from './Components/AdminStudentList';
import AdminStudentProfile from './Components/AdminStudentProfile';
import AdminAddStudent from './Components/AdminAddStudent';
import AdminStudentCourses from './Components/AdminStudentCourses';
import AdminStudentEnrollCourse from './Components/AdminStudentEnrollCourse';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Navbar from './Components/Navbar';



function App() {
  document.title ="AIMS"
  return (
    <Router>
    <div className="App">

    <Switch>

     
    
    <Route exact path="/login">
    <Login />
    </Route>

    <Route exact path="/" >
     <Login />
     </Route> 




     
      
      <ProtectedRoute >

     <Route exact path="/faculty/:facId">
      <FacultyProfile />
     </Route>

     <Route exact path="/faculty/:facId/courses">
      <FacultyCourses />
     </Route>

     <Route exact path="/faculty/:facId/courses/addCourse">
      <FacultyAddCourse />
     </Route>

     <Route exact path="/faculty/:facId/courses/:courseId/studentsEnrolled">
      <FacultyCourseEnrolledStudents  />
     </Route>

     <Route exact path="/faculty/:facId/courses/:courseId/studentsEnrolled/updateGrade/:courseName/:studId/:studName">
      <FacultyCourseUpdateGrades  />
     </Route>

     

     <Route exact path="/student/:studId">
      <StudentProfile />
     </Route>

     <Route exact path="/student/:studId/courses">
      <StudentCourses />
     </Route>

     <Route exact path="/student/:studId/courses/enrollNewCourses">
      <StudentEnrollCourse />
     </Route>

     

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

     
     </ProtectedRoute>
     

     

    </Switch>

    </div>
    </Router>
    
  );
}

export default App;