import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonsConfig } from '../form-controls-config/RadioButtonsConfig';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css'
})
export class RadioComponent {
  @Input() form!: FormGroup;
  @Input() config!: RadioButtonsConfig|any;

  constructor(public validationService:ValidationService){}
}
