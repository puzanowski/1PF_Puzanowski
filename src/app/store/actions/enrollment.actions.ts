import { createAction, props } from '@ngrx/store';
import { Enrollment } from '../../shared/models/enrollment.model';

// Load Enrollments
export const loadEnrollments = createAction('[Enrollments] Load Enrollments');
export const loadEnrollmentsSuccess = createAction(
  '[Enrollments] Load Enrollments Success',
  props<{ enrollments: Enrollment[] }>()
);
export const loadEnrollmentsFailure = createAction(
  '[Enrollments] Load Enrollments Failure',
  props<{ error: any }>()
);

// Add Enrollment
export const addEnrollment = createAction(
  '[Enrollments] Add Enrollment',
  props<{ enrollment: Enrollment }>()
);
export const addEnrollmentSuccess = createAction(
  '[Enrollments] Add Enrollment Success',
  props<{ enrollment: Enrollment }>()
);
export const addEnrollmentFailure = createAction(
  '[Enrollments] Add Enrollment Failure',
  props<{ error: any }>()
);

// Update Enrollment
export const updateEnrollment = createAction(
  '[Enrollments] Update Enrollment',
  props<{ enrollment: Enrollment }>()
);
export const updateEnrollmentSuccess = createAction(
  '[Enrollments] Update Enrollment Success',
  props<{ enrollment: Enrollment }>()
);
export const updateEnrollmentFailure = createAction(
  '[Enrollments] Update Enrollment Failure',
  props<{ error: any }>()
);

// Delete Enrollment
export const deleteEnrollment = createAction(
  '[Enrollments] Delete Enrollment',
  props<{ id: number }>()
);
export const deleteEnrollmentSuccess = createAction(
  '[Enrollments] Delete Enrollment Success',
  props<{ id: number }>()
);
export const deleteEnrollmentFailure = createAction(
  '[Enrollments] Delete Enrollment Failure',
  props<{ error: any }>()
);
