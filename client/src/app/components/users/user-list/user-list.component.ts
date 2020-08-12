import { UserTableComponent } from './../user-table/user-table.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../../services/http.service';
import { User } from './../users.model';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];
  @ViewChild(UserTableComponent, {static: true}) userTable: UserTableComponent;
  @ViewChild(UserDetailComponent, {static: true}) userDetail: UserDetailComponent;
  titulos = {
    titulo1: 'Alta de Usuario'
  };
  url = `${environment.apiUrl}/api/user`;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    // this.httpService.get(this.url)
    //   .subscribe((users: any) => {
    //     this.users = users;
    //   });
  }
  userSubmited(evt): void {
    this.userTable.initialize();
    // this.ngOnInit();
  }
  handleUserEdited(evt): void {
    debugger
    this.userDetail.onEdit(evt);
    // this.userId = evt;
  }
}
