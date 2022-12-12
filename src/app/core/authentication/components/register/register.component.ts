import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.value.password !== form.value.password2) {
      return alert('Le password non corrispondono!');
    } else {
      form.value.password2 = null;
      delete form.value.password2;
      this.authenticationService.register(form.value).subscribe(result => {
        if (result && result.acknowledged) {
          this.router.navigateByUrl('myInterviewApp/login');
        }
      });
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/myInterviewApp/login');
  }

  goToHelp() {
    this.router.navigateByUrl('/myInterviewApp/help');
  }


}
