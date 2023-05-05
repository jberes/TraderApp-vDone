import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardsListService {
  constructor(
    private http: HttpClient
  ) { }

  public getDashboards(): Observable<any> {
    return this.http.get("https://excel2json.io/api/share/bdf801da-3b6f-461f-00aa-08da188ec9ab");
  }
}
