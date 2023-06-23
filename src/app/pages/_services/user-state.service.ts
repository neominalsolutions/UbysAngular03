import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userState = new BehaviorSubject<any>(null); // initial değer sıfır.
  private user$: Observable<any> = this.userState.asObservable();

  constructor() {}

  // state login olurken güncellediğimiz yer
  setUserInfo(token: string) {
    localStorage.setItem('accessToken', token);
    var decoded = jwt_decode(token);
    this.userState.next(decoded);
  }

  // login olduktan sonra uygulamadaki arayüzlerde son güncel state değerini okuduğumuz yer.
  public getUserInfo(): Observable<any> {
    const token = localStorage.getItem('accessToken');

    if (token != undefined) {
      var decoded = jwt_decode(token);
      this.userState.next(decoded);
    } else {
      this.userState.next(null);
    }

    return this.user$;
  }

  clearSession() {
    localStorage.removeItem('accessToken');
    this.userState.next(null);
  }
}
