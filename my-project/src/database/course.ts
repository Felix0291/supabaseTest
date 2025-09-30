// src/database/course.ts
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase.js";

export const getCourses = async () => {
  const query = supabase.from("courses").select("*");
  const courses: PostgrestSingleResponse<Course[]> = await query;
  return courses.data;
};

export const createCourse = async (course: NewCourse) => {
    const query = supabase.from("courses").insert(course).select().single();
    const response: PostgrestSingleResponse<Course> = await query;
    return response
}