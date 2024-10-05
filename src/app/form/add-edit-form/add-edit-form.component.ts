import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextBoxConfig } from '../../form-controls/form-controls-config/TextBoxConfig';
import { SelectBoxConfig } from '../../form-controls/form-controls-config/SelectBoxConfig';
import { RadioButtonsConfig } from '../../form-controls/form-controls-config/RadioButtonsConfig';
import { CheckboxConfig } from '../../form-controls/form-controls-config/CheckboxConfig';
import { ToggleSwitchConfig } from '../../form-controls/form-controls-config/ToggleSwitchConfig';
import { TextareaConfig } from '../../form-controls/form-controls-config/TextareaConfig';
import { FormService } from '../../services/form.service';
import { FieldConfig } from '../../form-controls/form-controls-config/FieldConfig';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { DynamicInputComponent } from "../../dynamic-input/dynamic-input.component";
import { DesignHelper } from './Helpers/design-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage.service';
import { Form } from '../form.model';

@Component({
  selector: 'app-add-edit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    DragDropModule,
    FormsModule,
    ModalModule,
    NgClass,
    DynamicInputComponent
  ],
  templateUrl: './add-edit-form.component.html',
  styleUrl: './add-edit-form.component.css'
})
export class AddEditFormComponent implements OnInit {
  //#region design form 
  formId: any;
  form: FormGroup | any;
  fields: (TextBoxConfig | SelectBoxConfig | RadioButtonsConfig | CheckboxConfig | ToggleSwitchConfig | TextareaConfig)[] = [];
  components: WritableSignal<(TextBoxConfig | SelectBoxConfig | RadioButtonsConfig | CheckboxConfig | ToggleSwitchConfig | TextareaConfig)[]>; // use it from now don't depend on fields
  //#endregion

  //#region dynamic form used for add  edit field and set validation and options
  dynamicForm: FormGroup | any;
  dynamicFields: any = [];
  dynamicSubmit: Function | any;
  submitText: string = 'Submit';
  //#endregion

  //used for drop behavior
  //true means that it will replace the position of 2 components
  //false means that it will insert component in that position and shift other components
  replace: boolean = true;

  //modal
  modalRef?: BsModalRef;



