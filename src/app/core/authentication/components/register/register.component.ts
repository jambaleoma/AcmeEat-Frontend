import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
    ) { }

  onSubmit(form: NgForm) {
    if (form.value.psw !== form.value.password2) {
      this.messageService.add({severity: 'error', summary: 'Registrazione', detail: 'Le password non corrispondono!'});
    } else {
      form.value.password2 = null;
      delete form.value.password2;
      this.authenticationService.register(form.value).subscribe(result => {
        if (result) {
          sessionStorage.setItem('director', JSON.stringify(result.response));
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
