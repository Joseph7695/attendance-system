import { TestBed } from '@angular/core/testing';

import { BackendIsActiveInterceptor } from './backend-is-active.interceptor';

describe('BackendIsActiveInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BackendIsActiveInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BackendIsActiveInterceptor = TestBed.inject(BackendIsActiveInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
