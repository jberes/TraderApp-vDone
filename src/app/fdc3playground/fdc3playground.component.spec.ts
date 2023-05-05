import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fdc3playgroundComponent } from './fdc3playground.component';

describe('Fdc3playgroundComponent', () => {
  let component: Fdc3playgroundComponent;
  let fixture: ComponentFixture<Fdc3playgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fdc3playgroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fdc3playgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
