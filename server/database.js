import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PSWD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getAdminCredentials(id) {
  const value = await pool.query(
    `SELECT password from admin_credentials where admin_id=?`,
    [id]
  );
  const cred = value[0];
  return cred;
}
export async function getFacultyCredentials(id) {
  const value = await pool.query(
    `SELECT password from faculty_credentials where fac_id=?`,
    [id]
  );
  const cred = value[0];
  return cred;
}
export async function getStudentCredentials(id) {
  const value = await pool.query(
    `SELECT password from student_credentials where stud_id=?`,
    [id]
  );
  const cred = value[0];
  return cred;
}

export async function getAdminCourseList() {
  const value =
    await pool.query(`SELECT courses.course_id as course_id, courses.name as course_name,courses.fac_id as fac_id,faculty.name as fac_name
    FROM courses
    JOIN faculty ON courses.fac_id=faculty.fac_id
    ORDER by courses.fac_id`);
  const AdminCourseList = value[0];
  return AdminCourseList;
}

export async function getAdminFacultyList() {
  const value = await pool.query(`SELECT * FROM faculty`);
  const AdminFacultyList = value[0];
  return AdminFacultyList;
}

export async function AdminDropFaculty(fac_id) {
  await pool.query(
    `DELETE FROM faculty
    WHERE fac_id=?`,
    [fac_id]
  );
}

export async function AdminAddFaculty(
  facultyName,
  facultyAge,
  facultyGender,
  facultyDepartment,
  facultyPassword
) {
  await pool.query(
    `INSERT INTO faculty (name,age,gender,department)
        VALUES(?,?,?,?)`,
    [facultyName, facultyAge, facultyGender, facultyDepartment]
  );
}

export async function getLastInsertedFacultyId() {
  const res = await pool.query(`SELECT fac_id FROM faculty
    ORDER BY fac_id DESC
    LIMIT 1`);
  const facultyId = res[0];
  return facultyId;
}

export async function insertFacultyCredentials(facId, facPassword) {
  await pool.query(
    `INSERT INTO faculty_credentials (fac_id,password) VALUES (?,?)`,
    [facId, facPassword]
  );
}

export async function getAdminStudentList() {
  const value = await pool.query(`SELECT * FROM students`);
  const AdminStudentList = value[0];
  return AdminStudentList;
}

export async function AdminDropStudent(stud_id) {
  await pool.query(
    `DELETE FROM students
    WHERE stud_id=?`,
    [stud_id]
  );
}

export async function AdminAddStudent(
  studentName,
  studentAge,
  studentGender,
  studentBranch
) {
  await pool.query(
    `INSERT INTO students (name,age,gender,branch)
        VALUES(?,?,?,?)`,
    [studentName, studentAge, studentGender, studentBranch]
  );
}

export async function getLastInsertedStudentId() {
  const res = await pool.query(`SELECT stud_id FROM students
    ORDER BY stud_id DESC
    LIMIT 1`);
  const studentId = res[0];
  return studentId;
}

export async function insertStudentCredentials(studId, studPassword) {
  await pool.query(
    `INSERT INTO student_credentials (stud_id,password) VALUES (?,?)`,
    [studId, studPassword]
  );
}

export async function getFacultyProfile(fac_id) {
  const [facultyProfile] = await pool.query(
    `SELECT * FROM faculty WHERE fac_id=?`,
    [fac_id]
  );
  return facultyProfile[0];
}

export async function getFacultyCourses(fac_id) {
  const value = await pool.query(`SELECT * FROM courses WHERE fac_id=?`, [
    fac_id,
  ]);
  const facultyCourses = value[0];

  const [facultyName] = await pool.query(
    `SELECT faculty.name FROM faculty WHERE fac_id=?`,
    [fac_id]
  );

  return { facultyCourses: facultyCourses, facultyName: facultyName[0] };
}

