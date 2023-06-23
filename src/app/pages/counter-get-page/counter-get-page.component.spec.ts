import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterGetPageComponent } from './counter-get-page.component';

describe('CounterGetPageComponent', () => {
  let component: CounterGetPageComponent;
  let fixture: ComponentFixture<CounterGetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterGetPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterGetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
