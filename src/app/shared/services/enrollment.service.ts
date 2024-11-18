import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap, of, tap } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';
import { StudentsService } from './students.service';
import { CourseService } from './course.service';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = `${environment.baseUrl}enrollments`;

  constructor(private http: HttpClient,
    private studentsService: StudentsService,
    private courseService: CourseService
  ) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl).pipe(
      switchMap(enrollments => {
        if (enrollments.length === 0) return of([]);

        const studentIds = [...new Set(enrollments.map(e => e.studentId))];
        const courseIds = [...new Set(enrollments.map(e => e.courseId))];

        return forkJoin({
          students: this.studentsService.getStudentsByIds(studentIds),
          courses: this.courseService.getCoursesByIds(courseIds)
        }).pipe(
          map(({ students, courses }) => {
            const studentMap = new Map(students.map(s => [s.id, s]));
            const courseMap = new Map(courses.map(c => [c.id, c]));

            return enrollments.map(enrollment => ({
              ...enrollment,
              student: studentMap.get(enrollment.studentId),
              course: courseMap.get(enrollment.courseId)
            }));
          })
        );
      })
    );
  }

  addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    const enrollmentToSave = {
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      enrollmentDate: enrollment.enrollmentDate
    };
    return this.http.post<Enrollment>(this.apiUrl, enrollmentToSave);
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    const enrollmentToUpdate = {
      id: enrollment.id,
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      enrollmentDate: enrollment.enrollmentDate
    };
    return this.http.put<Enrollment>(`${this.apiUrl}/${enrollment.id}`, enrollmentToUpdate);
  }

  deleteEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getStudentEnrollments(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?studentId=${studentId}`);
  }

  getEnrollmentsByCourseId(courseId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?courseId=${courseId}`).pipe(
      switchMap(enrollments => {
        if (enrollments.length === 0) return of([]);
        
        const studentIds = [...new Set(enrollments.map(e => e.studentId))];
        return forkJoin(
          studentIds.map(id => 
            this.studentsService.getStudentById(id).pipe(
              map(student => student as Student)
            )
          )
        ).pipe(
          map(students => {
            const studentMap = new Map(students.map(s => [s.id, s]));
            return enrollments.map(enrollment => ({
              ...enrollment,
              student: studentMap.get(enrollment.studentId),
              studentName: studentMap.get(enrollment.studentId) 
                ? `${studentMap.get(enrollment.studentId)!.firstName} ${studentMap.get(enrollment.studentId)!.lastName}`
                : ''
            } as Enrollment));
          })
        );
      })
    );
  }

  getEnrollmentsByStudentId(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?studentId=${studentId}`).pipe(
      switchMap(enrollments => {
        if (enrollments.length === 0) return of([]);
        
        const courseIds = [...new Set(enrollments.map(e => e.courseId))];
        return forkJoin(
          courseIds.map(id => 
            this.courseService.getCourseById(id).pipe(
              map(course => course as Course)
            )
          )
        ).pipe(
          map(courses => {
            const courseMap = new Map(courses.map(c => [c.id, c]));
            return enrollments.map(enrollment => ({
              ...enrollment,
              course: courseMap.get(enrollment.courseId),
              courseName: courseMap.get(enrollment.courseId)?.name || ''
            } as Enrollment));
          })
        );
      })
    );
  }
}