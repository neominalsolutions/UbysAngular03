import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PostApiService } from 'src/app/pages/_services/post-api.service';

@Component({
  selector: 'app-post-create-form',
  templateUrl: './post-create-form.component.html',
  styleUrls: ['./post-create-form.component.scss'],
})
export class PostCreateFormComponent implements OnChanges {
  charCount: number = 0;

  @Input() formValues: any;

  postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    userId: [1],
    body: ['', [Validators.required, Validators.maxLength(20)]],
    image: [],
    address: this.fb.group({
      street: [''],
      city: [''],
    }),
  });

  constructor(
    private fb: FormBuilder,
    private postApi: PostApiService,
    private messageService: MessageService
  ) {
    // valueChagnes ile control deki value değişimini yakaladık.
    this.postForm.get('body')?.valueChanges.subscribe((value: string) => {
      this.charCount = value.length;
    });

    this.postForm.valueChanges.subscribe((frm) => {
      console.log('form-value', frm);
    });

    this.postForm.statusChanges.subscribe((status) => {
      console.log('frm-status', status);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    this.setValues(this.formValues);
    // formdaki alanın ts den set etme
    this.postForm.get('title')?.setValue('');
    const title = this.postForm.get('title')?.value;
    // formControldeki bir alanı okuma
  }

  submit() {
    if (this.postForm.valid) {
      const param = this.postForm.value;
      console.log('param', param);
      console.log('form', this.postForm);

      this.postApi.create(param).subscribe({
        next: (response) => {
          console.log('response', response);
          // 201
          console.log('response', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Kayıt Başarılı',
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hata',
            life: 2000,
          });
        },
      });
    }

    console.log('form', this.postForm);
  }

  setValues(formValue: any) {
    this.postForm.patchValue(formValue);
  }

  onFileChange($event: Event) {
    const files = ($event.target as any).files;
    console.log('files', files);
    this.postForm.get('image')?.setValue(files[0]);
  }
}
