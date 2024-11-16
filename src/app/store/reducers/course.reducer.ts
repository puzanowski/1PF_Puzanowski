import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Course } from '../../shared/models/course.model';
import * as CourseActions from '../actions/course.actions';

export interface CourseState extends EntityState<Course> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialState: CourseState = adapter.getInitialState({
  loading: false,
  error: null
});

export const courseReducer = createReducer(
  initialState,
  // Load
  on(CourseActions.loadCourses, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => 
    adapter.setAll(courses, { ...state, loading: false })
  ),
  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Add
  on(CourseActions.addCourse, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CourseActions.addCourseSuccess, (state, { course }) =>
    adapter.addOne(course, { ...state, loading: false })
  ),
  on(CourseActions.addCourseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Update
  on(CourseActions.updateCourse, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CourseActions.updateCourseSuccess, (state, { course }) =>
    adapter.updateOne(
      { id: course.id!, changes: course },
      { ...state, loading: false }
    )
  ),
  on(CourseActions.updateCourseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Delete
  on(CourseActions.deleteCourse, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CourseActions.deleteCourseSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(CourseActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
