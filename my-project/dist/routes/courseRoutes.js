import { Hono } from "hono";
import { courseValidator, courseQueryValidator, } from "../validator/courseValidator.js";
import * as db from "../database/course.js";
import { HTTPException } from "hono/http-exception";
import { supabase } from '../lib/supabase.js';
const courseApp = new Hono();
//Hämtar all Courses
courseApp.get("/", courseQueryValidator, async (c) => {
    const query = c.req.valid("query");
    try {
        const courses = await db.getCourses(query);
        return c.json(courses);
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        return c.json({
            data: [],
            count: 0,
            offset: query.offset || 0,
            limit: query.limit || 10,
        }, 500);
    }
});
//Hämtar Course via ID
courseApp.get("/:id", async (c) => {
    const { id } = c.req.param();
    const course = await db.getCourseById(id);
    if (!course) {
        throw new HTTPException(404, { message: "Course not found" });
    }
    return c.json(course, 200);
});
//Skapar en ny Course
courseApp.post("/", courseValidator, async (c) => {
    const newCourse = c.req.valid("json");
    const response = await db.createCourse(newCourse);
    if (response.error) {
        throw new HTTPException(400, {
            res: c.json({ error: response.error.message }, 400),
        });
    }
    const course = response.data;
    return c.json(course, 201);
});
//Uppdaterar en Course
courseApp.put("/:id", courseValidator, async (c) => {
    const { id } = c.req.param();
    const newCourse = c.req.valid("json");
    const course = await db.updateCourse(id, newCourse);
    if (!course) {
        console.error("Course not found");
        throw new HTTPException(404, {
            res: c.json({ error: "Course not found" }, 404),
        });
    }
    return c.json(course, 200);
});
//Tar bort Course
courseApp.delete("/:id", courseValidator, async (c) => {
    const { id } = c.req.param();
    const deletedCourse = await db.deleteCourse(id);
    if (!deletedCourse) {
        console.error("Course nor found");
        throw new HTTPException(404, {
            res: c.json({ error: "Course not found" }, 404),
        });
    }
    return c.json(deletedCourse, 200);
});
export default courseApp;
