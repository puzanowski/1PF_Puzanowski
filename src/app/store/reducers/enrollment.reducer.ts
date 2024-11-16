import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Enrollment } from '../../shared/models/enrollment.model';
import * as EnrollmentActions from '../actions/enrollment.actions';

export interface EnrollmentState extends EntityState<Enrollment> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Enrollment> = createEntityAdapter<Enrollment>();

export const initialState: EnrollmentState = adapter.getInitialState({
  loading: false,
  error: null
});

export const enrollmentReducer = createReducer(
  initialState,
  // Load
  on(EnrollmentActions.loadEnrollments, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { enrollments }) => 
    adapter.setAll(enrollments, { ...state, loading: false })
  ),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Add
  on(EnrollmentActions.addEnrollment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EnrollmentActions.addEnrollmentSuccess, (state, { enrollment }) =>
    adapter.addOne(enrollment, { ...state, loading: false })
  ),
  on(EnrollmentActions.addEnrollmentFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Update
  on(EnrollmentActions.updateEnrollment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EnrollmentActions.updateEnrollmentSuccess, (state, { enrollment }) =>
    adapter.updateOne(
      { id: enrollment.id!, changes: enrollment },
      { ...state, loading: false }
    )
  ),
  on(EnrollmentActions.updateEnrollmentFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Delete
  on(EnrollmentActions.deleteEnrollment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EnrollmentActions.deleteEnrollmentSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(EnrollmentActions.deleteEnrollmentFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
