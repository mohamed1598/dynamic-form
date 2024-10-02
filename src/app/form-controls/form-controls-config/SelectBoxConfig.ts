import { FieldConfig } from "./FieldConfig";

export interface SelectBoxConfig extends FieldConfig {
    type: 'select';
    options: string[];
}