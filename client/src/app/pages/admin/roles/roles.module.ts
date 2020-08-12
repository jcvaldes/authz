import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesRoutingModule } from './roles-routing.module';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RolesComponent } from './roles.component';
import { RoleTableComponent } from './role-table/role-table.component';

@NgModule({
  declarations: [
    RolesComponent,
    RoleDetailComponent,
    RoleListComponent,
    RoleTableComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class RolesModule { }
