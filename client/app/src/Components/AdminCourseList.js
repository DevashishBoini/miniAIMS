import {useState,useEffect} from 'react';

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
            <h2 className='text'>All Courses List</h2>
            <div className="table-container">
              <table className="neumorphic">
                  <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course </th>
                        <th>Faculty ID</th>
                        <th>Faculty</th>
                    </tr>
                  </thead>
                  {
                      info.map((course) =>
                      (
                        <tbody>
                          <tr key={course.course_id}>
                            <td>{course.course_id}</td>
                            <td>{course.course_name}</td>
                            <td>{course.fac_id}</td>
                            <td>{course.fac_name}</td>
                          </tr>
                        </tbody>
                      )
                      )
                  }
              </table>
            </div>
            </>
          } 
     </div>



     );
}
 
export default AdminCourseList;