import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin">
        <div className="admin-content">
              <ul class="buttons">
                <div className="faculty-button">
                    <li>
                      <Link to="/admin/facultyList">
                        <span>Faculty</span>
                      </Link>
                    </li>
                </div>
                <div className="students-courses-button">
                    <li>
                      <Link to="/admin/studentList">
                        <span>Students</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/courseList">
                        <span>Courses</span>
                      </Link>
                    </li>
                </div>
              </ul>
          </div>
        </div>
  );
};

export default Admin;
