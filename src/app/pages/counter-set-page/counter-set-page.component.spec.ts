import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterSetPageComponent } from './counter-set-page.component';

describe('CounterSetPageComponent', () => {
  let component: CounterSetPageComponent;
  let fixture: ComponentFixture<CounterSetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterSetPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterSetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
