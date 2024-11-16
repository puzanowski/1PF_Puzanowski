import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Student } from '../../shared/models/student.model';
import * as StudentActions from '../actions/student.actions';

export interface StudentState extends EntityState<Student> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialState: StudentState = adapter.getInitialState({
  loading: false,
  error: null
});

export const studentReducer = createReducer(
  initialState,
  // Load
  on(StudentActions.loadStudents, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StudentActions.loadStudentsSuccess, (state, { students }) => 
    adapter.setAll(students, { ...state, loading: false })
  ),
  on(StudentActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Add
  on(StudentActions.addStudent, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StudentActions.addStudentSuccess, (state, { student }) =>
    adapter.addOne(student, { ...state, loading: false })
  ),
  on(StudentActions.addStudentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Update
  on(StudentActions.updateStudent, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StudentActions.updateStudentSuccess, (state, { student }) =>
    adapter.updateOne(
      { id: student.id!, changes: student },
      { ...state, loading: false }
    )
  ),
  on(StudentActions.updateStudentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Delete
  on(StudentActions.deleteStudent, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StudentActions.deleteStudentSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(StudentActions.deleteStudentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);