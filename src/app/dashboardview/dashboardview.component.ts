import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let $: any;
$.ig.RevealSdkSettings.setBaseUrl("https://reveal-api.azurewebsites.net/");
//$.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');

@Component({
  selector: 'app-dashboardview',
  templateUrl: './dashboardview.component.html',
  styleUrls: ['./dashboardview.component.scss']
})
export class DashboardviewComponent implements AfterViewInit {
  @ViewChild('revealView') el!: ElementRef;

  constructor(private route: ActivatedRoute) {
  }

  ngAfterViewInit() {
    const stockSymbol = this.route.snapshot.queryParamMap.get('stockSymbol');
    const dashbordId = this.route.snapshot.paramMap.get('id');
    this.loadDashboard(dashbordId, stockSymbol);
  }

  async loadDashboard(dashboardId: string, stockSymbol?: string) {
    const dashboard = await $.ig.RVDashboard.loadDashboard(dashboardId ?? "Analysis");
    if (stockSymbol) {
      const territoryFilter = dashboard.filters.getByTitle("Ticker");
      territoryFilter.selectedValues = [stockSymbol.trim().toUpperCase()];
    }
    const revealView = new $.ig.RevealView(this.el.nativeElement);
    revealView.dashboard = dashboard;
  }
}
