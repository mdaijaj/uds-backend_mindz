
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class allocationService {
  databaseKey;
  constructor(private http: HttpClient) {
    this.databaseKey = environment.servralUrl;
    // this.databaseKey = "https://emerpapi.elitetraveltech.in"
    // this.databaseKey = "http://192.168.20.232:5000";
  }

  getItemsByAsset(query: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getItemsByAsset/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createAllocation(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createAllocation`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getFilteredItems(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/getFilteredItems`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  get_by_Id_grn() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/get_all_po`).pipe(
      // return this.http.get<any>(`${this.databaseKey}/api/v1/get_all_po`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getContractDetails(query: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getContractDetails/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}

