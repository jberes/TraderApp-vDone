import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

declare let $: any;
$.ig.RevealSdkSettings.setBaseUrl("https://reveal-api.azurewebsites.net/");
//$.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');

@Component({
  selector: 'app-dashboardview',
  templateUrl: './dashboardview.component.html',
  styleUrls: ['./dashboardview.component.scss']
})
export class DashboardviewComponent {
  @ViewChild('revealView') el!: ElementRef;
  constructor(
    private route: ActivatedRoute){}
    public comingIn: string;
    public filterIn: string;

  async ngAfterViewInit() {

  var dashboardToLoad: any;
  var id: any;

  this.route.params.subscribe(params => {
    id = params['id'];
    this.comingIn = id;
    if (id.startsWith('@')) {
      dashboardToLoad = 'Analysis';
      id = id.substring(1);
    } else {
      dashboardToLoad = id;
    }
  });

  var theme = new $.ig.OceanDarkTheme();
  theme = $.ig.RevealSdkSettings.theme.clone();
    
  theme.fontColor = "white";
  theme.accentColor = "#009900";
  theme.dashboardBackgroundColor = "#292929";
  theme.visualizationBackgroundColor = "#1d1d1d";
  $.ig.RevealSdkSettings.theme = theme;

  let dashboard = await $.ig.RVDashboard.loadDashboard(dashboardToLoad);
  var revealView = new $.ig.RevealView(this.el.nativeElement);
  revealView.refreshTheme();   
  revealView.dashboard = dashboard;

  if (dashboardToLoad == "Analysis") {
        var territoryFilter = revealView.dashboard.filters.getByTitle("Ticker");
        this.filterIn = id;
        territoryFilter.selectedValues = [ id.trim().toUpperCase() ]; 
  }
}; 
}
