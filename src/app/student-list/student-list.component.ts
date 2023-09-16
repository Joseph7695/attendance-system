import { Component, OnInit } from '@angular/core';
import { Student, Teacher } from '../student';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  teachers: Teacher[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService
      .getStudents()
      .subscribe((students) => (this.students = students));
    this.personService
      .getTeachers()
      .subscribe((teachers) => (this.teachers = teachers));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.personService
      .addStudent({ firstName: name, personType: 'STUDENT' } as Student)
      .subscribe((student) => {
        this.students.push(student);
      });
  }
  addTeacher(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.personService
      .addTeacher({ firstName: name, personType: 'TEACHER' } as Teacher)
      .subscribe((teacher) => {
        if (teacher) {
          this.teachers.push(teacher);
        }
      });
  }

  delete(student: Student): void {
    this.students = this.students.filter((h) => h !== student);
    this.personService.deleteStudent(student.id).subscribe();
  }
}
