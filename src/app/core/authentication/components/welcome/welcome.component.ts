import { Router } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  encapsulation: ViewEncapsulation.None
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
