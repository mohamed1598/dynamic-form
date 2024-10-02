export interface FieldConfig {
    id:any;
    name: string;
    label: string;
    required?: boolean;
    type:string;
    isSubmitted?: boolean;
    bootstrapClass: string[] ;
}