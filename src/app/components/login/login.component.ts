import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router) {
    sessionStorage.clear();
  }

  userdata: any;

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  })

  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.GetbyCode(this.loginForm.value.username).subscribe(res => {
        this.userdata = res;
        console.log(this.userdata);
        if (this.userdata.password === this.loginForm.value.password) {
          if (this.userdata.isactive) {
            sessionStorage.setItem('userdata', this.userdata.tasks);
            sessionStorage.setItem('username', this.userdata.id);
            sessionStorage.setItem('userrole', this.userdata.role);
            this.router.navigate(['']);
          }
          else {

            this.toastr.error('Please contact admin', 'In active user');
          }
        }
        else {
          this.toastr.error('Invalid Credentials');
        }

      })


    }

  }
}
