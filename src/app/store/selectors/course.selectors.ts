import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from '../reducers/course.reducer';

export const selectCourseState = createFeatureSelector<CourseState>('courses');

export const selectAllCourses = createSelector(
  selectCourseState,
  state => Object.values(state.entities)
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  state => state.loading
);

export const selectCoursesError = createSelector(
  selectCourseState,
  state => state.error
);

export const selectCourseById = (id: number) => createSelector(
  selectCourseState,
  state => state.entities[id]
);