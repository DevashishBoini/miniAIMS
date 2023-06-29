import {useState,useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";

const AdminFacultyProfile= () => 
{
        const {facId}=useParams();

        const [info,setInfo]=useState(null);
        const [isPending,setisPending]=useState(true);
        const [error,setError]=useState(null);
        const url=`http://localhost:8080/faculty/${facId}`;
    
            
        
        useEffect(()=>{

        setError(null)
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
    
    
    





    
    
    return( 
      
      <div className="admin-faculty-profile">
        {isPending && <div>Loading...</div>}
        {error && <div> {error} </div>}
        {
            info &&
            <article>
              <title></title>
              <h1>Faculty Profile</h1>
              <h2>{info.name}</h2>
              <h2>Faculty ID:{info.fac_id}</h2>
              <h3>{info.department}</h3>
              <p>{info.age},{info.gender}</p>
              <Link to={`/admin/facultyList/faculty/${facId}/courses`}>
              <button>View your Courses</button>
              </Link>
            </article>
        }
      </div>  
    );
}
 
export default AdminFacultyProfile;