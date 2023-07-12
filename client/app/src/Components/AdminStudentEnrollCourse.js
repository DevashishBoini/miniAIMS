import { useState, useEffect } from "react";
import {useParams } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom";

const AdminStudentEnrollCourse = () => {
  const { studId } = useParams();

  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  const url = `http://localhost:8080/student/${studId}/courses/enrollNewCourses`;

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

  const handleEnroll = (studId, course_id) => {
    const newCourse = { studId, course_id };

    setisPending(true);
    setError(null);

    const abortCont = new AbortController();

    fetch(`${url}/${course_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("error occured during the post request");
        }
        return resp;
      })
      .then((resp) => {
        console.log("New Course Added");
        setisPending(false);
        //history.go(-1);
        //  history.push(`/student/${studId}/courses/enrollNewCourses`);
        window.location.reload();
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Post Aborted");
        } else {
          setisPending(false);
          setError(error.message);
        }
      });

    return () => {
      abortCont.abort();
    };
  };

  return (
    <div className="CoursesAvailableList">
      {isPending && <div>Loading...</div>}
      {error && <div> {error} </div>}
      {info && (
        <>
          <h2 className="text">Available Course List</h2>
          <h2 className="name name-courselist">{info.StudentName.name}</h2>
          <div className="table-container">
            <table className="neumorphic">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course</th>
                  <th>Faculty</th>
                  <th>Enroll</th>
                </tr>
              </thead>
              {info.AvailableCourses.map((course) => (
                <tbody>
                  <tr key={course.id}>
                    <th>{course.course_id}</th>
                    <th>{course.course}</th>
                    <th>{course.faculty}</th>
                    <th>
                      <button
                        onClick={() => {
                          handleEnroll(studId, course.course_id);
                        }}
                      >
                        Enroll
                      </button>
                    </th>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <Link to={`/admin/studentList/students/${studId}/courses`} >
            <button className="add-btn">Back To your Courses</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AdminStudentEnrollCourse;
