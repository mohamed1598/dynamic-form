import { Routes } from '@angular/router';
import { AddEditFormComponent } from './add-edit-form/add-edit-form.component';

export const routes: Routes = [
    { path: 'design', component: AddEditFormComponent },
    { path: 'design/edit/:id', component: AddEditFormComponent }
];
