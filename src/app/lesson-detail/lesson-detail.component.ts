import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Lesson } from '../lesson';
import { LessonService } from '../lesson.service';
import { Student } from '../student';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
})
export class LessonDetailComponent implements OnInit {
  lesson: Lesson | undefined;
  attendingStudents: Student[] = [];

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getLesson();
  }

  attendLesson(student: Student): void {
    if (this.attendingStudents.find((x) => student)) {
      console.log(true);
    } else {
      this.attendingStudents.push(student);
      console.log(false);
    }
  }

  unattendLesson(student: Student): void {
    let index = this.attendingStudents.findIndex((x) => student);
    if (index > -1) {
      this.attendingStudents.splice(index, 1);
    }
  }

  getLesson(): void {
    // const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    const id: string = this.route.snapshot.paramMap.get('id') ?? '';
    this.lessonService.getLesson(id).subscribe((lesson) => {
      console.log(lesson);
      this.lesson = lesson;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lesson) {
      this.lessonService
        .updateLesson(this.lesson)
        .subscribe(() => this.goBack());
    }
  }

  unregisterStudent(student: Student): void {}
}
