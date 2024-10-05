import { Injectable } from '@angular/core';
import { ValidationService } from './validation.service';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fb: FormBuilder, private validationService : ValidationService) { }
  getForm(fields : any): any{
    return this.fb.group(
      fields.reduce((acc: any, field : any) => {
        const validators = this.validationService.getValidators(field);
        acc[field.name] = [{value:'', disabled :field.isDisabled}, validators];
        return acc;
      }, {} as any)
    );
  }
}
