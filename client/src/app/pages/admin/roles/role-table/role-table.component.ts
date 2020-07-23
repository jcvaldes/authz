import { environment } from '../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { Role } from '../role.model';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html'
})
export class RoleTableComponent implements OnInit {
  roles: Role[];
  url = `${environment.apiUrl}/api/role`;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.initialize();
  }
  initialize(): void {
    this.httpService.get(this.url)
    .subscribe((roles: any) => {
      this.roles = roles;
    });
  }
}
