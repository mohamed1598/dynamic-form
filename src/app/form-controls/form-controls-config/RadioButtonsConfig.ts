import { FieldConfig } from "./FieldConfig";

export interface RadioButtonsConfig extends FieldConfig {
    type: 'radio';
    options: string[];
}