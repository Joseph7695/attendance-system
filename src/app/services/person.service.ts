import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Student, Teacher } from '../student';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PersonService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET students from the server */
  greeting(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/greeting`, {}).pipe(
      tap((_) => this.log('fetched students')),
      catchError(this.handleError<any>('getStudents', []))
    );
  }
  /** GET students from the server */
  getStudents(): Observable<Student[]> {
    return this.http
      .post<Student[]>(`${environment.apiUrl}/person/searchPerson`, {
        personType: 'STUDENT',
      })
      .pipe(
        tap((_) => this.log('fetched students')),
        catchError(this.handleError<Student[]>('getStudents', []))
      );
  }
  /** GET students from the server */
  getTeachers(): Observable<Teacher[]> {
    return this.http
      .post<Teacher[]>(`${environment.apiUrl}/person/searchPerson`, {
        personType: 'TEACHER',
      })
      .pipe(
        tap((_) => this.log('fetched students')),
        catchError(this.handleError<Teacher[]>('getStudents', []))
      );
  }
  /** GET student by id. Return `undefined` when id not found */
  getStudentNo404<Data>(id: number): Observable<Student> {
    const url = `${environment.apiUrl}/?id=${id}`;
    return this.http.get<Student[]>(url).pipe(
      map((students) => students[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} student id=${id}`);
      }),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  /** GET student by id. Will 404 if id not found */
  getStudent(id: string): Observable<Student> {
    // const url = `${environment.apiUrl}/${id}`;
    return this.http
      .post<Student>(environment.apiUrl + '/studentFindById', { id: id })
      .pipe(
        tap((_) => this.log(`fetched student id=${id}`)),
        catchError(this.handleError<Student>(`getStudent id=${id}`))
      );
  }

  /* GET students whose name contains search term */
  searchStudents(term: string): Observable<Student[]> {
    if (!term.trim()) {
      // if not search term, return empty student array.
      return of([]);
    }
    return this.http.get<Student[]>(`${environment.apiUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found students matching "${term}"`)
          : this.log(`no students matching "${term}"`)
      ),
      catchError(this.handleError<Student[]>('searchStudents', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new student to the server */
  addStudent(student: Student): Observable<Student> {
    return this.http
      .post<Student>(
        environment.apiUrl + '/createPerson',
        student,
        this.httpOptions
      )
      .pipe(
        tap((newStudent: Student) =>
          this.log(`added student w/ id=${newStudent.id}`)
        ),
        catchError(this.handleError<Student>('addStudent'))
      );
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http
      .post<Student>(
        environment.apiUrl + '/createPerson',
        teacher,
        this.httpOptions
      )
      .pipe(
        tap((newStudent: Teacher) =>
          this.log(`added teacher w/ id=${newStudent.id}`)
        ),
        catchError(this.handleError<Student>('addTeacher'))
      );
  }

  /** DELETE: delete the student from the server */
  deleteStudent(id: string): Observable<Student> {
    const url = `${environment.apiUrl}/${id}`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  /** PUT: update the student on the server */
  updateStudent(student: Student): Observable<any> {
    return this.http.put(environment.apiUrl, student, this.httpOptions).pipe(
      tap((_) => this.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
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

  /** Log a StudentService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StudentService: ${message}`);
  }
}
