import { useState, useEffect } from "react";
import {useParams } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom";
import AdminStudentCourseList from "./AdminStudentCourseList";

const AdminStudentCourses = () => {
  const { studId } = useParams();

  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);
  const url = `http://localhost:8080/student/${studId}/courses`;

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
    <div className="AdminStudentCourseList">
      {isPending && <div>Loading...</div>}
      {error && <div> {error} </div>}
      {info && (
        <>
          <AdminStudentCourseList
            courses={info.StudentCourses}
            name={info.StudentName.name}
            url={url}
          />
          <Link
            to={`/admin/studentList/students/${studId}/courses/enrollNewCourses`}
          >
            <button className="add-btn">Enroll New Courses</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AdminStudentCourses;
