import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StudentListComponent } from './student-list.component';
import { MatTableModule } from '@angular/material/table';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from '../../../../core/services/auth.service';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;
  const initialState = {
    students: {
      students: [],
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentListComponent],
      imports: [HttpClientModule, MatTableModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: AuthService,
          useValue: {
            currentUser: { role: 'admin' }
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
