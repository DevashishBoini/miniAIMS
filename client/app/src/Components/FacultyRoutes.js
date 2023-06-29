import { Route } from 'react-router-dom';
import FacultyProfile from '../Components/FacultyProfile';
import FacultyCourses from '../Components/FacultyCourses';
import FacultyAddCourse from '../Components/FacultyAddCourse';
import FacultyCourseEnrolledStudents from '../Components/FacultyCourseEnrolledStudents';
import FacultyCourseUpdateGrades from '../Components/FacultyCourseUpdateGrades';



const FacultyRoutes = () => {
    
    
    return ( 
        <>
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
        
        </>
     );
}
 
export default FacultyRoutes;