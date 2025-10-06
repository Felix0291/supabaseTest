// src/database/course.ts
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase.js";
import type { PaginatedListResponse } from "../types/global.js";


//Hämtar Courses
// export const getCourses = async () => {
//   const query = supabase.from("courses").select("*");
//   const courses: PostgrestSingleResponse<Course[]> = await query;
//   return courses.data;
// };

export async function getCourses(
  query: CourseListQuery
): Promise<PaginatedListResponse<Course>> {
  // Säkerhetskontroll för sortering
  const sortable = new Set(["title", "start_date"]);
  const order = query.sort_by
    ? sortable.has(query.sort_by)
      ? query.sort_by
      : "title"
    : "title";

  // Beräkna paginering
  const startIndex = query.offset || 0;
  const endIndex = startIndex + (query.limit || 10) - 1;

  // Bygg grundläggande query
  const _query = supabase
    .from("courses")
    .select("*", { count: "exact" })
    .order(order, { ascending: true })
    .range(startIndex, endIndex);

  // Lägg till filter för avdelning
  if (query.department) {
    _query.eq("department", query.department);
  }

  // Lägg till textsökning
  if (query.q) {
    // Enkel sökning i title
    // _query.ilike("title", `%${query.q}%`);

    // Avancerad sökning i flera kolumner
    _query.or(`title.ilike.%${query.q}%,description.ilike.%${query.q}%`);
  }

  // Utför query
  const courses: PostgrestSingleResponse<Course[]> = await _query;

  // Returnera paginerat svar
  return {
    data: courses.data || [],
    count: courses.count || 0,
    offset: query.offset || 0,
    limit: query.limit || 10,
  };
}

//Hämtar Course via ID
export async function getCourseById(id: string): Promise<Course | null> {
  const query = supabase.from("courses").select("*").eq("course_id", id).single();
  const response: PostgrestSingleResponse<Course> = await query;
  return response.data;
}

//Skapar en ny Course
export const createCourse = async (course: NewCourse) => {
    const query = supabase.from("courses").insert(course).select().single();
    const response: PostgrestSingleResponse<Course> = await query;
    return response
}

//Uppdaterar Course
export async function updateCourse(id: string, course: NewCourse): Promise<Course | null> {
  const courseWithoutId: NewCourse = {
    ...course,
    course_id: undefined
  }  
  const query = supabase.from("courses").update(courseWithoutId).eq("course_id", id).select().single();
  const response: PostgrestSingleResponse<Course> = await query;
  return response.data;
}

//Tar bort Course
export async function deleteCourse(id:string): Promise<Course | null> {
  const query = supabase.from("courses").delete().eq("course_id", id).select().single()
  const respone: PostgrestSingleResponse<Course> = await query;
  return respone.data;
}