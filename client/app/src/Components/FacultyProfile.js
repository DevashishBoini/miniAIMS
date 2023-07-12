import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom";

const FacultyProfile = () => {
  const { facId } = useParams();

  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);
  const url = `http://localhost:8080/faculty/${facId}`;

  useEffect(() => {
    setError(null);
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("data couldn't be fetched");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setInfo(data);
        setisPending(false);
        setError(null);
      })
      .catch((err) => {
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
  }, [url]);

  return (
    <div className="faculty-profile">
      {isPending && <div>Loading...</div>}
      {error && <div> {error} </div>}
      <span className="text">Profile</span>
      {info && (
        <div className="container profile">
          <div className="fac-title">
            <span className="name fac-id">
              {/* Faculty ID: */}
              {info.fac_id}</span>
            <span className="name">{info.name}</span>
          </div>
          <span className="name fac-department">{info.department}</span>
          <p className="name fac-details">
            {info.age},{info.gender}
          </p>
          <Link to={`/faculty/${facId}/courses`}>
            <button className="view-btn">View your Courses</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FacultyProfile;
