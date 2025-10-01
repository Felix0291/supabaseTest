interface NewStudent {
    student_id?: string;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    major?: string;
    course_id?: string

}

interface Student extends NewStudent {
    course_id: string;
}

type StudentListQuery = {
    limit?: number;
    offset?: number;
    department?: string;
    q?: string;
    sort_by?: "last_name" | "date_of_birth" | string;
};
