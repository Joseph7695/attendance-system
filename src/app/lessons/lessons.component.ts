import { Component, OnInit } from '@angular/core';

import { Lesson } from '../lesson';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[] = [];

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.getLessons();
  }

  getLessons(): void {
    this.lessonService
      .getLessons()
      .subscribe((lessons) => (this.lessons = lessons));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.lessonService.addLesson({ name } as Lesson).subscribe((lesson) => {
      this.lessons.push(lesson);
    });
  }

  delete(lesson: Lesson): void {
    this.lessons = this.lessons.filter((h) => h !== lesson);
    this.lessonService.deleteLesson(lesson.id).subscribe();
  }
}
