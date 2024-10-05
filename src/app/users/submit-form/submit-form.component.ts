import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from '../../form-controls/form-controls-config/FieldConfig';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage.service';
import { Form } from '../../form/form.model';
import { FormService } from '../../services/form.service';
import { DynamicInputComponent } from '../../dynamic-input/dynamic-input.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-submit-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    DynamicInputComponent
  ],
  templateUrl: './submit-form.component.html',
  styleUrl: './submit-form.component.css'
})
export class SubmitFormComponent implements OnInit {
  formId: any;
  userId:number =0;
  form: FormGroup | any;
  fields: FieldConfig[] = [];
  isSubmittedBefore = false;
  constructor(private route:ActivatedRoute,
     private localstorageService:LocalStorageService,
     private formService: FormService
    ){

  }
  ngOnInit(): void {
    combineLatest(
      [
        this.route.params,
        this.route.queryParams
      ]
    ).subscribe(([params,queryParams])=>{
      this.formId = params['id'];

      this.fields = this.localstorageService.getItem('forms')?.find((e: Form) => e.id == this.formId)?.fields;
      this.fields = this.fields ? this.fields : [];
      
      this.userId = queryParams['userId'];
      
      let form = this.localstorageService.getItem('formSubmit')?.find((e:any) => e.userId == this.userId && e.formId == this.formId);
      if(form){
        this.fields.forEach(e => e.isDisabled = true);
        this.isSubmittedBefore = true;
      }

      this.form = this.formService.getForm(this.fields);

      if(this.isSubmittedBefore){
        this.form.patchValue(form.value);
      }
    });
  }

  submit(){
    this.fields.forEach((field: FieldConfig) => field.isSubmitted = true);

    if (this.form.valid && this.userId) {
      let value = this.form.value;
      var values = this.localstorageService.getItem('formSubmit') || []; 
      values.push({
        userId : this.userId,
        formId : this.formId,
        value: value
      })
      this.localstorageService.setItem('formSubmit',values);

      this.fields.forEach(e => e.isDisabled = true);
      this.form = this.formService.getForm(this.fields);
        this.form.patchValue(value);
        this.isSubmittedBefore = true
    }
  }

}
