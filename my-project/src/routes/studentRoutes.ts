import { Hono } from "hono";
import * as db from "../database/student.js";
import { HTTPException } from "hono/http-exception";
import type { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from '../lib/supabase.js'
import { studentQueryValidator, studentValidator } from "../validator/studentValidator.js";

const studentApp = new Hono()

studentApp.get("/", studentQueryValidator, async (c) => {
    const query = c.req.valid("query");
    try {
      const student = await db.getStudents(query);
      return c.json(student);
    } catch (error) {
      console.error("Error fetching courses:", error);
      return c.json(
        {
          data: [],
          count: 0,
          offset: query.offset || 0,
          limit: query.limit || 10,
        },
        500
      );
    }
  });

studentApp.get("/:id", async (c) => {
    const {id} = c.req.param()
    const student = await db.getStudentById(id)
    if (!student) {
        throw new HTTPException(400, {message: "Student not found"})
    }
    return c.json(student, 200)
})


studentApp.post("/", studentValidator, async (c) => {
    const newStudent: NewStudent = c.req.valid("json");
    const response: PostgrestSingleResponse<Student> = await db.createStudent(
      newStudent
    );
    if (response.error) {
      throw new HTTPException(400, {
        res: c.json({ error: response.error.message }, 400),
      });
    }
    const student: Student = response.data;
    return c.json(student, 201);
  })

  studentApp.put("/:id", studentValidator, async (c) => {
    const { id } = c.req.param();
    const newStudent: NewStudent = c.req.valid("json");
    const student = await db.updateStudent(id, newStudent);
    if (!student) {
        console.error("Course not found");
        throw new HTTPException(404, {
          res: c.json({ error: "Course not found" }, 404),
        });
      }
      return c.json(student, 200);
});

studentApp.delete("/:id", studentValidator, async (c) => {
    const {id} = c.req.param()
    const deletedStudent = await db.deleteStudent(id)
    if (!deletedStudent) {
        console.error("Student not deleted")
        throw new HTTPException(400, {
            res: c.json({error: "Student not deleted"}, 400)
        })
    }
    return c.json(deletedStudent, 200)
})




export default studentApp;