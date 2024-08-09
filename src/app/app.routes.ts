import { Routes } from '@angular/router';
import { UserDetailesComponent } from './Component/user-detailes/user-detailes.component';
import { UserListComponent } from './Component/user-list/user-list.component';
import path from 'path';
export const routes: Routes = [
     {path: '', redirectTo: 'users', pathMatch: 'full' },
     { path: 'users', component: UserDetailesComponent },
     { path: 'user/:id', component: UserListComponent } 
];
