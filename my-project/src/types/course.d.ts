interface NewCourse {
    course_id?: string;
    title: string;
    instructor: string;
    credits: number;
    start_date?: string;
    end_date?: string;
    department?: string;
    description?: string;
}

interface Course extends NewCourse {
    course_id: string;
}

type CourseListQuery = {
    limit?: number;
    offset?: number;
    department?: string;
    q?: string;
    sort_by?: "title" | "start_date" | string;
};