export async function getCourseStudentsEnrolled(fac_id, course_id) {
  const value = await pool.query(
    `SELECT students_courses.stud_id as stud_id, students.name as name, students_courses.grade as grade
    FROM students_courses
    JOIN students ON students_courses.stud_id=students.stud_id
    WHERE students_courses.course_id=?
    ORDER BY students_courses.stud_id;`,
    [course_id]
  );
  const Students = value[0];

  const [facultyName] = await pool.query(
    `SELECT faculty.name  FROM faculty WHERE fac_id=?`,
    [fac_id]
  );

  const [courseName] = await pool.query(
    `SELECT courses.name FROM courses WHERE course_id=?`,
    [course_id]
  );

  return {
    Students: Students,
    facultyName: facultyName[0],
    courseName: courseName[0],
  };
}

export async function FacultyAddCourse(courseName, facId, courseStatus) {
  await pool.query(
    `INSERT INTO courses (name,fac_id,status)
        VALUES(?,?,?)`,
    [courseName, facId, courseStatus]
  );
}

export async function FacultyUpdateCourseStatus(course_id) {
  await pool.query(
    `UPDATE courses
        SET courses.status = 
        CASE
        WHEN courses.status = 'Active' THEN 'Inactive'
        ELSE 'Active'
        END
        WHERE courses.course_id=?`,
    [course_id]
  );
}

export async function FacultyUpdateCourseGrade(grade, stud_id, course_id) {
  await pool.query(
    `UPDATE students_courses
        SET students_courses.grade =?
        WHERE students_courses.stud_id=? AND students_courses.course_id=?`,
    [grade, stud_id, course_id]
  );
}

export async function FacultyDropCourse(course_id) {
  await pool.query(
    `DELETE FROM courses
    WHERE course_id=?`,
    [course_id]
  );
}

export async function getStudentProfile(stud_id) {
  const [studentProfile] = await pool.query(
    `SELECT * FROM students WHERE stud_id=?`,
    [stud_id]
  );
  return studentProfile[0];
}

export async function getStudentCourses(stud_id) {
  const value = await pool.query(
    ` SELECT students_courses.course_id as course_id,courses.name as name,faculty.name as faculty, students_courses.grade as grade,
    courses.status as status
    FROM students_courses
    JOIN courses ON courses.course_id=students_courses.course_id
    JOIN faculty ON faculty.fac_id=courses.fac_id
    WHERE students_courses.stud_id=?
    ORDER BY students_courses.course_id`,
    [stud_id]
  );
  const StudentCourses = value[0];

  const [StudentName] = await pool.query(
    `SELECT name FROM students WHERE stud_id=?`,
    [stud_id]
  );

  return { StudentCourses: StudentCourses, StudentName: StudentName[0] };
}

export async function StudentUnEnrollCourse(stud_id, course_id) {
  await pool.query(
    `DELETE FROM students_courses 
    WHERE stud_id=? AND course_id=?`,
    [stud_id, course_id]
  );
}

export async function getAvailableCourses(studId) {
  const result = await pool.query(
    `SELECT courses.course_id as course_id,courses.name as course, faculty.name as faculty
        FROM courses
        LEFT JOIN students_courses ON students_courses.course_id=courses.course_id
        JOIN faculty ON faculty.fac_id=courses.fac_id
        WHERE courses.status = 'Active'
        AND courses.course_id NOT IN 
        (
          SELECT course_id
          FROM students_courses
          WHERE stud_id = ?
        )
        ORDER BY courses.course_id`,
    [studId]
  );

  const AvailableCourses = result[0];

  const [StudentName] = await pool.query(
    `SELECT name FROM students WHERE stud_id=?`,
    [studId]
  );

  return { AvailableCourses: AvailableCourses, StudentName: StudentName[0] };
}

export async function StudentEnrollNewCourse(studId, courseId) {
  const [result] = await pool.query(
    `INSERT INTO students_courses (stud_id,course_id)
        VALUES(?,?)`,
    [studId, courseId]
  );
}
