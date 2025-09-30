-- Create courses table
CREATE TABLE courses (
    course_id VARCHAR(255) PRIMARY KEY UNIQUE,
    title VARCHAR(255) NOT NULL,
    instructor VARCHAR(255) NOT NULL,
    credits INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    department VARCHAR(255),
    description TEXT
);


-- Insert data into courses table
INSERT INTO courses (course_id, title, instructor, credits, start_date, end_date, department, description) VALUES
('PGSQL-101', 'PostgreSQL for Beginners', 'Dr. Elin Svensson', 5, '2025-09-08', '2025-11-20', 'Computer Science', 'An introductory course to relational databases using PostgreSQL. Covers everything from basic queries to table design.'),
('WEBDEV-205', 'Modern Web Development', 'Dr. David Chen', 7, '2025-09-08', '2025-11-20', 'Computer Science', 'A project-based course on building modern, full-stack web applications with React and Node.js.'),
('HIST-101', 'Swedish History 101', 'Prof. Eva Lundström', 5, '2025-09-10', '2025-12-05', 'History', 'An introductory course to Swedish history. Covers everything from the Viking age to the present day.'),
('ALGO-301', 'Data Structures & Algorithms', 'Dr. Elin Svensson', 10, '2025-10-01', '2025-12-15', 'Computer Science', 'A course on data structures and algorithms. Covers everything from basic sorting and searching to more complex algorithms.'),
('MATH-101', 'Introduction to Mathematics', 'Dr. David Chen', 5, '2025-09-08', '2025-11-20', 'Mathematics', 'An introductory course to mathematics. Covers everything from basic algebra to calculus.');

