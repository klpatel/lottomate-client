import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse, Errors } from '../../model/ErrorResponse';
import { Router } from '@angular/router';
import { AppConstants } from '../constants';
import { Token } from 'src/app/model/Token';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  constructor(public router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
    const headers: { [name: string]: string | string[]; } = {};
    request.headers.keys().forEach(key => headers[key] = request.headers.getAll(key));

    const customHequest: HttpRequest<unknown> = request.clone({
      headers: new HttpHeaders({
        ...headers,
        Authorization: `Bearer ${ userToken && userToken.accessToken }`
      })
    });

    return next.handle(customHequest).pipe(
      catchError((response: HttpErrorResponse) => {
        console.log("response: ", response);
        if (response.status === 401) {
          localStorage.removeItem(AppConstants.USER_TOKEN);
          this.router.navigate(['login']);
          return;
        }

        let errorResponse: ErrorResponse;
        if (response.error instanceof ErrorEvent) {
            // client-side error
            errorResponse = {
              statusCode: response.status,
              errors: [
                { element: '', message: response.error.message }
              ]
            };
        } else {
            // server-side error
            let errors: Errors[] = [];
            if (response.error &&  response.error.errors) {
              const responseErrors = response.error.errors;
              errors = Object.keys(responseErrors).map((key: string) => {
                return { element: key, message: responseErrors[key] };
              });
            } else {
              errors = [{ element: '', message: response.statusText }];
            }

            errorResponse = {
              statusCode: response.status,
              errors: [...errors]
            };
        }
        return throwError(errorResponse);
    }));
  }
}
