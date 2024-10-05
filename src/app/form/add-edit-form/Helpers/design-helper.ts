import { CheckboxConfig } from "../../../form-controls/form-controls-config/CheckboxConfig";
import { RadioButtonsConfig } from "../../../form-controls/form-controls-config/RadioButtonsConfig";
import { SelectBoxConfig } from "../../../form-controls/form-controls-config/SelectBoxConfig";
import { TextareaConfig } from "../../../form-controls/form-controls-config/TextareaConfig";
import { TextBoxConfig } from "../../../form-controls/form-controls-config/TextBoxConfig";
import { ToggleSwitchConfig } from "../../../form-controls/form-controls-config/ToggleSwitchConfig";


type DynamicFormConfig = {
    [key: string]: (TextBoxConfig | SelectBoxConfig | RadioButtonsConfig | CheckboxConfig | ToggleSwitchConfig | TextareaConfig)[];
  };

export class DesignHelper {
    // Static objects

    // add and edit of design form
    static configFields: (TextBoxConfig | SelectBoxConfig | RadioButtonsConfig | CheckboxConfig | ToggleSwitchConfig | TextareaConfig)[] = [
        { id: 0, name: 'id', type: 'text', label: 'Id', bootstrapClass: ["d-none"] },
        { id: 1, name: 'name', type: 'text', label: 'Field Name', required: true, minLength: 3, maxLength: 20, alphanumeric: false, bootstrapClass: ["col-12"] },
        { id: 2, name: 'type', type: 'select', label: 'Type', options: ['checkbox', 'radio', 'select', 'textarea', 'text', 'toggle'], required: true, bootstrapClass: ["col-12"] },
        { id: 3, name: 'label', type: 'text', label: 'Label', required: true, minLength: 3, maxLength: 20, alphanumeric: false, bootstrapClass: ["col-12"] },
        { id: 5, name: 'bootstrapClass', type: 'text', label: 'bootstrapClass', required: false, alphanumeric: false, bootstrapClass: ["col-12"] },
        { id: 6, name: 'required', type: 'toggle', label: 'Required', required: false, bootstrapClass: ["col-6"] }
      ];

    
    // add and remove options from select box and radio
    static fieldOptions: any = [
        { id: 0, name: 'id', type: 'text', label: 'Id', bootstrapClass: ["d-none"] },
        { id: 1, name: 'option', type: 'text', label: 'Option', required: true, alphanumeric: false, bootstrapClass: ["col-12"] },
    ]


    //set validation for these types
    static validationFields: DynamicFormConfig = {
        'text': [
          { id: 0, name: 'id', type: 'text', label: 'Id', bootstrapClass: ["d-none"] },
          { id: 1, name: 'required', type: 'toggle', label: 'Required', required: false, bootstrapClass: ["col-6"] },
          { id: 2, name: 'email', type: 'toggle', label: 'email', required: false, bootstrapClass: ["col-6"] },
          { id: 3, name: 'minLength', type: 'text', label: 'Min Length', required: false, pattern: '^[0-9]+$', maxLength: 30, bootstrapClass: ["col-6"] },
          { id: 4, name: 'maxLength', type: 'text', label: 'Max Length', required: false, pattern: '^[0-9]+$', maxLength: 30, bootstrapClass: ["col-6"] },
          { id: 5, name: 'pattern', type: 'text', label: 'Pattern', required: false, alphanumeric: false, bootstrapClass: ["col-12"] },
        ],
        'textarea': [
          { id: 0, name: 'id', type: 'text', label: 'Id', bootstrapClass: ["d-none"] },
          { id: 1, name: 'minLength', type: 'text', label: 'Min Length', required: false, pattern: '^[0-9]+$', maxLength: 30, bootstrapClass: ["col-6"] },
          { id: 2, name: 'maxLength', type: 'text', label: 'Max Length', required: false, pattern: '^[0-9]+$', maxLength: 30, bootstrapClass: ["col-6"] },
          { id: 3, name: 'required', type: 'toggle', label: 'Required', required: false, bootstrapClass: ["col-6"] },
        ],
        'toggle': [
          { id: 0, name: 'id', type: 'text', label: 'Id', bootstrapClass: ["d-none"] },
          { id: 1, name: 'required', type: 'toggle', label: 'Required', required: false, bootstrapClass: ["col-6"] },
        ],
        'checkbox': [
          { id: 0, name: 'id', type: 'text', label: 'Id', bootstrapClass: ["d-none"] },
          { id: 1, name: 'required', type: 'toggle', label: 'Required', required: false, bootstrapClass: ["col-6"] },
        ]
      }

      static sampleFields: (TextBoxConfig | SelectBoxConfig | RadioButtonsConfig | CheckboxConfig | ToggleSwitchConfig | TextareaConfig)[] = [
        { id: 1, name: 'username', type: 'text', label: 'Username', required: true, minLength: 3, maxLength: 20, alphanumeric: true, bootstrapClass: ["col-6"] },
        { id: 2, name: 'email', type: 'text', label: 'Email', email: true, required: true, bootstrapClass: ["col-6"] },
        { id: 3, name: 'age', type: 'text', label: 'Age', required: true, pattern: '^[0-9]+$', minLength: 1, maxLength: 30, bootstrapClass: ["col-4"] },
        { id: 4, name: 'feedback', type: 'textarea', label: 'Feedback', minLength: 10, maxLength: 200, bootstrapClass: ["col-4"] },
        { id: 5, name: 'gender', type: 'select', label: 'Gender', options: ['Male', 'Female'], required: true, bootstrapClass: ["col-4"] },
        { id: 6, name: 'subscribe', type: 'checkbox', label: 'Subscribe to newsletter', required: true, bootstrapClass: ["col-12"] },
        { id: 7, name: 'terms', type: 'radio', label: 'Accept Terms', options: ['Yes', 'No'], required: true, bootstrapClass: ["col-3"] },
      ];
}