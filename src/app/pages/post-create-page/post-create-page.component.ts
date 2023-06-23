import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PostCreateFormComponent } from './features/post-create-form/post-create-form.component';
import { PostApiService } from '../_services/post-api.service';

@Component({
  templateUrl: './post-create-page.component.html',
  styleUrls: ['./post-create-page.component.scss'],
})
export class PostCreatePageComponent implements OnInit, AfterViewInit {
  constructor(private postApi: PostApiService) {}

  @ViewChild('createForm') createForm!: PostCreateFormComponent;

  postFormValue: any = { title: 'title-1', body: 'body' };

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    // this.createForm.setValues(this.postFormValue);
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.postApi.getById(1).subscribe((value: any) => {
      this.postFormValue = { ...value };

      // let data: any = {
      //   val1: value,
      //   val2: null,
      // };

      // this.postApi.getById(2).subscribe((value2) => {
      //   data.value2 = value2;
      // });

      console.log('postApi');
      // this.createForm.setValues(this.postFormValue);

      console.log('postFormValue', this.postFormValue);
    });
  }
}
