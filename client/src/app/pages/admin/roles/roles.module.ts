import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesRoutingModule } from './roles-routing.module';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RolesComponent } from './roles.component';

@NgModule({
  declarations: [
    RolesComponent,
    RoleDetailComponent,
    RoleListComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class RolesModule { }
