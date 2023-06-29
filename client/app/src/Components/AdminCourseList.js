import {useState,useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";


const AdminCourseList = () => {
    
        const [info,setInfo]=useState(null);
        const [isPending,setisPending]=useState(true);
        const [error,setError]=useState(null);
        const url=`http://localhost:8080/admin/courseList`;



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




    return ( 
     <div className="AdminCourseList">
       {isPending && <div>Loading...</div>}
          {error && <div> {error} </div>}
          {
            info &&
            <>
            <h1>All Courses List</h1>
            <table>
                <tr>
                    <th>Course ID</th>
                    <th>Course </th>
                    <th>Faculty ID</th>
                    <th>Faculty</th>
                </tr>
                {
                    info.map((course) =>
                    (
                      <tr key={course.course_id}>
                        <th>{course.course_id}</th>
                        <th>{course.course_name}</th>
                        <th>{course.fac_id}</th>
                        <th>{course.fac_name}</th>
                      </tr>
                    )
                    )
                }
            </table>
            </>
          } 
     </div>



     );
}
 
export default AdminCourseList;