import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

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
  constructor(private router: Router, private service: AuthService) { }

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
}
