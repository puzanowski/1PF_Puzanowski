import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { StudentsService } from '../../shared/services/students.service';
import * as StudentActions from '../actions/student.actions';

@Injectable()
export class StudentEffects {
  loadStudents$ = createEffect(() => 
    this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      mergeMap(() => this.studentsService.getStudents()
        .pipe(
          map(students => StudentActions.loadStudentsSuccess({ students })),
          catchError(error => of(StudentActions.loadStudentsFailure({ error: error.message })))
        ))
    )
  );

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.addStudent),
      mergeMap(({ student }) => this.studentsService.addStudent(student)
        .pipe(
          map(newStudent => StudentActions.addStudentSuccess({ student: newStudent })),
          catchError(error => of(StudentActions.addStudentFailure({ error: error.message })))
        ))
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.updateStudent),
      mergeMap(({ student }) => this.studentsService.updateStudent(student)
        .pipe(
          map(updatedStudent => StudentActions.updateStudentSuccess({ student: updatedStudent })),
          catchError(error => of(StudentActions.updateStudentFailure({ error: error.message })))
        ))
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.deleteStudent),
      mergeMap(({ id }) => this.studentsService.deleteStudent(id)
        .pipe(
          map(() => StudentActions.deleteStudentSuccess({ id: id.toString() })),
          catchError(error => of(StudentActions.deleteStudentFailure({ error: error.message })))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private studentsService: StudentsService
  ) {}
}