import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterStateService {
  private counterState = new BehaviorSubject<number>(0); // initial değer sıfır.
  public counter$: Observable<number> = this.counterState.asObservable();
  // $ile biten değişikenlerin observable olduğu anlaşılsın diye bir angular developer kullanım şekli

  constructor() {}

  arttir() {
    this.counterState.next(this.counterState.value + 1); // son state değerini memoryde tutar.
  }

  azalt() {
    this.counterState.next(this.counterState.value - 1);
  }

  sifirla() {
    this.counterState.next(0);
  }
}
