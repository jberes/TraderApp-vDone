import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyStockDataService {
  constructor(
    private http: HttpClient
  ) { }

  public getCompanyFeed(): Observable<any> {
    return this.http.get("https://excel2json.io/api/share/ff7012cd-a959-4fbb-4a6d-08db39d60f55");
  }
}
