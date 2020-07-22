import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { Role } from '../role.model';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  roles: Role[];
  url = `${environment.apiUrl}/api/role`;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get(this.url)
      .subscribe((roles: any) => {
        debugger
        this.roles = roles;
      });
  }

}
