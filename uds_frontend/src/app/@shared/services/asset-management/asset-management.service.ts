
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AssetManagementService {
  databaseKey;
  constructor(private http: HttpClient) {
    this.databaseKey = environment.servralUrl;
  }

  createAddPo(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createAddPo`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getContractList() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getContractList`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}

