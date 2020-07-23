import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { Role } from '../role.model';
import { RoleTableComponent } from '../role-table/role-table.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  roles: Role[];
  @ViewChild(RoleTableComponent, {static: true}) roleTable: RoleTableComponent;
  titulos = {
    titulo1: 'Alta de Rol'
  };
  url = `${environment.apiUrl}/api/role`;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    // this.httpService.get(this.url)
    //   .subscribe((roles: any) => {
    //     this.roles = roles;
    //   });
  }
  roleSubmited(evt): void {
    this.roleTable.initialize();
    // this.ngOnInit();
  }

}
