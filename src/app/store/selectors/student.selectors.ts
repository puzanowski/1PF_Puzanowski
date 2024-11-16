import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { StudentState } from '../reducers/student.reducer';
import * as fromStudent from '../reducers/student.reducer';
import { Student } from '../../shared/models/student.model';

export const selectStudentState = createFeatureSelector<StudentState>('students');

export const selectAllStudents = createSelector(
    selectStudentState,
    state => Object.values(state.entities)
  );
  

export const selectStudentsLoading = createSelector(
  selectStudentState,
  state => state.loading
);

export const selectStudentsError = createSelector(
  selectStudentState,
  state => state.error
);

export const selectStudentById = (id: number) => createSelector(
  selectStudentState,
  state => state.entities[id]
);
