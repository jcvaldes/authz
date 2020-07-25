import { environment } from './../../../../../environments/environment';
import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../../services/http.service';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  @Input() title: string;
  // @Input() roleId: number;
  @Output() roleSubmited = new EventEmitter();
  form: FormGroup;
  url = `${environment.apiUrl}/api/role`;
  roleSubs: Subscription;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.createFormGroup();
  }
  ngOnDestroy(): void {
    this.roleSubs.unsubscribe();
  }
  createFormGroup(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
  }
  onClear(): void {
    this.form.reset();
  }
  onSubmit(): void {
    debugger
    const payload = this.form.value;
    if ( !this.form.get('id').value) {
      this.roleSubs = this.httpService.post(this.url, payload).subscribe(resp => {
        this.onClear();
        this.roleSubmited.emit(resp);
        Swal.fire('Atención', 'El rol ha sido creado', 'success');
      });
    } else {
      const url = `${this.url}/${this.form.get('id').value}`;
      this.roleSubs = this.httpService.put(url, payload).subscribe(resp => {
        this.onClear();
        this.roleSubmited.emit(resp);
        Swal.fire('Atención', 'El rol ha sido actualizado', 'success');
      });

    }
  }
  onEdit(id: number): void {
    const url = `${this.url}/${id}`;
    this.httpService.getSingle(url).subscribe((resp: any) => {
      this.form.setValue(_.omit(resp.role, ['createdAt', 'active']));
    });
  }
}
