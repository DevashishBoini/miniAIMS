import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import Navbar from '../Components/Navbar'; 
import {Switch} from "react-router-dom";


const ProtectedRoute = ({children}) => {
    
    const cookie=Cookies.get('User');
    

    if(cookie)
    {
        return(
            <>
            <Navbar />
             <Switch>
             {children}
             </Switch>
            </>
        )
    }

    else
    {
        return(
            
            <Redirect to="/login" />
        )
    }
    
    
    
}
 
export default ProtectedRoute;