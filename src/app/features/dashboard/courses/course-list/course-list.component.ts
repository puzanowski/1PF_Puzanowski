import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Course } from '../../../../shared/models/course.model';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import * as CourseActions from '../../../../store/actions/course.actions';
import { selectAllCourses, selectCoursesLoading } from '../../../../store/selectors/course.selectors';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  courses$ = this.store.select(selectAllCourses);
  loading$ = this.store.select(selectCoursesLoading);
  isAdmin = true;
  displayedColumns: string[] = ['id', 'name', 'description', 'quantity', 'assignedProfessor', 'details'];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.currentUser?.role === 'admin';
    
    if (this.isAdmin) {
      this.displayedColumns.push('actions');
    }
  }

  ngOnInit() {
    this.store.dispatch(CourseActions.loadCourses());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDialog(course?: Course) {
    if (!this.isAdmin) return;

    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '400px',
      data: { course: course || {}, isNew: !course }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.store.dispatch(CourseActions.updateCourse({ course: result }));
        } else {
          this.store.dispatch(CourseActions.addCourse({ course: result }));
        }
      }
    });
  }

  deleteCourse(course: Course) {
    if (!this.isAdmin) return;
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de que quieres eliminar el curso ${course.name}?`,
        onConfirm: () => {
          this.store.dispatch(CourseActions.deleteCourse({ id: course.id! }));
          this.store.dispatch(CourseActions.loadCourses());
          this.snackBar.open(
            'El curso fue eliminado correctamente',
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