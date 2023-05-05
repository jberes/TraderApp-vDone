import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewComponent } from './dashboardview.component';

describe('DashboardviewComponent', () => {
  let component: DashboardviewComponent;
  let fixture: ComponentFixture<DashboardviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
