import { Component, OnInit } from '@angular/core';

import { Lesson } from '../lesson';
import { LessonService } from '../services/lesson.service';
import { Person, Student, Teacher } from '../student';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[] = [];
  teachers: Teacher[] = [
    // <Teacher>{ id: '1', firstName: 'teat' },
    // <Teacher>{ id: '2', firstName: 'teat' },
    // <Teacher>{ id: '3', firstName: 'teat' },
    // <Teacher>{ id: '4', firstName: 'teat' },
  ];
  students: Student[] = [
    // <Student>{ id: '1', firstName: 'teat' },
    // <Student>{ id: '2', firstName: 'teat' },
    // <Student>{ id: '3', firstName: 'teat' },
    // <Student>{ id: '4', firstName: 'teat' },
  ];
  selectedPersons: Person[] = [];
  newLesson: Lesson = <Lesson>{};
  constructor(
    private lessonService: LessonService,
    private studentService: PersonService
  ) {}

  ngOnInit(): void {
    this.getLessons();
    this.studentService
      .getStudents()
      .subscribe((stud) => (this.students = stud));
    this.studentService
      .getTeachers()
      .subscribe((stud) => (this.teachers = stud));
  }

  personClicked(person: Person) {
    let index = this.selectedPersons.findIndex((x) => x == person);
    if (index > -1) {
      this.selectedPersons.splice(index, 1);
    } else {
      this.selectedPersons.push(person);
    }
    // if (person.personType == 'TEACHER') {
    //   console.log('teacher');
    //   ;
    //   if ( == -1) {
    //     this.selectedPersons.push(person);
    //   }else{
    //     this.selectedPersons
    //   }
    // }
    // if (person.personType == 'STUDENT') {
    //   console.log('student');
    //   this.selectedPersons.push(person);
    // }
  }

  getLessons(): void {
    this.lessonService
      .getLessons()
      .subscribe((lessons) => (this.lessons = lessons));
  }

  createLesson(): void {
    this.newLesson.teachers = this.selectedPersons.filter(
      (x) => x.personType == 'TEACHER'
    );
    this.newLesson.students = this.selectedPersons.filter(
      (x) => x.personType == 'STUDENT'
    );
    console.log({ lesson: this.newLesson });
    // name = name.trim();
    // if (!name) {
    //   return;
    // }
    this.lessonService.addLesson(this.newLesson).subscribe((lesson) => {
      this.lessons.push(lesson);
    });
  }

  delete(lesson: Lesson): void {
    this.lessons = this.lessons.filter((h) => h !== lesson);
    this.lessonService.deleteLesson(lesson.id).subscribe();
  }
}
