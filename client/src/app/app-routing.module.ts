import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  {
    path: 'users',
    children: [
      { path: 'list', component: UserListComponent}
    ]
  },
  // { path: '', pathMatch: 'full', redirectTo: 'home'}
  // { path: 'users' component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
