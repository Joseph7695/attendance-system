import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService
      .getStudents()
      .subscribe((students) => (this.students = students));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.studentService
      .addStudent({ firstName: name } as Student)
      .subscribe((student) => {
        this.students.push(student);
      });
  }

  delete(student: Student): void {
    this.students = this.students.filter((h) => h !== student);
    this.studentService.deleteStudent(student.id).subscribe();
  }
}
