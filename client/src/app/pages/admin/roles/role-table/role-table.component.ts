import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { Role } from '../role.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html'
})
export class RoleTableComponent implements OnInit {
  @Output() roleEdited = new EventEmitter();
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
  onEdit(id): void {
    this.roleEdited.emit(id);
  }
  onDelete(id): void {
    const url = `${this.url}/${id}`;
    this.httpService.delete(url).subscribe(resp => {
      Swal.fire('Atención', 'El usuario ha sido eliminado', 'success');
    });
  }
}
