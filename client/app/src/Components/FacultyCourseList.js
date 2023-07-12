import { useState } from "react";
import { Link } from "react-router-dom";
import {useParams } from "react-router-dom/cjs/react-router-dom";

const FacultyCourseList = (props) => {
  const courses = props.courses;
  const name = props.name;
  const url = props.url;
  const { facId } = useParams();

  const [error, setError] = useState(null);
  const [isPending, setisPending] = useState(false);

  const handleDelete = (courseId) => {
    fetch(`${url}/${courseId}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Delete request failed");
        }

        window.location.reload();
      })
      .then(() => console.log("Course Removed"));
  };

  const handleToggle = (courseId) => {
    const Toggle = { courseId };

    setisPending(true);
    setError(null);

    const abortCont = new AbortController();

    fetch(`${url}/${courseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Toggle),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("error occured during the post request");
        }
        return resp;
      })
      .then((resp) => {
        console.log("Status Updated");
        setisPending(false);
        //history.go(-1);
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
    <div className="facultycourselist">
      {isPending && <div>Loading...</div>}
      {error && <div> {error} </div>}
      {courses && (
        <>
          <h2 className="text">Course List</h2>
          <h2 className="name name-courselist">{name}</h2>
          <div className="table-container">
            <table className="neumorphic">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Remove</th>
                </tr>
              </thead>
              {courses.map((course) => (
                <tbody>
                  <tr key={course.course_id}>
                    <td>{course.course_id}</td>
                    <Link
                      to={`/faculty/${facId}/courses/${course.course_id}/studentsEnrolled`}
                      className="-link"
                    >
                      <td>{course.name}</td>
                    </Link>
                    <td>
                      <button
                        onClick={() => {
                          handleToggle(course.course_id);
                        }}
                      >
                        {course.status}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleDelete(course.course_id);
                        }}
                      >
                        Delete
                      </button>
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

export default FacultyCourseList;
