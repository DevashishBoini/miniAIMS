import { useState, useEffect } from "react";
import {useParams } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom";

const AdminFacultyCourseEnrolledStudents = () => {
  const { facId, courseId } = useParams();

  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  const url = `http://localhost:8080/faculty/${facId}/courses/${courseId}/studentsEnrolled`;

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

  const handleDelete = (studId) => {
    fetch(`${url}/unEnrollStudent/${studId}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Delete request failed");
        }

        window.location.reload();
      })
      .then(() => console.log("Unenrolled from the course"));
  };

  return (
    <div className="FacultyCourseEnrolledList">
      {isPending && <div>Loading...</div>}
      {error && <div> {error} </div>}
      {info && (
        <>
          <div className="name-courselist">
            <span className="name">{info.facultyName.name}</span>
            <span className="name">Course: {info.courseName.name}</span>
          </div>
          <div className="table-container">
            <table className="neumorphic">
              <thead>
                <tr>
                  <th>Student Id</th>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Remove Student</th>
                  <th>Update Grade</th>
                </tr>
              </thead>
              {info.Students.map((student) => (
                <tbody>
                  <tr key={student.stud_id}>
                    <td>{student.stud_id}</td>
                    <td>{student.name}</td>
                    <td>{student.grade}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleDelete(student.stud_id);
                        }}
                      >
                        UnEnroll
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/admin/facultyList/faculty/${facId}/courses/${courseId}/studentsEnrolled/updateGrade/${info.courseName.name}/${student.stud_id}/${student.name}`}
                        className="-link"
                      >
                        <button>Update</button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminFacultyCourseEnrolledStudents;
