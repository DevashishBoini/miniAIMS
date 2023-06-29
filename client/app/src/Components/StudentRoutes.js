import { Route } from 'react-router-dom';
import StudentProfile from '../Components/StudentProfile';
import StudentCourses from '../Components/StudentCourses';
import StudentEnrollCourse from '../Components/StudentEnrollCourse';

const StudentRoutes = () => {
    return ( 
        <>
     <Route exact path="/student/:studId">
      <StudentProfile />
     </Route>

     <Route exact path="/student/:studId/courses">
      <StudentCourses />
     </Route>

     <Route exact path="/student/:studId/courses/enrollNewCourses">
      <StudentEnrollCourse />
     </Route>
        </>
     );
}
 
export default StudentRoutes;