import { Component } from '@angular/core';
import { UserStateService } from '../_services/user-state.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  constructor(public uState: UserStateService, private router: Router) {
    uState.getUserInfo().subscribe((a) => {
      console.log('a', a);
      if (a == null) {
        window.location.href = '/';
      }
    });
  }
}

