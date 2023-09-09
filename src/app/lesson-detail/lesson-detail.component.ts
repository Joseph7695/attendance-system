import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Lesson } from '../lesson';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
})
export class LessonDetailComponent implements OnInit {
  lesson: Lesson | undefined;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getLesson();
  }

  getLesson(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lessonService
      .getLesson(id)
      .subscribe((lesson) => (this.lesson = lesson));
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
}
