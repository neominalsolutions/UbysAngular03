import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreatePageComponent } from './pages/post-create-page/post-create-page.component';
import { PostCreateFormComponent } from './pages/post-create-page/features/post-create-form/post-create-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RxjsOperatorsPageComponent } from './pages/rxjs/rxjs-operators/rxjs-operators.component';
import { CounterSetPageComponent } from './pages/counter-set-page/counter-set-page.component';
import { CounterGetPageComponent } from './pages/counter-get-page/counter-get-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

// Angular Animations çalışması için gerekli module

@NgModule({
  declarations: [
    AppComponent,
    PostCreatePageComponent,
    PostCreateFormComponent,
    RxjsOperatorsPageComponent,
    CounterSetPageComponent,
    CounterGetPageComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
