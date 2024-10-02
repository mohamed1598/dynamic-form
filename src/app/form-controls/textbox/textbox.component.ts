import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextBoxConfig } from '../form-controls-config/TextBoxConfig';
import { NgClass, NgIf } from '@angular/common';
import { FieldConfig } from '../form-controls-config/FieldConfig';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-textbox',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgClass],
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.css'
})
export class TextboxComponent implements OnInit {
  @Input() config!: TextBoxConfig|any;
  @Input() form!: FormGroup;

  constructor(public validationService:ValidationService){}

  ngOnInit(): void {
    
  }
}
