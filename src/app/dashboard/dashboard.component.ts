import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  lessons: Lesson[] = [];

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.getLessons();
  }

  getLessons(): void {
    this.lessonService.getLessons().subscribe((lessons) => {
      console.log(lessons);
      this.lessons = lessons.slice(0, 5);
    });
  }
}
