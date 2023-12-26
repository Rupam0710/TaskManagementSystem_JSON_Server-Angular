import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router) { }

  registerForm = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false),
  })

  proceedRegistration() {
    if (this.registerForm.valid) {
      this.service.ProceedRegister(this.registerForm.value).subscribe(res => {
        this.toastr.success('Please contact admin for enable access', 'Registered Successfully')
        this.router.navigate(['login'])
      })
    } else {
      this.toastr.warning('Please enter valid data')
    }
  }
}
