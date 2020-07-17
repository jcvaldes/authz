import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  url: string;
  constructor(private httpService: HttpService) {
    debugger
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
    const payload = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };
    this.httpService.post(this.url, payload).subscribe((resp) => {
      debugger
      alert('logueo ok');
    }, err => {
      console.error(err);
    });
  }
}
