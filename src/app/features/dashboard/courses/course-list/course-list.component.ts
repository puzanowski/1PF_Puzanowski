import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../../../shared/models/course.model';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import * as CourseActions from '../../../../store/actions/course.actions';
import * as CourseSelectors from '../../../../store/selectors/course.selectors';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'name', 'description', 'quantity', 'assignedProfessor'];
  isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private store: Store<any>,
    private authService: AuthService
  ) {
    this.courses$ = this.store.select(CourseSelectors.selectAllCourses) as Observable<Course[]>;
    this.loading$ = this.store.select(CourseSelectors.selectCoursesLoading);
    this.isAdmin = this.authService.currentUser?.role === 'admin';
    
    if (this.isAdmin) {
      this.displayedColumns.push('actions');
    }
  }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.store.dispatch(CourseActions.loadCourses());
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
    
    if (confirm(`¿Estás seguro de que quieres eliminar el curso ${course.name}?`)) {
      this.store.dispatch(CourseActions.deleteCourse({ id: course.id! }));
    }
  }
}