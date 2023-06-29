import {useState,useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";



const AdminFacultyAddCourse = () => {
    
    const {facId}=useParams();
    
    const[courseName,setcourseName]=useState('')
    const[courseStatus,setcourseStatus]=useState('Inactive')
    const[error, setError] = useState(null)
    const[isPending,setisPending]=useState(false)
    
    const history=useHistory()
    const url=`http://localhost:8080/faculty/${facId}/courses`;


    const handleSubmit= (e)=>
    {
       
       
       e.preventDefault(); 
       const newCourse= {courseName,facId,courseStatus};

       setisPending(true)
       setError(null)
       

       const abortCont= new AbortController();

       fetch(url,{signal: abortCont.signal},
       {
        method:'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newCourse)
       }).then((resp) =>
       {
         if(!resp.ok)
         {
            throw new Error('error occured during the post request')
         }
         return resp;
       }
       ).then((resp)=>
        {
        console.log("New Course Added");
        setisPending(false);
        //history.go(-1);
        history.push(`/admin/facultyList/faculty/${facId}/courses`);
        }).catch((error)=>
        {
            if(error.name==="AbortError")
            {
                console.log("Post Aborted");
            }

            else
            {
                setisPending(false);
                setError(error.message);
            }


        }
        
        )

        return () => {
        abortCont.abort()
        }
        }



        

    return ( 
    
        <div className="addCourse">
        <h2>Add a New Course</h2>
        <form onSubmit={(e) =>
        handleSubmit(e)
        }>
        <label>Course Name</label>
        <input
         type="text"
         required
         value={courseName}
         onChange={(e)=>
         setcourseName(e.target.value)
         }
         />

        <label>Status</label>
        <select
        value={courseStatus}
        onChange={(e)=>setcourseStatus(e.target.value)}
        >
        <option value="Inactive">Inactive</option>
        <option value="Active">Active</option>     
        </select> 
        
        {!isPending&&<button>Submit</button>}
        {error&&<div> {error} </div>}
        {isPending&&<button disabled>Submitting</button>}


        </form>
        </div>   


     );
}
 
export default AdminFacultyAddCourse;


