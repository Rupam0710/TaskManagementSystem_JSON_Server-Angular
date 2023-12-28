import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AppEditEmpComponent } from '../app-edit-emp/app-edit-emp.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {

  constructor(private router: Router, private service: AuthService, private dialog: MatDialog,
    private toastr: ToastrService) {
    this.getEmployeeList();
  }

  ngOnInit(): void {
    this.service.getData().subscribe(data => {
      this.getEmployeeList();

    })
  }

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'duedate', 'gender', 'category', 'company', 'task', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getEmployeeList() {
    // this.service.getAllEmployee().subscribe({
    //   next: (res) => {

    //     this.dataSource = new MatTableDataSource(res);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;


    //   },
    //   error: (err) => {

    //     this.toastr.warning(err)
    //   }
    // })
    this.service.getEmployeeList(sessionStorage.getItem('username')).subscribe({
      next: (res) => {

        this.dataSource = new MatTableDataSource(res.tasks);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;


      },
      error: (err) => {

        this.toastr.warning(err)
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmp(id: number) {
    // this.service.deleteEmployee(id).subscribe({
    //   next: (res) => {
    //     this.toastr.success('Employee Deleted Successfully.');
    //     this.getEmployeeList();
    //   },
    //   error: (err) => {
    //     this.toastr.warning(err)
    //   }
    // });

    this.service.deleteTask(sessionStorage.getItem('username'), id).subscribe({
      next: (res) => {
        this.toastr.success('Employee Deleted Successfully.');
        this.getEmployeeList();
      },
      error: (err) => {
        this.toastr.warning(err)
      }
    });
  }

  editEmpForm(data: any) {
    this.dialog.open(AppEditEmpComponent, {
      data
    })
  }
}
