import { Component } from '@angular/core';
import { CounterStateService } from './pages/_services/counter-state.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserStateService } from './pages/_services/user-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'IKCApp03';

  constructor(
    public cState: CounterStateService,
    private http: HttpClient,
    private router: Router,
    public uState: UserStateService
  ) {}

  login() {
    this.http
      .post('https://reqres.in/api/login', {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      })
      .subscribe((res: any) => {
        console.log('res', res);

        this.uState.setUserInfo(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        );

        // admin sayfasına yönlendir.
        this.router.navigate(['admin']);
      });
  }

  logOut() {
    this.uState.clearSession();
  }
}
