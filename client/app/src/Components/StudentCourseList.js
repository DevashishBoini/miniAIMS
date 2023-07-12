import {  useParams } from "react-router-dom/cjs/react-router-dom";

const StudentCourseList = (props) => {
  const courses = props.courses;
  const name = props.name;
  const url = props.url;

  const { studId } = useParams();

  const handleDelete = (studId, courseId) => {
    fetch(`${url}/dropCourse/${courseId}`, {
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
    <div className="studentcourselist">
      <h2 className="text">Course List</h2>
      <h2 className="name name-courselist">{name}</h2>
      <div className="table-container">
        <table className="neumorphic">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course</th>
              <th>Faculty</th>
              <th>Grade</th>
              <th>Remove</th>
            </tr>
          </thead>
          {courses.map((course) => (
            <tbody>
              <tr key={course.course_id}>
                <td>{course.course_id}</td>
                <td>{course.name}</td>
                <td>{course.faculty}</td>
                <td>{course.grade}</td>
                {course.status === "Active" && (
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(studId, course.course_id);
                      }}
                    >
                      Drop
                    </button>
                  </td>
                )}
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default StudentCourseList;
