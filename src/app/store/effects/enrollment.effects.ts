import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EnrollmentService } from '../../shared/services/enrollment.service';
import * as EnrollmentActions from '../actions/enrollment.actions';

@Injectable()
export class EnrollmentEffects {
  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      mergeMap(() => 
        this.enrollmentService.getEnrollments().pipe(
          map(enrollments => EnrollmentActions.loadEnrollmentsSuccess({ enrollments })),
          catchError(error => of(EnrollmentActions.loadEnrollmentsFailure({ error })))
        )
      )
    );
  });

  addEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.addEnrollment),
      mergeMap(({ enrollment }) => 
        this.enrollmentService.addEnrollment(enrollment).pipe(
          map(newEnrollment => EnrollmentActions.addEnrollmentSuccess({ enrollment: newEnrollment })),
          catchError(error => of(EnrollmentActions.addEnrollmentFailure({ error })))
        )
      )
    );
  });

  updateEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.updateEnrollment),
      mergeMap(({ enrollment }) => 
        this.enrollmentService.updateEnrollment(enrollment).pipe(
          map(updatedEnrollment => EnrollmentActions.updateEnrollmentSuccess({ enrollment: updatedEnrollment })),
          catchError(error => of(EnrollmentActions.updateEnrollmentFailure({ error })))
        )
      )
    );
  });

  deleteEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.deleteEnrollment),
      mergeMap(({ id }) => 
        this.enrollmentService.deleteEnrollment(id).pipe(
          map(() => EnrollmentActions.deleteEnrollmentSuccess({ id })),
          catchError(error => of(EnrollmentActions.deleteEnrollmentFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private enrollmentService: EnrollmentService
  ) {}
}
