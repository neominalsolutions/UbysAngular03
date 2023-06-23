import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreatePageComponent } from './pages/post-create-page/post-create-page.component';
import { RxjsOperatorsPageComponent } from './pages/rxjs/rxjs-operators/rxjs-operators.component';
import { CounterSetPageComponent } from './pages/counter-set-page/counter-set-page.component';
import { CounterGetPageComponent } from './pages/counter-get-page/counter-get-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AuthGuard } from './pages/_services/auth.guard';

const routes: Routes = [
  {
    path: 'post-create',
    component: PostCreatePageComponent,
  },
  {
    path: 'rxjs',
    component: RxjsOperatorsPageComponent,
  },
  {
    path: 'setCounter',
    component: CounterSetPageComponent,
  },

  {
    path: 'getCounter',
    component: CounterGetPageComponent,
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
