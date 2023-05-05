import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeStockDataService {
  constructor(
    private http: HttpClient
  ) { }

  public getStockData(): Observable<any> {
    return this.http.get("https://excel2json.io/api/share/dda4d37a-ca6a-4ef8-4a6a-08db39d60f55");
  }
}
