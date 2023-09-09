import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Lesson } from './lesson';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class LessonService {
  private lessonsUrl = 'http://localhost:8080'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET lessons from the server */
  getLessons(): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.lessonsUrl}/classGetAll`, {}).pipe(
      tap((_) => this.log('fetched lessons')),
      catchError(this.handleError<Lesson[]>('getLessons', []))
    );
  }
  /** GET lesson by id. Return `undefined` when id not found */
  getLessonNo404<Data>(id: number): Observable<Lesson> {
    const url = `${this.lessonsUrl}/?id=${id}`;
    return this.http.get<Lesson[]>(url).pipe(
      map((lessons) => lessons[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} lesson id=${id}`);
      }),
      catchError(this.handleError<Lesson>(`getLesson id=${id}`))
    );
  }

  /** GET lesson by id. Will 404 if id not found */
  getLesson(id: string): Observable<Lesson> {
    // const url = `${this.lessonsUrl}/${id}`;
    return this.http
      .post<Lesson>(this.lessonsUrl + '/classFindById', { id: id })
      .pipe(
        tap((_) => this.log(`fetched lesson id=${id}`)),
        catchError(this.handleError<Lesson>(`getLesson id=${id}`))
      );
  }

  /* GET lessons whose name contains search term */
  searchLessons(term: string): Observable<Lesson[]> {
    if (!term.trim()) {
      // if not search term, return empty lesson array.
      return of([]);
    }
    return this.http.get<Lesson[]>(`${this.lessonsUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found lessons matching "${term}"`)
          : this.log(`no lessons matching "${term}"`)
      ),
      catchError(this.handleError<Lesson[]>('searchLessons', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new lesson to the server */
  addLesson(lesson: Lesson): Observable<Lesson> {
    return this.http
      .post<Lesson>(this.lessonsUrl, lesson, this.httpOptions)
      .pipe(
        tap((newLesson: Lesson) =>
          this.log(`added lesson w/ id=${newLesson.id}`)
        ),
        catchError(this.handleError<Lesson>('addLesson'))
      );
  }

  /** DELETE: delete the lesson from the server */
  deleteLesson(id: string): Observable<Lesson> {
    const url = `${this.lessonsUrl}/${id}`;

    return this.http.delete<Lesson>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted lesson id=${id}`)),
      catchError(this.handleError<Lesson>('deleteLesson'))
    );
  }

  /** PUT: update the lesson on the server */
  updateLesson(lesson: Lesson): Observable<any> {
    return this.http.put(this.lessonsUrl, lesson, this.httpOptions).pipe(
      tap((_) => this.log(`updated lesson id=${lesson.id}`)),
      catchError(this.handleError<any>('updateLesson'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a LessonService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`LessonService: ${message}`);
  }
}
