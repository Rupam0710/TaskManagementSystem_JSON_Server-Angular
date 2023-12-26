import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrl: './updatepopup.component.scss'
})
export class UpdatepopupComponent implements OnInit {
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<UpdatepopupComponent>) { }

  rolelist: any;
  editdata: any;
  ngOnInit(): void {
    this.service.GetAllRole().subscribe(res => {
      this.rolelist = res;
    })

    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.GetbyCode(this.data.usercode).subscribe(res => {
        this.editdata = res;
        this.registerForm.setValue({ id: this.editdata.id, name: this.editdata.name, email: this.editdata.email, password: this.editdata.password, role: this.editdata.role, gender: this.editdata.gender, isactive: this.editdata.isactive })
      })
    }
  }

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  })

  updateuser() {
    if (this.registerForm.valid) {
      this.service.UpdateUser(this.registerForm.value.id, this.registerForm.value).subscribe(res => {
        this.toastr.success('Updated Successfully.');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Please select a role.')
    }
  }
}
