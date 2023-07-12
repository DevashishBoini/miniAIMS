import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminStudentList = () => {
  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);
  const url = `http://localhost:8080/admin/studentList`;

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
    fetch(`${url}/removeStudent/${studId}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Delete request failed");
        }

        window.location.reload();
      })
      .then(() => console.log("Faculty Removed"));
  };

  return (
    <div className="AdminStudentList">
      {isPending && <div>Loading...</div>}
      {error && <div> {error} </div>}
      {info && (
        <>
          <h2 className="text">Student List</h2>
          <div className="table-container">
            <table className="neumorphic">
              <thead>
                <tr>
                  <th>Student Id</th>
                  <th>Student</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Branch</th>
                  <th>Remove</th>
                </tr>
              </thead>

              {info.map((student) => (
                <tbody>
                  <tr key={student.stud_id}>
                    <td>{student.stud_id}</td>
                    <Link to={`/admin/studentList/students/${student.stud_id}`} className="-link">
                      <td>{student.name}</td>
                    </Link>
                    <td>{student.age}</td>
                    <td>{student.gender}</td>
                    <td>{student.branch}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleDelete(student.stud_id);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <div className="add-btn">
            <Link to={`/admin/studentList/addStudents`}>
              <button>Add New Student</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminStudentList;
