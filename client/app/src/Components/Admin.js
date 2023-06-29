import {useState,useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";

const Admin = () => 
{
    return ( 

    <div className="Admin">
     <Link to="/admin/facultyList">
     <button>
      Faculty List  
     </button>
     </Link>
     <Link to="/admin/studentList">
     <button>
      Student List  
     </button>
     </Link>
     <Link to="/admin/courseList">
     <button>
      Course List  
     </button>
     </Link>


    </div>

     );
}
 
export default Admin;



