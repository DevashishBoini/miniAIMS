import React,{ useState,useEffect } from "react";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Navbar = () => {
    
    const k = Cookies.get('User');
    const cookie=JSON.parse(k);

    const history=useHistory();

    const [role,setRole] = useState('');
    const [id,setId]=useState('');

    useEffect(()=>
    {
     setRole(cookie.Role)
     setId(cookie.Id)
    },[cookie.Role,cookie.Id]);

    const link = role === "admin" ? "/admin" : `/${role}/${id}`;

    const handleLogout=(e) =>
    {
        e.preventDefault();
        Cookies.remove('User')
        history.push("/login")

    }



    return ( 



        <nav className="navbar">
            <Link to={link}>
               IIT H
            </Link>
            <button onClick={handleLogout}>
               Logout 
            </button>
        </nav>
     );
}
 
export default Navbar;