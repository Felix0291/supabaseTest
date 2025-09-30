import { Hono } from "hono";
// import {
//   courseValidator,
//   courseQueryValidator,
// } from "../validators/courseValidator.js";
// import * as db from "../database/course.js";
import { HTTPException } from "hono/http-exception";
import type { PostgrestError } from "@supabase/supabase-js";

import { supabase } from '../lib/supabase.js'
const courseApp = new Hono()

courseApp.get("/", async (c) => {
  try {
    const response = await supabase.from("courses").select("*");
    return c.json(response);
  } catch (error) {
    return c.json([]);
  }
});

export default courseApp;
