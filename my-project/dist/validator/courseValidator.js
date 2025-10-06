import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import slugify from "slugify";
const schema = z.object({
    title: z.string("Title is required"),
    instructor: z.string("Instructor is required"),
    credits: z.number("Credits is required"),
    course_id: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    department: z.string().optional(),
    description: z.string().optional(),
});
export const courseValidator = zValidator("json", schema, (result, c) => {
    if (!result.success) {
        return c.json({ errors: result.error.issues }, 400);
    }
    if (!result.data.course_id) {
        result.data.course_id = slugify.default(result.data.title, {
            lower: true,
            strict: true,
        });
    }
});
const courseQuerySchema = z.object({
    limit: z.coerce.number().optional().default(10),
    offset: z.coerce.number().optional().default(0),
    department: z.string().optional(),
    q: z.string().optional(),
    sort_by: z
        .union([z.literal("title"), z.literal("start_date"), z.string()])
        .optional()
        .default("title"),
});
export const courseQueryValidator = zValidator("query", courseQuerySchema);
