import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectBoxConfig } from '../form-controls-config/SelectBoxConfig';
import { NgFor, NgIf } from '@angular/common';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input() form!: FormGroup;
  @Input() config!: SelectBoxConfig|any;

  constructor(public validationService:ValidationService){}
}
