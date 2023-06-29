import {useState,useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";




const FacultyCourseUpdateGrades = () => {
    
    const {facId,courseId,studId,studName,courseName} = useParams();
    const[grade,setGrade]=useState('')
    const [isPending,setisPending]=useState(false);
    const url=`http://localhost:8080/faculty/${facId}/courses/${courseId}/updateGrade/${studId}`;
    const history=useHistory()
    
    const handleSubmit=(e)=>
    {
       e.preventDefault();  
       const info= {grade,studId,courseId};

       setisPending(true)

       fetch(url,
       {
        method:'PUT',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(info)
       }).then(()=>
        {
        console.log("Grade Updated");
        setisPending(false);
        //history.go(-1);
        history.push(`/faculty/${facId}/courses/${courseId}/studentsEnrolled`);
        })      
    }
    
    
    return ( 

       <div className="updateGrade">
        <h2>Update Student Grade</h2>
        <h2>{courseName}</h2>
        <h2>Course Id:{courseId}</h2>
        <h2>{studName}</h2>
        <h2>Student Id:{studId}</h2>
        <form onSubmit={(e) =>
         handleSubmit(e) 
        }>
        <label >Grade:</label>
        <input
        type="text"
        required
        value={grade}
        onChange={(e)=>
        setGrade(e.target.value)
        }
        />
        {!isPending&&<button>Update Grade</button>}
        {isPending&&<button disabled>Updating Grade</button>}
        </form>
       </div>



     );
}
 
export default FacultyCourseUpdateGrades;