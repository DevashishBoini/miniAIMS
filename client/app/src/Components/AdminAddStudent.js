import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AdminAddStudent = () => {
  const [studentName, setstudentName] = useState("");
  const [studentAge, setstudentAge] = useState("");
  const [studentGender, setstudentGender] = useState("");
  const [studentBranch, setstudentBranch] = useState("");
  const [studentPassword, setstudentPassword] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setisPending] = useState(false);

  const history = useHistory();
  const url = `http://localhost:8080/admin/addStudent`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newstudent = {
      studentName,
      studentAge,
      studentGender,
      studentBranch,
      studentPassword,
    };

    setisPending(true);
    setError(null);

    const abortCont = new AbortController();

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newstudent),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("error occured during the post request");
        }
        return resp;
      })
      .then((resp) => {
        console.log("New Student Added");
        setisPending(false);
        //history.go(-1);
        history.push(`/admin/studentList`);
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
    <div className="addSaculty">
      <div className="body new-body">
        <div className="container">
          <div className="brand-title">NEW STUDENT</div>
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* <label>Student Name</label> */}
            <div className="field-login">
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setstudentName(e.target.value)}
                placeholder="Student Name"
              />
            </div>
            {/* <label>Age</label> */}
            <div className="field-login">
              <input
                type="text"
                required
                value={studentAge}
                onChange={(e) => setstudentAge(e.target.value)}
                placeholder="Age"
              />
            </div>
            {/* <label>Gender</label> */}
            <div className="field-login">
              <input
                type="text"
                required
                value={studentGender}
                onChange={(e) => setstudentGender(e.target.value)}
                placeholder="Gender"

              />
            </div>
            {/* <label>Branch</label> */}
            <div className="field-login">
              <input
                type="text"
                required
                value={studentBranch}
                onChange={(e) => setstudentBranch(e.target.value)}
                placeholder="Branch"
              />
            </div>
            {/* <label>Password</label> */}
            <div className="field-login">
              <input
                type="text"
                required
                value={studentPassword}
                onChange={(e) => setstudentPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            {!isPending && <button className="submit-button">Submit</button>}
            {error && <div> {error} </div>}
            {isPending && <button disabled>Submitting</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddStudent;
