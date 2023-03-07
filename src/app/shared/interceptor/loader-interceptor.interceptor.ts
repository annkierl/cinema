import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, finalize, map, tap } from 'rxjs';
import { LoaderService } from './loaderhandler.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private loaderService = inject(LoaderService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method == 'GET') {
      this.loaderService.show();
    }
    return next.handle(request).pipe(finalize(() => this.loaderService.hide()));
  }
}
