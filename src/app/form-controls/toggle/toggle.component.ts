import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchConfig } from '../form-controls-config/ToggleSwitchConfig';
import { ValidationService } from '../../services/validation.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent {
  @Input() form!: FormGroup;
  @Input() config!: ToggleSwitchConfig|any;

  constructor(public validationService:ValidationService){}
}
