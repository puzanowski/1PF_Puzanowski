import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from '../reducers/enrollment.reducer';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollments');

export const selectAllEnrollments = createSelector(
  selectEnrollmentState,
  state => Object.values(state.entities)
);

export const selectEnrollmentsLoading = createSelector(
  selectEnrollmentState,
  state => state.loading
);

export const selectEnrollmentsError = createSelector(
  selectEnrollmentState,
  state => state.error
);

export const selectEnrollmentById = (id: number) => createSelector(
  selectEnrollmentState,
  state => state.entities[id]
);
