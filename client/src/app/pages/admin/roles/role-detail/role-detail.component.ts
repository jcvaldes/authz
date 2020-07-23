import { environment } from './../../../../../environments/environment';
import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../../services/http.service';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Output() roleSubmited = new EventEmitter();
  form: FormGroup;
  url = `${environment.apiUrl}/api/role`;
  roleSubs: Subscription;

  constructor(private httpService: HttpService ){}

  ngOnInit(): void {
    this.createFormGroup();
  }
  ngOnDestroy(): void {
    this.roleSubs.unsubscribe();
  }
  createFormGroup(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
  }
  onClear(): void {
    this.form.reset();
  }
  onSubmit(): void {
    const payload = this.form.value;
    this.roleSubs = this.httpService.post(this.url, payload).subscribe(resp => {
      this.onClear();
      this.roleSubmited.emit(resp);
      Swal.fire('Atención', 'El rol ha sido creado', 'success');
    });
  }

}
