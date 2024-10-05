import { Routes } from '@angular/router';
import { AddEditFormComponent } from './form/add-edit-form/add-edit-form.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/:id', component: UsersComponent },
    { path: 'design', component: AddEditFormComponent },
    { path: 'design/edit/:id', component: AddEditFormComponent }
];
