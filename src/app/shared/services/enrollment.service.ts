import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';
import { StudentsService } from './students.service';
import { CourseService } from './course.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = `${environment.baseUrl}enrollments`;

  constructor(
    private http: HttpClient,
    private studentsService: StudentsService,
    private courseService: CourseService
  ) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl).pipe(
      switchMap(enrollments => {
        const observables = enrollments.map(enrollment => 
          forkJoin({
            student: this.studentsService.getStudentById(enrollment.studentId),
            course: this.courseService.getCourseById(enrollment.courseId)
          }).pipe(
            map(({ student, course }) => ({
              ...enrollment,
              student,
              course
            }))
          )
        );
        return forkJoin(observables);
      })
    );
  }

  addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, enrollment);
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${enrollment.id}`, enrollment);
  }

  deleteEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getStudentEnrollments(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?studentId=${studentId}`);
  }
}