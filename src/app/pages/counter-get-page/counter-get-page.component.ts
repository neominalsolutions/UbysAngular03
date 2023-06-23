import { Component } from '@angular/core';
import { CounterStateService } from '../_services/counter-state.service';

@Component({
  templateUrl: './counter-get-page.component.html',
  styleUrls: ['./counter-get-page.component.scss'],
})
export class CounterGetPageComponent {
  constructor(public cState: CounterStateService) {}
}
