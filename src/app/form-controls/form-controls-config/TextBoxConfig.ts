import { FieldConfig } from "./FieldConfig";

export interface TextBoxConfig extends FieldConfig {
    type: 'text';
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    email?: boolean;
    alphanumeric?: boolean;
}