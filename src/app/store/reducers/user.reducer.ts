import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../shared/models/user.model';
import * as UserActions from '../actions/user.actions';

export interface UserState extends EntityState<User> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  loading: false,
  error: null
});

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => 
    adapter.setAll(users, { ...state, loading: false })
  ),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(UserActions.addUser, state => ({
    ...state,
    loading: true
  })),
  on(UserActions.addUserSuccess, (state, { user }) =>
    adapter.addOne(user, { ...state, loading: false })
  ),
  on(UserActions.addUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(UserActions.updateUser, state => ({
    ...state,
    loading: true
  })),
  on(UserActions.updateUserSuccess, (state, { user }) =>
    adapter.updateOne(
      { id: user.id!, changes: user },
      { ...state, loading: false }
    )
  ),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(UserActions.deleteUser, state => ({
    ...state,
    loading: true
  })),
  on(UserActions.deleteUserSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
); 