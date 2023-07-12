CREATE DATABASE db;
USE db;

CREATE TABLE admin_credentials
(
    admin_id INT NOT NULL,
    password VARCHAR(255) NOT NULL
    
);


CREATE TABLE faculty
(
    fac_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    department VARCHAR(255) NOT NULL
);

CREATE TABLE faculty_credentials
(
    fac_id INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (fac_id) REFERENCES faculty(fac_id) ON DELETE CASCADE
);

CREATE TABLE students
(
    stud_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    branch VARCHAR(255) NOT NULL
);

CREATE TABLE student_credentials
(
    stud_id INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (stud_id) REFERENCES students(stud_id) ON DELETE CASCADE
);


CREATE TABLE courses
(
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    fac_id INT,
    status VARCHAR(10) NOT NULL, 
    FOREIGN KEY(fac_id) REFERENCES faculty(fac_id) ON DELETE CASCADE
);

CREATE TABLE students_courses
(
    stud_id INT,
    course_id INT,
    grade VARCHAR(255) DEFAULT '-',
    FOREIGN KEY(stud_id) REFERENCES students(stud_id) ON DELETE CASCADE,
    FOREIGN KEY(course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

INSERT INTO admin_credentials (admin_id,password) VALUES (1,'admin');


--getStudentCourses
--  SELECT students_courses.course_id,courses.name,faculty.name, students_courses.grade
--  FROM students_courses
--  JOIN courses ON courses.course_id=students_courses.course_id
--  JOIN faculty ON faculty.fac_id=courses.fac_id
--  WHERE students_courses.course_id=6;

--  --StudentEnrollCourses Get
-- SELECT courses.course_id as course_id,courses.name as course, faculty.name as faculty
-- FROM courses
-- LEFT JOIN students_courses ON students_courses.course_id=courses.course_id
-- JOIN faculty ON faculty.fac_id=courses.fac_id
-- WHERE courses.status = 'Active'
-- AND courses.course_id NOT IN (
--   SELECT course_id
--   FROM students_courses
--   WHERE stud_id = 1
-- );

-- SELECT students_courses.stud_id as stud_id, students.name as name, students_courses.grade as grade
-- FROM students_courses
-- JOIN students ON students_courses.stud_id=students.stud_id
-- WHERE students_courses.course_id=1;
