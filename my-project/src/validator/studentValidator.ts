import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import slugify from "slugify";

const schema: z.ZodType<NewStudent> = z.object({
    first_name: z.string("First name is required"),
    last_name: z.string("Last name i required"),
    email: z.string("email required"),
    date_of_birth: z.string("Date of birth is required"),
    major: z.string().optional(),
    student_id: z.string().optional(),
    course_id: z.string().optional()
})

export const studentValidator = zValidator("json", schema, (result, c) => {
    if (!result.success) {
        return c.json({ error: result.error.issues }, 400)
    }
    if (!result.data.student_id) {
        result.data.student_id = slugify.default(result.data.email, {
            lower: true,
            strict: true,
        })
    } 
})

const studentQuerySchema: z.ZodType<StudentListQuery> = z.object({
    limit: z.coerce.number().optional().default(10),
    offset: z.coerce.number().optional().default(0),
    department: z.string().optional(),
    q: z.string().optional(),
    sort_by: z
      .union([z.literal("last_name"), z.literal("date_of_birth"), z.string()])
      .optional()
      .default("last_name"),
  });
  
  export const studentQueryValidator = zValidator("query", studentQuerySchema);