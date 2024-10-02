import { FieldConfig } from "./FieldConfig";

export interface TextareaConfig extends FieldConfig {
    type: 'textarea';
    minLength?: number;
    maxLength?: number;
}