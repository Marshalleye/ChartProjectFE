import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class WINDOW extends Window {}

@Injectable()
export class HttpRelativeApiUrlInterceptor implements HttpInterceptor {
  //constructor(@Inject(WINDOW) private window: WINDOW) {}

  public intercept(
    originalRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (originalRequest.url.startsWith('/api')) {
      //const pmApiBaseUrl =
      //  (this.window as any).pmApiBaseUrl ||
      //  (this.window as any).top.pmApiBaseUrl;
      //const modifiedUrl = pmApiBaseUrl + originalRequest.url;
      const modifiedRequest = originalRequest.clone({
        url: originalRequest.url,
        headers: originalRequest.headers.append('Auth', 'SOME RANDOM TOKEN'),
      });
      return next.handle(modifiedRequest);
    } else {
      return next.handle(originalRequest);
    }
  }
}
