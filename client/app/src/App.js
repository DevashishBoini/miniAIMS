import React from 'react';
import {BrowserRouter as Router ,Route,Switch} from "react-router-dom";
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import StudentRoutes from './Components/StudentRoutes';
import FacultyRoutes from './Components/FacultyRoutes';
import AdminRoutes from './Components/AdminRoutes';



function App() {
  document.title ="AIMS"
  return (
    <Router>
    <div className="App">

    <Switch>

    <Route exact path="/login">
    <Login />
    </Route>

    <Route exact path="/" >
     <Login />
     </Route> 

     <ProtectedRoute>
       <Route path="/faculty" component={FacultyRoutes} />
       <Route path="/admin" component={AdminRoutes} />
       <Route path="/student" component={StudentRoutes} />
    </ProtectedRoute>
    
   
    </Switch>

    </div>
    </Router>
    
  );
}

export default App;
