import { createReducer, on } from '@ngrx/store';
import { Enrollment } from '../../shared/models/enrollment.model';
import * as EnrollmentActions from '../actions/enrollment.actions';

export interface EnrollmentState {
  enrollments: Enrollment[];
  loading: boolean;
  error: any;
}

export const initialState: EnrollmentState = {
  enrollments: [],
  loading: false,
  error: null
};

export const enrollmentReducer = createReducer(
  initialState,
  
  // Load
  on(EnrollmentActions.loadEnrollments, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { enrollments }) => ({
    ...state,
    enrollments,
    loading: false
  })),
  
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
  
  on(EnrollmentActions.addEnrollmentSuccess, (state, { enrollment }) => ({
    ...state,
    enrollments: [...state.enrollments, enrollment],
    loading: false
  })),
  
  on(EnrollmentActions.addEnrollmentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Update
  on(EnrollmentActions.updateEnrollment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(EnrollmentActions.updateEnrollmentSuccess, (state, { enrollment }) => ({
    ...state,
    enrollments: state.enrollments.map(item => 
      item.id === enrollment.id ? enrollment : item
    ),
    loading: false
  })),
  
  on(EnrollmentActions.updateEnrollmentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Delete
  on(EnrollmentActions.deleteEnrollment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(EnrollmentActions.deleteEnrollmentSuccess, (state, { id }) => ({
    ...state,
    enrollments: state.enrollments.filter(enrollment => enrollment.id !== id),
    loading: false
  })),
  
  on(EnrollmentActions.deleteEnrollmentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
