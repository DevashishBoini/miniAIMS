import {useState,useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";

const AdminFacultyList = () => {
    
    const [info,setInfo]=useState(null);
    const [isPending,setisPending]=useState(true);
    const [error,setError]=useState(null);
    const url=`http://localhost:8080/admin/facultyList`;

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




        

    const handleDelete=(facId) =>
    {
      fetch(`${url}/removeFaculty/${facId}`,{
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

      <div className='AdminFacultyList'>
        {isPending && <div>Loading...</div>}
        {error && <div> {error} </div>}
        {
            info &&
            <>
            <h2>Faculty List</h2>
            <table>
            <tr>
            <th>Faculty Id</th>
            <th>Faculty</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Remove</th>    
            </tr>
            
            {
                info.map((faculty) =>
                (
                    <tr key={faculty.fac_id}>
                    <th>{faculty.fac_id}</th>
                    <Link to={`/admin/facultyList/faculty/${faculty.fac_id}`}>
						  <th>{faculty.name}</th>
                    </Link>
						  <th>{faculty.age}</th>
                    <th>{faculty.gender}</th>
                    <th>{faculty.department}</th>
                    <th><button onClick={() =>
                    {
                      handleDelete(faculty.fac_id);
                    }
                    }>Remove</button>
                    </th>
                    </tr>
                )   
                )
            }
            </table>
            <Link to={`/admin/facultyList/addFaculty`}>
              <button >
               Add New Faculty
              </button>
              </Link>
            </>
        }

      </div>

     );
}
 
export default AdminFacultyList;