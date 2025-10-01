import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase.js";
import type { PaginatedListResponse } from "../types/global.js";

export async function getStudents(
    query: StudentListQuery
  ): Promise<PaginatedListResponse<Student>> {
    // Säkerhetskontroll för sortering
    const sortable = new Set(["last_name", "date_of_birh"]);
    const order = query.sort_by
      ? sortable.has(query.sort_by)
        ? query.sort_by
        : "last_name"
      : "last_name";
  
    // Beräkna paginering
    const startIndex = query.offset || 0;
    const endIndex = startIndex + (query.limit || 10) - 1;
  
    // Bygg grundläggande query
    const _query = supabase
      .from("students")
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
      _query.or(`last_name.ilike.%${query.q}%,date_of_birth.ilike.%${query.q}%`);
    }
  
    // Utför query
    const students: PostgrestSingleResponse<Student[]> = await _query;
  
    // Returnera paginerat svar
    return {
      data: students.data || [],
      count: students.count || 0,
      offset: query.offset || 0,
      limit: query.limit || 10,
    };
  }