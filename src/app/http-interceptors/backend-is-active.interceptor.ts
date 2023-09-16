import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BackendIsActiveInterceptor implements HttpInterceptor {
  constructor() {}
  router = inject(Router);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (e) => {
          console.log('hiiiii', e);
          if (e instanceof HttpErrorResponse && e.status === 0) {
            this.router.navigateByUrl('/loading');
          }
        },
      })
    );
  }
}
