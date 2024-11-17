import { createAction, props } from '@ngrx/store';
import { Enrollment } from '../../shared/models/enrollment.model';

export const loadEnrollments = createAction(
  '[Enrollment] Load Enrollments'
);

export const loadEnrollmentsSuccess = createAction(
  '[Enrollment] Load Enrollments Success',
  props<{ enrollments: Enrollment[] }>()
);

export const loadEnrollmentsFailure = createAction(
  '[Enrollment] Load Enrollments Failure',
  props<{ error: any }>()
);

export const addEnrollment = createAction(
  '[Enrollment] Add Enrollment',
  props<{ enrollment: Enrollment }>()
);

export const addEnrollmentSuccess = createAction(
  '[Enrollment] Add Enrollment Success',
  props<{ enrollment: Enrollment }>()
);

export const addEnrollmentFailure = createAction(
  '[Enrollment] Add Enrollment Failure',
  props<{ error: any }>()
);

export const updateEnrollment = createAction(
  '[Enrollment] Update Enrollment',
  props<{ enrollment: Enrollment }>()
);

export const updateEnrollmentSuccess = createAction(
  '[Enrollment] Update Enrollment Success',
  props<{ enrollment: Enrollment }>()
);

export const updateEnrollmentFailure = createAction(
  '[Enrollment] Update Enrollment Failure',
  props<{ error: any }>()
);

export const deleteEnrollment = createAction(
  '[Enrollment] Delete Enrollment',
  props<{ id: number }>()
);

export const deleteEnrollmentSuccess = createAction(
  '[Enrollment] Delete Enrollment Success',
  props<{ id: number }>()
);

export const deleteEnrollmentFailure = createAction(
  '[Enrollment] Delete Enrollment Failure',
  props<{ error: any }>()
);
