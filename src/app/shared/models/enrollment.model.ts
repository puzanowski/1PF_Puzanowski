import { Student } from './student.model';
import { Course } from './course.model';

// Tipo para crear/actualizar una inscripción
export interface EnrollmentCreate {
    id?: number;
    studentId: number;
    courseId: number;
    enrollmentDate: Date | string;
}

// Tipo para la inscripción con datos completos (como viene de la API)
export interface Enrollment extends EnrollmentCreate {
    student?: Student;
    course?: Course;
}

// Tipo para mostrar en la tabla (con nombres normalizados)
export interface EnrollmentDisplay extends EnrollmentCreate {
    studentName: string;
    courseName: string;
}