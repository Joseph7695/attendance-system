import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Lesson } from '../lesson';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-lesson-search',
  templateUrl: './lesson-search.component.html',
  styleUrls: ['./lesson-search.component.css'],
})
export class LessonSearchComponent implements OnInit {
  lessons$!: Observable<Lesson[]>;
  private searchTerms = new Subject<string>();

  constructor(private lessonService: LessonService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.lessons$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.lessonService.searchLessons(term))
    );
  }
}
