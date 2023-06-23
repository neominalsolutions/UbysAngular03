import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsOperatorsPageComponent } from './rxjs-operators.component';

describe('RxjsOperatorsComponent', () => {
  let component: RxjsOperatorsPageComponent;
  let fixture: ComponentFixture<RxjsOperatorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RxjsOperatorsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsOperatorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
