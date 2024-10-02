import { NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ToggleComponent } from '../form-controls/toggle/toggle.component';
import { TextboxComponent } from '../form-controls/textbox/textbox.component';
import { SelectComponent } from '../form-controls/select/select.component';
import { CheckboxComponent } from '../form-controls/checkbox/checkbox.component';
import { RadioComponent } from '../form-controls/radio/radio.component';
import { TextareaComponent } from '../form-controls/textarea/textarea.component';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    ToggleComponent,
    TextboxComponent,
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
    TextareaComponent
  ],
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.css'
})
export class DynamicInputComponent {
  @Input() form:any;
  @Input() field:any;
}
