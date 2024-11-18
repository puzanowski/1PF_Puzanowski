import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';

import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import * as UserActions from '../../../../store/actions/user.actions';
import * as UserSelectors from '../../../../store/selectors/user.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: []
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'username', 'role', 'actions'];
  isAdmin: boolean;

  constructor(
    private dialog: MatDialog,
    private store: Store<{ users: { users: User[], loading: boolean } }>,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.users$ = this.store.select(UserSelectors.selectAllUsers) as Observable<User[]>;
    this.loading$ = this.store.select(UserSelectors.selectUsersLoading);
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
  }

  openDialog(user?: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { user: user || {}, isNew: !user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.store.dispatch(UserActions.updateUser({ user: result }));
        } else {
          this.store.dispatch(UserActions.addUser({ user: result }));
        }
      }
    });
  }

  deleteUser(user: User) {
    if (!this.isAdmin) return;
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de que quieres eliminar al usuario ${user.username}?`,
        onConfirm: () => {
          this.store.dispatch(UserActions.deleteUser({ id: user.id! }));
          this.snackBar.open(
            'El usuario fue eliminado correctamente',
            'Cerrar',
            {
              duration: 3000,
              panelClass: ['success-snackbar'],
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        }
      }
    });
  }
} 