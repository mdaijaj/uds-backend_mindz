import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toast: ToastrService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const signIn: any = localStorage.getItem('signInUser');
    const singInUser = JSON.parse(signIn);

    if (!singInUser) {
      return next.handle(request).pipe(
        catchError((error: any) => {
          // You can handle the error here, log it, display a message, etc.
          return throwError(error);
        })
      );
    } else {
      const modifyReq = request.clone({
        setHeaders: { Authorization: `Bearer ${singInUser._token}` }
      });
      return next.handle(modifyReq).pipe(
        catchError((error: any) => {
          if (error?.status == 409 || error?.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('EmpMainId');
            this.router.navigate(['']);
            this.toast.error(error?.error?.message);
          }
          return throwError(error);
        })
      );
    }
  }
}
