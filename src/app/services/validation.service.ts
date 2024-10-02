import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FieldConfig } from '../form-controls/form-controls-config/FieldConfig';
import { TextBoxConfig } from '../form-controls/form-controls-config/TextBoxConfig';
import { TextareaConfig } from '../form-controls/form-controls-config/TextareaConfig';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  getValidators(field: FieldConfig) {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.type === 'text') {
      const textField = field as TextBoxConfig;

      let hasValidation = !field.required && (textField.minLength)

      if (textField.minLength) {
        validators.push(Validators.minLength(textField.minLength));
        if (!field.required) {
          validators.push(Validators.required);
        }
      }

      if (textField.maxLength) {
        validators.push(Validators.maxLength(textField.maxLength));
      }

      if (textField.pattern) {
        validators.push(Validators.pattern(textField.pattern));
      }

      if (textField.email) {
        validators.push(Validators.email);
      }

      if (textField.alphanumeric) {
        validators.push(this.alphanumericValidator());
      }
    }

    if (field.type === 'textarea') {
      const textareaField = field as TextareaConfig;

      let hasValidation = !field.required && (textareaField.minLength || textareaField.maxLength)
      if (hasValidation) {
        validators.push(Validators.required);
      }

      if (textareaField.minLength) {
        validators.push(Validators.minLength(textareaField.minLength));
      }

      if (textareaField.maxLength) {
        validators.push(Validators.maxLength(textareaField.maxLength));
      }
    }

    return validators;
  }

  private alphanumericValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const alphanumericPattern = /^[a-zA-Z0-9]+$/;
      return alphanumericPattern.test(control.value) ? null : { invalidAlphanumeric: true };
    };
  }

  isInvalid(form: FormGroup, config: FieldConfig): boolean {
    const control = form.get(config.name);
    return control?.invalid == true && (config.isSubmitted || (control?.dirty || control?.touched)) as boolean;
  }

  getErrorMessages(form: FormGroup, field: FieldConfig): string[] {
    const messages: string[] = [];
    const control = form.get(field.name);

    if (control?.errors) {
      if (control.errors['required']) {
        messages.push(`${field.label || field.name} is required.`);
      }
      if (control.errors['minlength']) {
        messages.push(`${field.label || field.name} must be at least ${control.errors['minlength'].requiredLength} characters long.`);
      }
      if (control.errors['maxlength']) {
        messages.push(`${field.label || field.name} cannot exceed ${control.errors['maxlength'].requiredLength} characters.`);
      }
      if (control.errors['pattern']) {
        messages.push(`${field.label || field.name} contains invalid characters.`);
      }
      if (control.errors['email']) {
        messages.push(`Please enter a valid email address.`);
      }
      if (control.errors['invalidAlphanumeric']) {
        messages.push(`${field.label || field.name} must contain only alphanumeric characters.`);
      }
    }
    return messages;
  }


}
