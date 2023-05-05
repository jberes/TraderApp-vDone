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

  public GenerateStockPriceData(priceStart: number, volumeStart: number): any {
    let dateEnd: Date = new Date();

    let priceRange = priceStart * 0.05;
    let volumeRange = volumeStart * 0.05;
    let dataCount = 100;
    let v = volumeStart;
    let o = priceStart;
    let h = Math.round(o + (Math.random() * priceRange));
    let l = Math.round(o - (Math.random() * priceRange));
    let c = Math.round(l + (Math.random() * (h - l)));

    let time: Date = this.AddDays(dateEnd, 0);
    let stockData = [];
    for (let i = 0; i < dataCount; i++) {
      stockData.push({ date: time, open: o, high: h, low: l, close: c, volume: v });
      var change = Math.random() - 0.499;

      o = c + Math.round(change * priceRange);
      h = o + Math.round(Math.random() * priceRange);
      l = o - Math.round(Math.random() * priceRange);
      c = l + Math.round(Math.random() * (h - l));
      v = v + Math.round(change * volumeRange);

      time = this.AddDays(time, -1);
    }

    stockData = stockData.reverse();
    return stockData;
  }

  public AddDays(date: Date, days: number): Date {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }
}
