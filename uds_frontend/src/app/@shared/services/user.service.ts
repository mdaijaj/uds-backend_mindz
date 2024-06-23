
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  databaseKey;
  constructor(private http: HttpClient) {
    this.databaseKey = environment.servralUrl;
  }

  changePassword(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/changePassword`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  forgotSendOtp(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/forgotSendOtp`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  forgotPassword(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/forgotPassword`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
