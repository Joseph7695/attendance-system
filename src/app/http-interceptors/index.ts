/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  BackendIsActiveInterceptor,
  DEFAULT_TIMEOUT,
} from './backend-is-active.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendIsActiveInterceptor,
      multi: true,
    },
  ],
  // [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
  [{ provide: DEFAULT_TIMEOUT, useValue: 3000 }],
];
