import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CourseService } from '../../shared/services/course.service';
import * as CourseActions from '../actions/course.actions';

@Injectable()
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CourseService
  ) {}

  loadCourses$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      mergeMap(() => this.coursesService.getCourses()
        .pipe(
          map(courses => CourseActions.loadCoursesSuccess({ courses })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error })))
        ))
    )
  );

  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.addCourse),
      mergeMap(({ course }) => this.coursesService.addCourse(course)
        .pipe(
          map(newCourse => CourseActions.addCourseSuccess({ course: newCourse })),
          catchError(error => of(CourseActions.addCourseFailure({ error })))
        ))
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.updateCourse),
      mergeMap(({ course }) => this.coursesService.updateCourse(course)
        .pipe(
          map(updatedCourse => CourseActions.updateCourseSuccess({ course: updatedCourse })),
          catchError(error => of(CourseActions.updateCourseFailure({ error })))
        ))
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.deleteCourse),
      mergeMap(({ id }) => this.coursesService.deleteCourse(Number(id))
        .pipe(
          map(() => CourseActions.deleteCourseSuccess({ id })),
          catchError(error => of(CourseActions.deleteCourseFailure({ error })))
        ))
    )
  );
}
