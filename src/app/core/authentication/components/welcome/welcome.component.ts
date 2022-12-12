import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  public serviceStatus = 'DOWN';
  public title = 'ACME EAT';

  constructor(
    private router: Router
    ) { }

  goToLogin() {
    this.router.navigateByUrl('/myInterviewApp/login');
  }

}
