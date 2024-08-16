import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloned = req;

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
      }
    }

    console.log('Outgoing Request:', {
      url: cloned.url,
      headers: cloned.headers,
      method: cloned.method,
      body: cloned.body,
    });

    return next.handle(cloned).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            console.log('Incoming Response:', {
              url: event.url,
              status: event.status,
              body: event.body,
            });
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            console.error('Error Response:', {
              url: error.url,
              status: error.status,
              message: error.message,
              error: error.error,
            });
          }
        }
      })
    );
  }
}
