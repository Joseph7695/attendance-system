import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';

import { LessonSearchComponent } from '../lesson-search/lesson-search.component';
import { LessonService } from '../lesson.service';
import { HEROES } from '../mock-lessons';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let lessonService;
  let getLessonsSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    lessonService = jasmine.createSpyObj('LessonService', ['getLessons']);
    getLessonsSpy = lessonService.getLessons.and.returnValue(of(HEROES));
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, LessonSearchComponent],
      imports: [RouterModule.forRoot([])],
      providers: [{ provide: LessonService, useValue: lessonService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Lessons" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual(
      'Top Lessons'
    );
  });

  it('should call lessonService', waitForAsync(() => {
    expect(getLessonsSpy.calls.any()).toBe(true);
  }));

  it('should display 4 links', waitForAsync(() => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  }));
});
