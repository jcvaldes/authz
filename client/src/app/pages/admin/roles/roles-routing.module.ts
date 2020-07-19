import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleListComponent } from './role-list/role-list.component';

const routes: Routes = [{
  path: 'roles', component: RolesComponent,
  children: [
    { path: 'list', component: RoleListComponent },
    { path: 'new', component: RoleDetailComponent },
    { path: ':id', component: RoleDetailComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
