import { createAction, props } from '@ngrx/store';
import { Course } from '../../shared/models/course.model';

// Load Courses
export const loadCourses = createAction('[Courses] Load Courses');
export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);
export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: any }>()
);

// Add Course
export const addCourse = createAction(
  '[Courses] Add Course',
  props<{ course: Course }>()
);
export const addCourseSuccess = createAction(
  '[Courses] Add Course Success',
  props<{ course: Course }>()
);
export const addCourseFailure = createAction(
  '[Courses] Add Course Failure',
  props<{ error: any }>()
);

// Update Course
export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ course: Course }>()
);
export const updateCourseSuccess = createAction(
  '[Courses] Update Course Success',
  props<{ course: Course }>()
);
export const updateCourseFailure = createAction(
  '[Courses] Update Course Failure',
  props<{ error: any }>()
);

// Delete Course
export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: number }>()
);
export const deleteCourseSuccess = createAction(
  '[Courses] Delete Course Success',
  props<{ id: number }>()
);
export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: any }>()
);
