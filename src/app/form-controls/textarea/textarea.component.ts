import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextareaConfig } from '../form-controls-config/TextareaConfig';
import { NgIf } from '@angular/common';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css'
})
export class TextareaComponent {
  @Input() form!: FormGroup;
  @Input() config!: TextareaConfig|any;

  constructor(public validationService:ValidationService){}
}