  constructor(private fb: FormBuilder, private formService: FormService, private modalService: BsModalService, private router: Router, private route: ActivatedRoute, private localstorageService: LocalStorageService) {
    this.components = signal([...this.fields]);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.formId = params['id'];

      this.fields = this.localstorageService.getItem('forms')?.find((e: Form) => e.id == this.formId)?.fields;
      this.fields = this.fields ? this.fields : [];
      
      this.components = signal([...this.fields])
      this.form = this.formService.getForm(this.components());
    });
  }

  onSubmit(): void {
    this.fields = this.components();
    if (this.fields?.length > 0) {
      if (this.formId) {
        //edit currentForm
        let forms = this.localstorageService.getItem('forms');
        let updatedForm = forms?.find((e: Form) => e.id = this.formId);
        if (!updatedForm) return;
        updatedForm.fields = this.fields;
        this.localstorageService.setItem('forms', forms);
        this.router.navigate([`/`]);
      } else {
        //create new form
        let forms = this.localstorageService.getItem('forms') ?? [];
        const { v4: uuidv4 } = require('uuid');
        let form = {
          id: uuidv4(),
          fields: this.fields
        };
        forms.push(form);
        this.localstorageService.setItem('forms', forms);
        this.router.navigate([`/`]);
      }
    }


  }

  //#region addField
  onAddFieldModal(template: any) {
    DesignHelper.configFields.forEach((field: FieldConfig) => field.isSubmitted = false);
    this.submitText = 'Save';
    this.dynamicSubmit = this.addField;
    this.dynamicFields = DesignHelper.configFields;
    this.dynamicForm = this.formService.getForm(DesignHelper.configFields);
    this.openModal(template);
  }

  addField() {
    DesignHelper.configFields.forEach((field: FieldConfig) => field.isSubmitted = true);
    if (this.dynamicForm.valid) {
      let value = this.dynamicForm.value;
      value.bootstrapClass = [value.bootstrapClass];

      //assign new id to field
      const { v4: uuidv4 } = require('uuid');
      value.id = uuidv4()

      // push new field 
      const updatedComponents = [...this.components()];
      updatedComponents.push(value);

      this.form = this.formService.getForm(updatedComponents);
      this.components.set(updatedComponents);
      this.modalRef?.hide()

    }
  }
  //#endregion

  //#region editField
  onAddValidationModal(type: string, id: string, template: any) {
    DesignHelper.validationFields[type].forEach((field: FieldConfig) => field.isSubmitted = false);
    this.submitText = 'Save';
    this.dynamicSubmit = this.editField;
    this.dynamicFields = DesignHelper.validationFields[type];
    this.dynamicForm = this.formService.getForm(this.dynamicFields);
    this.dynamicForm.patchValue(this.components().find((e: any) => e.id == id));
    this.openModal(template);
  }

  onEditFieldModal(id: any, template: any) {
    DesignHelper.configFields.forEach((field: FieldConfig) => field.isSubmitted = false);
    this.submitText = 'Save';

    //use the same form of add field
    this.onAddFieldModal(template);
    this.dynamicSubmit = this.editField;

    //seed data to config fields
    this.dynamicForm.patchValue(this.components().find(e => e.id == id));
  }

  editField() {
    DesignHelper.configFields.forEach((field: FieldConfig) => field.isSubmitted = true);
    if (this.dynamicForm.valid) {
      let value = this.dynamicForm.value;

      //need this check to avoid doing this in validation form
      if (value?.bootstrapClass) {
        value.bootstrapClass = [value.bootstrapClass]
      }

      const updatedComponents = [...this.components()];
      const index = updatedComponents.findIndex(comp => comp.id === value.id);
      if (index !== -1) {
        //seed props from value then seed props not in value from old object
        updatedComponents[index] = { ...updatedComponents[index], ...value };
      }

      this.form = this.formService.getForm(updatedComponents);
      this.components.set(updatedComponents);
      this.modalRef?.hide()

    }
  }
  //#endregion

  //#region EditOption
  options: any = [];
  onEditOptionsModal(id: any, template: any) {
    DesignHelper.configFields.forEach((field: FieldConfig) => field.isSubmitted = false);
    this.submitText = 'Add Option';
    this.dynamicSubmit = this.editOptions;
    this.dynamicForm = this.formService.getForm(DesignHelper.fieldOptions);
    this.dynamicForm.patchValue({ id: id });
    this.dynamicFields = DesignHelper.fieldOptions;

    //current options of the field
    this.options = (this.components()?.find(e => e.id == id) as RadioButtonsConfig | SelectBoxConfig)?.options;
    this.options = this.options ? this.options : [];

    //keep track when inputs changes to change button
    this.dynamicForm.valueChanges.subscribe((value: any) => {
      if (this.options.includes(value.option)) {
        this.submitText = 'remove Option';
      } else {
        this.submitText = 'add Option';
      }
    });

    this.openModal(template);
  }

  editOptions() {
    DesignHelper.configFields.forEach((field: FieldConfig) => field.isSubmitted = true);
    if (this.dynamicForm.valid) {
      let value = this.dynamicForm.value;
      const updatedComponents: any = [...this.components()];

      //add option if it's not exist and remove it when it exist
      const index = updatedComponents.findIndex((comp: any) => comp.id === value.id);
      if (index !== -1) {
        if (!this.options.includes(value.option)) {
          updatedComponents[index].options = updatedComponents[index].options ? updatedComponents[index].options : [];
          updatedComponents[index].options.push(value.option);
        } else {
          const optionIndex = this.options.findIndex((e: string) => e == value.option);
          updatedComponents[index].options.splice(optionIndex, 1);
        }
      }

      this.form = this.formService.getForm(updatedComponents);
      this.components.set(updatedComponents);
      this.modalRef?.hide()
    }
  }
  //#endregion

  //#region helpers
  hasValidation(type: string): boolean {
    return DesignHelper.validationFields[type] as any;
  }

  hasOptions(type: any): boolean {
    return type == 'select' || type == 'radio';
  }

  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }
  //#endregion

  //#region drag and drop
  draggedItemIndex: number | null = null;

  onDragStart(event: DragEvent, index: number): void {
    this.draggedItemIndex = index;
  }

  onDragOver(event: DragEvent, index: number): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, dropIndex: number): void {
    event.preventDefault();
    if (this.draggedItemIndex === null || this.draggedItemIndex === dropIndex) return;
    const updatedComponents = [...this.components()];
    if (this.replace) {
      [updatedComponents[this.draggedItemIndex], updatedComponents[dropIndex]] = [updatedComponents[dropIndex], updatedComponents[this.draggedItemIndex]]
    } else {
      const [draggedItem] = updatedComponents.splice(this.draggedItemIndex, 1);
      updatedComponents.splice(dropIndex, 0, draggedItem);
    }
    this.components.set(updatedComponents);
    this.draggedItemIndex = null;
  }
  //#endregion
}
