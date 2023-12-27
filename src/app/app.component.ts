import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AppEditEmpComponent } from './components/app-edit-emp/app-edit-emp.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'TaskManagementSystem_JSON_Server';

  collapsed = true;
  ismenurequired = false;
  isadminuser = false;
  constructor(private router: Router, private service: AuthService, private dialog: MatDialog) { }



  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl === '/login' || currentUrl === '/register') {
      this.ismenurequired = false;
    }
    else {
      this.ismenurequired = true;
    }

    if (this.service.GetUserRole() === 'admin') {
      this.isadminuser = true;
    } else {
      this.isadminuser = false;
    }
  }



  openAddEditEmpForm() {
    this.dialog.open(AppEditEmpComponent);

  }

}
