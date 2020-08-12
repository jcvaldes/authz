import { environment } from '../../../../environments/environment';
import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() title: string;
  // @Input() roleId: number;
  @Output() userSubmited = new EventEmitter(); 

  form: FormGroup ;

  url = `${environment.apiUrl}/api/user`;

  userSubs: Subscription = new Subscription();

  constructor(private httpService: HttpService,
              private router: Router) { }

  ngOnInit(): void {
    this.createFormGroup();
  }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
  createFormGroup(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      firstname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]),
      password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")]),//Minimum eight characters, at least one letter and one number

    });
  }
  onClear(): void {
    this.form.reset();
  }
  onSubmit(): void {
  
    const payload = this.form.value;
    if ( !this.form.get('id').value) {
      this.userSubs = this.httpService.post(this.url, payload).subscribe(resp => {
        this.onClear();
        this.userSubmited.emit(resp);
        Swal.fire('Atención', 'El usuario ha sido creado', 'success');
        this.router.navigate(['/users/list']);

      });
    } else {
      const url = `${this.url}/${this.form.get('id').value}`;
      this.userSubs = this.httpService.put(url, payload).subscribe(resp => {
        this.onClear();
        this.userSubmited.emit(resp);
        Swal.fire('Atención', 'El usuario ha sido actualizado', 'success');
      });

    }
  }
  onEdit(id: number): void {
    const url = `${this.url}/${id}`;
    this.httpService.getSingle(url).subscribe((resp: any) => {
      debugger
      
      this.form.setValue(_.omit(resp.user, ['createdAt', 'active']));
    });
  }
}



