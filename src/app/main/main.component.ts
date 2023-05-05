import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { FakeStockDataService } from '../services/fake-stock-data.service';
import { CompanyStockDataService } from '../services/company-stock-data.service';
import { IgxToastComponent } from 'igniteui-angular';

// required imports for working with FinancialChart
import { IgxFinancialChartComponent } from "igniteui-angular-charts";
import { IgxNavigationDrawerComponent } from "igniteui-angular";
import { FinancialChartType } from "igniteui-angular-charts";
import { FinancialChartYAxisMode } from "igniteui-angular-charts";
import { FinancialChartZoomSliderType } from "igniteui-angular-charts";
import { FinancialChartVolumeType } from "igniteui-angular-charts";
import { StringComparer } from 'igniteui-angular-core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [
  '../../assets/dark-theme-financial-chart.css',
  '../../assets/dark-theme-tooltips.css',
  './main.component.scss',
]
})
export class MainComponent implements OnInit {
  
  @ViewChild(IgxToastComponent, { static: true }) toast: IgxToastComponent;
  @ViewChild("chart", { static: true })
  
  public chart: IgxFinancialChartComponent;
  public dataSource: any[];

  onSearchClicked(value: string) {
    let item = this.companyStockDataFeed.find(item => item['stock_symbol'] === value);
    // Check for partial matches if no full matches found
    if (!item) {
      item = this.companyStockDataFeed.find(item => item['stock_symbol'].startsWith(value));
    }
    if (item) {
      this.onItemClicked(item);
      console.log(item);
    } else {
      this.toast.open(`No ticker found with ${value} symbol!`);
    }
  }

  public onItemClicked(item: any) {
    // this.country = item.country;
    console.log("in OnClicked - item is: " + item.stock_name);

    console.log(item);
    this.itemData = item;
    console.log("in OnClicked - itemData is: " + this.itemData.stock_name);

    this.UpdateChart(item.stock_symbol)

    if (this.prevContact) {
        this.prevContact.selected = false;
    }
    item.selected = true;
    this.prevContact = item;
    this.cdr.detectChanges();
  }

  public companyStockDataFeed: any [] = null;
  public fakeStockDataStockData: any [] = null;
  public itemData: any;
  private prevContact: any;
  public country: string = 'Initial label value';
  public dataSources: any[];

  constructor(
    private companyStockDataService: CompanyStockDataService,
    // private fakeStockDataService: FakeStockDataService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {

    this.companyStockDataService.getCompanyFeed().subscribe(
      data => {
        this.companyStockDataFeed = data;
        
        console.log('ngOnInit - Company feed loaded:', data);
        let firstItem = this.companyStockDataFeed[0];
        
        
        console.log('ngOnInit - First item:', firstItem);
        this.onItemClicked(firstItem);

        // NOTE updating the chart with 1 stock symbol
        let stockSymbols = [data[0].stock_symbol];

        // NOTE updating the chart with multiple stock symbols
         //let stockSymbols = [data[0].stock_symbol, data[1].stock_symbol];
         console.log('ngOnInit - Stock Symbols:', stockSymbols);
        this.UpdateChart(stockSymbols);
        this.UpdateChartProps();

      },
      error => console.error('Error occurred while fetching company feed:', error),
      () => {
        console.log('Company feed subscription completed')

        //this.UpdateChartProps();
      }
    );
  }


  public UpdateChart(stockSymbols: string[]) {
    // console.log("found " + this.companyStockDataFeed.length + " companyDetails")
    const newDataSources: any[] = [];
    console.log('UpdateChart - Before Null Checks:', this.companyStockDataFeed);
    if (this.companyStockDataFeed == null) { return; }
    if (this.companyStockDataFeed.length == 0) { return; }

    console.log('UpdateChart - Past Null Checks:', this.companyStockDataFeed);
    const titles = [];
    for (const info of this.companyStockDataFeed) {

      let company = info.company_name;
        let symbol = info.stock_symbol;
        let volume = info.avg_volume;
        let price = info.previous_close;

        // check if a company symbol matches desired stock symbols
        if (stockSymbols.includes(symbol)) {
          // generating fake price history based on current price and volume
          const stockItems = this.GetStocks(price, volume);

          // adding annotations for SeriesTitle
          const title = company + " (" + symbol + ")";
          titles.push(title);
          (stockItems as any).__dataIntents = {
              close: ["SeriesTitle/" + title]
          };
          newDataSources.push(stockItems);
          console.log("UpdateChart - added " + stockItems.length + " stock items")
          console.log(stockItems );
        }
    }
    this.dataSources = newDataSources;
    this.UpdateChartProps();

  }


  public UpdateChartProps() {

    if (this.chart === undefined) { return; }

    // bind and show only OHLC values in the chart
    //this.chart.includedProperties = ["*.open", "*.high", "*.low", "*.close", "*.volume", "*.date"];
   // this.chart.dataSource = dataSources[0];

    console.log("updating chart props");

    if (this.dataSources.length > 1) {
        this.chart.yAxisMode = FinancialChartYAxisMode.PercentChange;
        this.chart.chartType = FinancialChartType.Line;
        this.chart.zoomSliderType = FinancialChartZoomSliderType.Line;
        this.chart.volumeType = FinancialChartVolumeType.None;
        //this.chart.subtitle = titles.join(" vs ");
    } else {
        this.chart.yAxisMode = FinancialChartYAxisMode.Numeric;
        this.chart.chartType = FinancialChartType.Bar;
        this.chart.zoomSliderType = FinancialChartZoomSliderType.Bar;
        this.chart.volumeType = FinancialChartVolumeType.None;
        //this.chart.subtitle = titles.join(" ");
    }
  }



  public AddDays(date: Date, days: number): Date {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }

  public GetStocks(priceStart: number, volumeStart: number): any {
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

      //time = new Date(time.getTime() + (24 * 60 * 60 * 1000))
      time = this.AddDays(time, -1);
    }

    stockData = stockData.reverse();
    return stockData;
  }

}
