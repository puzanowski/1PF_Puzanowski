import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentsService } from './students.service';
import { Student } from '../models/student.model';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentsService]
    });

    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve students from the API via GET', () => {
    const mockStudents: Student[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
    ];

    service.getStudents().subscribe((students) => {
      expect(students.length).toBe(2);
      expect(students).toEqual(mockStudents);
    });

    const req = httpMock.expectOne('http://localhost:3000/students');
    expect(req.request.method).toBe('GET');
    req.flush(mockStudents);
  });

  it('should add a student via POST', () => {
    const newStudent: Student = { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' };

    service.addStudent(newStudent).subscribe((student) => {
      expect(student).toEqual(newStudent);
    });

    const req = httpMock.expectOne('http://localhost:3000/students');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newStudent);
    req.flush(newStudent);
  });

  it('should update a student via PUT', () => {
    const updatedStudent: Student = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe.updated@example.com' };

    service.updateStudent(updatedStudent).subscribe((student) => {
      expect(student).toEqual(updatedStudent);
    });

    const req = httpMock.expectOne('http://localhost:3000/students/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedStudent);
    req.flush(updatedStudent);
  });  
});
