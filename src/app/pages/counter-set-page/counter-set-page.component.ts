import { Component, OnInit } from '@angular/core';
import { CounterStateService } from '../_services/counter-state.service';

@Component({
  templateUrl: './counter-set-page.component.html',
  styleUrls: ['./counter-set-page.component.scss'],
})
export class CounterSetPageComponent implements OnInit {
  counter!: number;

  constructor(private cState: CounterStateService) {}

  ngOnInit(): void {
    this.cState.counter$.subscribe((currentValue: number) => {
      this.counter = currentValue;
    });
  }

  SayacArttir() {
    this.cState.arttir();
  }

  SayacAzalt() {
    this.cState.azalt();
  }

  SayacSifirla() {
    this.cState.sifirla();
  }
}
