import { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

const AdminFacultyCourseUpdateGrades = () => {
  const { facId, courseId, studId, studName, courseName } = useParams();
  const [grade, setGrade] = useState("");
  const [isPending, setisPending] = useState(false);
  const url = `http://localhost:8080/faculty/${facId}/courses/${courseId}/updateGrade/${studId}`;
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = { grade, studId, courseId };

    setisPending(true);

    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    }).then(() => {
      console.log("Grade Updated");
      setisPending(false);
      //history.go(-1);
      history.push(
        `/admin/facultyList/faculty/${facId}/courses/${courseId}/studentsEnrolled`
      );
    });
  };

  return (
    <div className="updateGrade">
      <div className="body login-body">
        <div className="container update-grade">
          <div className="brand-title">Update Grade</div>
          <div className="fac-title">
            <span className="name fac-id">{courseId}</span >
            <span className="name">{courseName}</span >
          </div>
          <div className="fac-title">
          <span className="name fac-id">{studId}</span >
            <span className="name">{studName}</span >
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* <label>Grade:</label> */}
            <div className="field-login">
              <input
                type="text"
                required
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Grade"
              />
            </div>
            {!isPending && <button>Update Grade</button>}
            {isPending && <button disabled>Updating Grade</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminFacultyCourseUpdateGrades;
