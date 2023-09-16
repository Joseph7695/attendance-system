import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, TimeoutError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Inject, inject, Injectable, InjectionToken } from '@angular/core';
import { timeout } from 'rxjs/operators';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
@Injectable()
export class BackendIsActiveInterceptor implements HttpInterceptor {
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {}
  router = inject(Router);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const timeoutValue = request.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);
    return next
      .handle(request)
      .pipe(timeout(timeoutValueNumeric))
      .pipe(
        tap({
          error: (e) => {
            console.log('hiiiii', e);
            if (
              e instanceof TimeoutError ||
              (e instanceof HttpErrorResponse && e.status === 0)
            ) {
              this.router.navigateByUrl('/loading');
            }
          },
        })
      );
  }
}
