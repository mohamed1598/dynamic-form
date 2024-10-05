import { Routes } from '@angular/router';
import { AddEditFormComponent } from './form/add-edit-form/add-edit-form.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { SubmitFormComponent } from './users/submit-form/submit-form.component';
import { DynamicGridComponent } from './form/dynamic-grid/dynamic-grid.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/:id', component: UsersComponent },
    { path: 'users/submitForm/:id', component: SubmitFormComponent },
    { path: 'design', component: AddEditFormComponent },
    { path: 'design/edit/:id', component: AddEditFormComponent },
    { path: 'formResult/:id', component: DynamicGridComponent }

];
