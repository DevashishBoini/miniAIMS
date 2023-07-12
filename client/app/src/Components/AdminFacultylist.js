import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminFacultyList = () => {
  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);
  const url = `http://localhost:8080/admin/facultyList`;

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

  const handleDelete = (facId) => {
    fetch(`${url}/removeFaculty/${facId}`, {
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
    <div className="AdminFacultyList">
      {isPending && <div>Loading...</div>}
      {error && <div> {error} </div>}
      {info && (
        <>
          <h2 className="text">Faculty List</h2>
          <div className="table-container">
            <table className="neumorphic">
              <thead>
                <tr>
                  <th>Faculty Id</th>
                  <th>Faculty</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th>Remove</th>
                </tr>
              </thead>
              {info.map((faculty) => (
                <tbody>
                  <tr key={faculty.fac_id}>
                    <td>{faculty.fac_id}</td>
                    <Link to={`/admin/facultyList/faculty/${faculty.fac_id}`} className="-link">
                      <td>{faculty.name}</td>
                    </Link>
                    <td>{faculty.age}</td>
                    <td>{faculty.gender}</td>
                    <td>{faculty.department}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleDelete(faculty.fac_id);
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
            <Link to={`/admin/facultyList/addFaculty`}>
              <button>Add New Faculty</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminFacultyList;
