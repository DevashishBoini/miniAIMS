import {useState,useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";


const AdminAddStudent  = () => {
   
    const[studentName,setstudentName]=useState('')
    const[studentAge,setstudentAge]=useState('')
    const[studentGender,setstudentGender]=useState('')
    const[studentBranch,setstudentBranch]=useState('')
    const[studentPassword,setstudentPassword]=useState('')
    const[error, setError] = useState(null)
    const[isPending,setisPending]=useState(false)
   
    const history=useHistory()
    const url=`http://localhost:8080/admin/addStudent`;



    const handleSubmit= (e)=>
    {
       
       
       e.preventDefault(); 
       const newstudent= {studentName,studentAge,studentGender,studentBranch,studentPassword};

       setisPending(true)
       setError(null)
       

       const abortCont= new AbortController();

       fetch(url,
       {
        method:'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newstudent)
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
        console.log("New Student Added");
        setisPending(false);
        //history.go(-1);
        history.push(`/admin/studentList`);
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

    <div className="addSaculty">
        <h2>Add Student</h2>
        <form onSubmit={(e)=>
        handleSubmit(e)
        }>

         <label >Student Name</label>
         <input 
         type="text"
         required
         value={studentName}
         onChange ={(e)=>
         setstudentName(e.target.value)
         } />

         <label >Age</label>
         <input 
         type="text"
         required
         value={studentAge}
         onChange ={(e)=>
         setstudentAge(e.target.value)
         } />

         <label >Gender</label>
         <input 
         type="text"
         required
         value={studentGender}
         onChange ={(e)=>
         setstudentGender(e.target.value)
         } />

         <label >Branch</label>
         <input 
         type="text"
         required
         value={studentBranch}
         onChange ={(e)=>
         setstudentBranch(e.target.value)
         } />

        <label >Password</label>
         <input 
         type="text"
         required
         value={studentPassword}
         onChange ={(e)=>
         setstudentPassword(e.target.value)
         } />

        {!isPending&&<button>Submit</button>}
        {error&&<div> {error} </div>}
        {isPending&&<button disabled>Submitting</button>}

        </form>
    </div>


     );
}
 
export default AdminAddStudent ;