import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentDialogComponent } from './student-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StudentDialogComponent', () => {
  let component: StudentDialogComponent;
  let fixture: ComponentFixture<StudentDialogComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close') 
  };

  const mockDialogData = {
    student: {
      firstName: 'Stan',
      lastName: 'Lee',
      email: 'stan.lee@marvel.com'
    },
    isNew: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientModule, ReactiveFormsModule, MatDialogModule, BrowserAnimationsModule ],
      declarations: [StudentDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(StudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with provided data', () => {
    expect(component.studentForm.value).toEqual({
      firstName: 'Stan',
      lastName: 'Lee',
      email: 'stan.lee@marvel.com'
    });
  });

  it('should call dialogRef.close with student data on submit', () => {
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      firstName: 'Stan',
      lastName: 'Lee',
      email: 'stan.lee@marvel.com'
    });
  });

  it('should call dialogRef.close without data on cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
