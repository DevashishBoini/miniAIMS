import { useState, useEffect } from "react";
import {useParams } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom";
import AdminFacultyCourseList from "./AdminFacultyCourseList";

const FacultyCourses = () => {
  const { facId } = useParams();

  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);
  const url = `http://localhost:8080/faculty/${facId}/courses`;

  useEffect(() => {
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
    <div className="FacultyCourseList">
      {isPending && <div>Loading...</div>}
      {error && <div> {error} </div>}
      {info && (
        <>
          <AdminFacultyCourseList
            courses={info.facultyCourses}
            name={info.facultyName.name}
            url={url}
          />
          <Link to={`/admin/facultyList/faculty/${facId}/courses/addCourse`}>
            <button className="add-btn">Add Course</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default FacultyCourses;
