import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnrollmentListComponent } from './enrollment-list.component';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from '../../../../core/services/auth.service';

describe('EnrollmentListComponent', () => {
  let component: EnrollmentListComponent;
  let fixture: ComponentFixture<EnrollmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule],
      declarations: [EnrollmentListComponent],
      providers: [provideMockStore(), AuthService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrollmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
