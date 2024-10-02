import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxConfig } from '../form-controls-config/CheckboxConfig';
import { NgIf } from '@angular/common';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  @Input() form!: FormGroup;
  @Input() config!: CheckboxConfig|any;

  constructor(public validationService:ValidationService){}
}
