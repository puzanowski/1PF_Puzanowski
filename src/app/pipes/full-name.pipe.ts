import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models/student.model';

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {
  transform(student: Student): string {
    return `${student.lastName}, ${student.firstName}`;
  }
}