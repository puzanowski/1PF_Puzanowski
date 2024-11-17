import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from '../reducers/enrollment.reducer';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollments');

export const selectAllEnrollments = createSelector(
  selectEnrollmentState,
  (state) => state.enrollments
);

export const selectEnrollmentsLoading = createSelector(
  selectEnrollmentState,
  (state) => state.loading
);

export const selectEnrollmentError = createSelector(
  selectEnrollmentState,
  (state) => state.error
);

export const selectEnrollmentById = (id: number) => createSelector(
  selectAllEnrollments,
  (enrollments) => enrollments.find(enrollment => enrollment.id === id)
);

export const selectEnrollmentsTotal = createSelector(
  selectAllEnrollments,
  (enrollments) => enrollments.length
);
