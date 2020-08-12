import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  url: string;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.url = `${environment.apiUrl}/api/auth`;
  }
  ngOnInit(): void {
    this.createFormGroup();
  }
  createFormGroup(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }
  onSubmit(): void {
    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };
    this.authService.loginEmailUser(user).subscribe(() => {
      this.onLoginRedirect();
    }, err => this.handleError ); // OJO es lo mismo que this.handleError(err)
  }
  private onLoginRedirect(): void {
    this.router.navigate(['/roles/list']);
  }
  private handleError(err): void {
    if (err.error.errors) {
      Swal.fire('Error', err.error.errors, 'error');
    } else {
      Swal.fire('Error', err.message, 'error');
    }
  }
}
