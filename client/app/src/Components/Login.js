import { useEffect, useState } from "react";
import { useHistory,Redirect } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
  const [role, setRole] = useState('admin');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [isPending, setisPending] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const url = 'http://localhost:8080/login';

  
    const handleSubmit = (e) => {
      
      e.preventDefault();
      setisPending(true);
      setError(null);

      const abortCont = new AbortController();

      const obj= {Role:role,Id:id};
      const cook=JSON.stringify(obj);

      fetch(`${url}/${role}/${id}/${password}`, { signal: abortCont.signal })
        .then(res => {
          if (!res.ok) {
            throw Error("data couldn't be fetched");
          }
          return res.json();
        })
        .then(data => {
          console.log(data);
          if (data === true) 
          {
            Cookies.set('User', cook);

            if (role === "admin") {
                history.push(`/admin`);
            } 
            else if (role === "faculty" || role === "student") {
              history.push(`/${role}/${id}`);
            } 
            
            
          }
          else {
            alert('Incorrect Credentials, Please Retry');
          }
          

          setisPending(false);
          setError(null);
        })
        .catch(err => {
          if (err.name === "AbortError") {
            console.log("Fetch Aborted");
          } else {
            setisPending(false);
            setError(err.message);
          }
        });

      return () => {
        abortCont.abort();
      };
    };

    

    
  

  return (
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">admin</option>
          <option value="faculty">faculty</option>
          <option value="student">student</option>
        </select>

        <label>Id:</label>
        <input
          type="text"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="text"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isPending && <button>Submit</button>}
        {error && <div>{error}</div>}
        {isPending && <button disabled>Submitting</button>}
      </form>
    </div>
  );

  }
export default Login;