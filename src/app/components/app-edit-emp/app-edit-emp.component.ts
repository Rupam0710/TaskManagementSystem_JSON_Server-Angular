import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DialogRef } from '@angular/cdk/dialog';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-app-edit-emp',
  templateUrl: './app-edit-emp.component.html',
  styleUrl: './app-edit-emp.component.scss'
})
export class AppEditEmpComponent implements OnInit {

  category: string[] = ['Work', 'Personal', 'Shopping', 'Travel', 'Others']
  status: string[] = ['Complete', 'In Progress', 'Not Yet Started']

  empForm: FormGroup;
  constructor(private builder: FormBuilder, private service: AuthService, private dialog: MatDialogRef<AppEditEmpComponent>, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this.builder.group({
      firstname: this.builder.control('', Validators.required),
      lastname: this.builder.control('', Validators.required),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      duedate: this.builder.control('', Validators.required),
      gender: this.builder.control('', Validators.required),
      category: this.builder.control('', Validators.required),
      company: this.builder.control('', Validators.required),
      task: this.builder.control('', Validators.required),
      status: this.builder.control('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  userdata: any;
  onFormSubmit() {
    if (this.empForm.valid) {

      if (this.data) {
        // this.service.updateEmployee(this.data.id, this.empForm.value).subscribe({
        //   next: (val: any) => {
        //     this.toastr.success('Employee Details Updated Successfully.');
        //     this.dialog.close(true);
        //     this.service.sendData(val);
        //   },
        //   error: (err: any) => {
        //     this.toastr.warning(err)
        //   }
        // })
        this.service.updateTask(sessionStorage.getItem('username'), this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Employee Details Updated Successfully.');
            this.dialog.close(true);
            this.service.sendData(val);
          },
          error: (err: any) => {
            this.toastr.warning(err)
          }
        })
      }
      else {
        // this.service.addEmployee(this.empForm.value).subscribe({
        //   next: (val: any) => {
        //     this.toastr.success('Employee Details Added Successfully.');
        //     this.dialog.close(true);
        //     this.service.sendData(val);
        //   },
        //   error: (err: any) => {
        //     this.toastr.warning(err)
        //   }
        // })
        this.service.addTask(sessionStorage.getItem('username'), this.empForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Employee Details Added Successfully.');
            this.dialog.close(true);
            this.service.sendData(val);
          },
          error: (err: any) => {
            this.toastr.warning(err)
          }
        })




      }

    }
    else {
      this.toastr.warning('Please enter valid data')
    }
  }

}
