import { Student } from './student.model';
import { Course } from './course.model';

export interface Enrollment {
    id?: number;
    studentId: number;
    courseId: number;
    enrollmentDate: Date;
    student?: Student;
    course?: Course;
  }