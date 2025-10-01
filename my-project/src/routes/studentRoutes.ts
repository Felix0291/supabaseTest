import { Hono } from "hono";
import * as db from "../database/student.js";
import { HTTPException } from "hono/http-exception";
import type { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from '../lib/supabase.js'
import { studentQueryValidator } from "../validator/studentValidator.js";

const studentApp = new Hono()




studentApp.get("/", studentQueryValidator, async (c) => {
    const query = c.req.valid("query");
    try {
      const courses = await db.getStudents(query);
      return c.json(courses);
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

export default studentApp;