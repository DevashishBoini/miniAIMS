import {useState,useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";


const AdminAddFaculty = () => {
   
    const[facultyName,setfacultyName]=useState('')
    const[facultyAge,setfacultyAge]=useState('')
    const[facultyGender,setfacultyGender]=useState('')
    const[facultyDepartment,setfacultyDepartment]=useState('')
    const[facultyPassword,setfacultyPassword]=useState('')
    const[error, setError] = useState(null)
    const[isPending,setisPending]=useState(false)
   
    const history=useHistory()
    const url=`http://localhost:8080/admin/addFaculty`;



    const handleSubmit= (e)=>
    {
       
       
       e.preventDefault(); 
       const newFaculty= {facultyName,facultyAge,facultyGender,facultyDepartment,facultyPassword};

       setisPending(true)
       setError(null)
       

       const abortCont= new AbortController();

       fetch(url,
       {
        method:'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newFaculty)
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
        console.log("New Faculty Added");
        setisPending(false);
        //history.go(-1);
        history.push(`/admin/facultyList`);
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

    <div className="addFaculty">
        <h2>Add Faculty</h2>
        <form onSubmit={(e)=>
        handleSubmit(e)
        }>

         <label >Faculty Name</label>
         <input 
         type="text"
         required
         value={facultyName}
         onChange ={(e)=>
         setfacultyName(e.target.value)
         } />

         <label >Age</label>
         <input 
         type="text"
         required
         value={facultyAge}
         onChange ={(e)=>
         setfacultyAge(e.target.value)
         } />

         <label >Gender</label>
         <input 
         type="text"
         required
         value={facultyGender}
         onChange ={(e)=>
         setfacultyGender(e.target.value)
         } />

         <label >Department</label>
         <input 
         type="text"
         required
         value={facultyDepartment}
         onChange ={(e)=>
         setfacultyDepartment(e.target.value)
         } />

         <label >Password</label>
         <input 
         type="text"
         required
         value={facultyPassword}
         onChange ={(e)=>
         setfacultyPassword(e.target.value)
         } />

        {!isPending&&<button>Submit</button>}
        {error&&<div> {error} </div>}
        {isPending&&<button disabled>Submitting</button>}

        </form>
    </div>


     );
}
 
export default AdminAddFaculty;