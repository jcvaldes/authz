import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  roles: any;
  url = `${environment.apiUrl}`;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
  }

}
