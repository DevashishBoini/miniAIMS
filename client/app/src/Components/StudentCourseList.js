import {Link} from "react-router-dom";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

const StudentCourseList = (props) => {

    const courses =props.courses;
    const name=props.name;
    const url=props.url;

    const {studId}=useParams();

    const handleDelete=(studId,courseId) =>
    {
      fetch(`${url}/dropCourse/${courseId}`,{
      method: "DELETE"
      }
      ).then((resp)=>
      {
        if(!resp.ok)
        {
            throw new Error('Delete request failed')
        }
        
        window.location.reload();
      }
      ).then(() =>
        console.log('Unenrolled from the course')
      )
    } 
    

    return ( 
        
      <article>
        <h1>Course List</h1>
        <h2>{name}</h2>
        <table>
         <tr>
         <th>Course ID</th>
         <th>Course</th>
         <th>Faculty</th>
         <th>Grade</th>
         <th>Remove</th>
         </tr> 
         {
          courses.map((course)=>
          (
            <tr key={course.course_id}>
            <th>{course.course_id}</th>
            <th>{course.name}</th>
            <th>{course.faculty}</th>
            <th>{course.grade}</th>
            
            {course.status==="Active"&&<th><button onClick={() =>
            {
              handleDelete(studId,course.course_id);
            }
            }>Drop</button>
            </th>}  
            </tr>
          ) 
          )
         }
        </table>
        
        </article>

     );
}
 
export default StudentCourseList;