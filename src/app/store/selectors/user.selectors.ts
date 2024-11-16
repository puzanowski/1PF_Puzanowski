import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, adapter } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const {
  selectIds,
  selectEntities,
  selectAll: selectAllUsers,
  selectTotal,
} = adapter.getSelectors(selectUserState);

export const selectUsersLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUsersError = createSelector(
  selectUserState,
  (state: UserState) => state.error
); 