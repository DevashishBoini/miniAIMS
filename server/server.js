import express from 'express'
import cors from 'cors'

import {getFacultyProfile,getStudentProfile,getFacultyCourses,FacultyAddCourse,FacultyDropCourse,getStudentCourses,getAvailableCourses,StudentEnrollNewCourse, StudentUnEnrollCourse,getCourseStudentsEnrolled,FacultyUpdateCourseStatus,FacultyUpdateCourseGrade,getAdminFacultyList,AdminDropFaculty,AdminAddFaculty,getAdminStudentList,AdminDropStudent,AdminAddStudent,getAdminCourseList,getLastInsertedFacultyId,insertFacultyCredentials,getLastInsertedStudentId,insertStudentCredentials,getAdminCredentials,getFacultyCredentials,getStudentCredentials} from './database.js'

const app=express()
app.use(express.json())
app.use(cors())
const port=8080

app.get("/login/:role/:id/:pass" , async(req,res) =>
{
  const role=req.params.role
  const id=req.params.id
  const pass=req.params.pass

  switch(role)
  {
    case "admin":
        const val_a= await getAdminCredentials(id)
        if(val_a[0].password===pass) { res.send('true') }
        else {res.send('false')}
           break;
    case "faculty":
        const val_f=await getFacultyCredentials(id)
        if(val_f[0].password===pass) { res.send('true') }
        else {res.send('false')}
            break;     
    case "student":
        const val_s= await getStudentCredentials(id)
        if(val_s[0].password===pass) { res.send('true') }
        else {res.send('false')}
            break;              
  }
}
)


app.get( "/admin/courseList", async(req,res) => 
{
    const info = await getAdminCourseList()
    
    res.send(info)
})


app.get("/admin/facultyList", async(req,res) => 
{
    const info = await getAdminFacultyList()
    
    res.send(info)
})

app.delete("/admin/facultyList/removeFaculty/:fac_id", async(req,res) =>
{
    const fac_id=req.params.fac_id

    await AdminDropFaculty(fac_id)
    res.status(204).send('Faculty Removed')

})

app.post("/admin/addFaculty", async(req,res) =>
{
  const {facultyName,facultyAge,facultyGender,facultyDepartment,facultyPassword}= req.body

  await AdminAddFaculty(facultyName,facultyAge,facultyGender,facultyDepartment)

  const val=await getLastInsertedFacultyId()

  const facultyId =val[0].fac_id

  await insertFacultyCredentials(facultyId,facultyPassword)


  res.status(201).send('Faculty added Successfully')

}
)



app.get( "/admin/studentList", async(req,res) => 
{
    const info = await getAdminStudentList()
    
    res.send(info)
})

app.delete("/admin/studentList/removeStudent/:stud_id", async(req,res) =>
{
    const stud_id=req.params.stud_id

    await AdminDropStudent(stud_id)
    res.status(204).send('Student Removed')

})

app.post("/admin/addStudent", async(req,res) =>
{
  const {studentName,studentAge,studentGender,studentBranch,studentPassword}= req.body
  await AdminAddStudent(studentName,studentAge,studentGender,studentBranch)

  const val=await getLastInsertedStudentId()
  const studentId=val[0].stud_id

  await insertStudentCredentials(studentId,studentPassword)

  res.status(201).send('Student added Successfully')

})


app.get( "/faculty/:fac_id", async(req,res) => 
{
    const fac_id=req.params.fac_id
    const info = await getFacultyProfile(fac_id)
    
    res.send(info)
})




app.get( "/faculty/:fac_id/courses", async(req,res) => 
{
    const fac_id=req.params.fac_id
    const info = await getFacultyCourses(fac_id)
    
    res.send(info)
})




app.delete("/faculty/:fac_id/courses/:course_id/studentsEnrolled/unEnrollStudent/:stud_id", async(req,res) =>
{
    const studId=req.params.stud_id
    const courseId=req.params.course_id

    await StudentUnEnrollCourse(studId,courseId)
    res.status(204).send('UnEnrollment Successful')

})

app.put("/faculty/:fac_id/courses/:course_id", async(req,res) =>
{
    const courseId=req.params.course_id

    await FacultyUpdateCourseStatus(courseId)
    res.status(201).send('Post Successful')

})


app.delete("/faculty/:fac_id/courses/:courseId", async(req,res) =>
{
    const courseId=req.params.courseId

    await FacultyDropCourse(courseId)
    res.status(204).send('Course Removed')

})


app.post("/faculty/:fac_id/courses", async(req,res) =>
{
  const {courseName,facId,courseStatus}= req.body
  await FacultyAddCourse(courseName,facId,courseStatus)
  res.status(201).send('Post Successful')

}
)

app.get( "/faculty/:fac_id/courses/:course_id/studentsEnrolled", async(req,res) => 
{
    const {fac_id,course_id}=req.params
    const info = await getCourseStudentsEnrolled(fac_id,course_id)
    
    res.send(info)
    // console.log('gfh')
    // console.log({info.courseName.name})
    
})

app.put("/faculty/:facId/courses/:courseId/updateGrade/:studId" , async(req,res) =>
{
    const {grade,studId,courseId}=req.body
    await FacultyUpdateCourseGrade(grade,studId,courseId)
    res.status(200).send('Update Successful')
}
)


app.get( "/student/:stud_id", async(req,res) => 
{
    try{
    const stud_id=req.params.stud_id
    const info = await getStudentProfile(stud_id)
    
    res.send(info)
    
    }
    catch(err)
    {
        console.log(error.stack);
        res.status(500).send("Internal Server Error");  
    }
})

app.get( "/student/:stud_id/courses", async(req,res) => 
{
    const stud_id=req.params.stud_id
    const info = await getStudentCourses(stud_id)
    
    res.send(info)
})

app.delete("/student/:studId/courses/dropCourse/:courseId", async(req,res) =>
{
    const {studId,courseId}=req.params;
    await StudentUnEnrollCourse(studId,courseId)

    res.status(204).send('UnEnrollment Successful')
})

app.get("/student/:studId/courses/enrollNewCourses", async(req,res) =>
{
    const stud_id=req.params.studId
    const info = await getAvailableCourses(stud_id)

    res.send(info)

})

app.post("/student/:studId/courses/enrollNewCourses/:courseId", async(req,res) =>
{
    const {studId,courseId}=req.params;
    await StudentEnrollNewCourse(studId,courseId)

    res.status(201).send('Post Successful')

})

// app.post("/notes",async (req,res) =>
// {
//   const {title, contents } = req.body 
//   const note =await createNote(title,  contents)
//   res.status(201).send(note) 
// }
// ) 





app.listen(port,() =>
{
 console.log(`Server is running on port ${port}`)
})