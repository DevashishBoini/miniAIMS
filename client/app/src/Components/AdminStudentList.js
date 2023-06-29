import {useState,useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";


const AdminStudentList = () => {
   
    const [info,setInfo]=useState(null);
    const [isPending,setisPending]=useState(true);
    const [error,setError]=useState(null);
    const url=`http://localhost:8080/admin/studentList`;
   

    useEffect(()=>{

        const abortCont= new AbortController();

        fetch(url, {signal: abortCont.signal}).then(res =>{
    
        if(!res.ok)
        {
            throw Error("data couldn't be fetched");
        }
        return res.json();
        }
        ).then((data)=>
        {
          console.log(data);
          setInfo(data);  
          setisPending(false);
          setError(null);
        }
        ).catch((err) =>
          {
            if(err.name==="AbortError")
            {
                console.log("Fetch Aborted");
            }
            
            else
            {
                setisPending(false);
                setError(err.message);
            }
            
          })

          return () => {
          abortCont.abort();  
          }
        },[url]);





        const handleDelete=(studId) =>
    {
      fetch(`${url}/removeStudent/${studId}`,{
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
        console.log('Faculty Removed')
      )
    }




   
    return ( 

        <div className='AdminStudentList'>
        {isPending && <div>Loading...</div>}
        {error && <div> {error} </div>}
        {
            info &&
            <>
            <h2>Student List</h2>
            <table>
            <tr>
            <th>Student Id</th>
            <th>Student</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Branch</th>
            <th>Remove</th>    
            </tr>
            
            {
                info.map((student) =>
                (
                    <tr key={student.stud_id}>
                    <th>{student.stud_id}</th>
                    <Link to={`/admin/studentList/students/${student.stud_id}`}>
						  <th>{student.name}</th>
                    </Link>
						  <th>{student.age}</th>
                    <th>{student.gender}</th>
                    <th>{student.branch}</th>
                    <th><button onClick={() =>
                    {
                      handleDelete(student.stud_id);
                    }
                    }>Remove</button>
                    </th>
                    </tr>
                )   
                )
            }
            </table>
            <Link to={`/admin/studentList/addStudents`}>
              <button >
               Add New Student
              </button>
              </Link>
            </>
        }

      </div>

     );
}
 
export default AdminStudentList;