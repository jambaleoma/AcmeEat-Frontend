import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { MessageService } from 'primeng/api';
import { Response } from 'src/app/shared/models/Response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    const initPortal = {
      listaNomiCitta: [],
      listaCodiciRistoranti: []
    }
    this.authenticationService.createPortal(initPortal).subscribe( _ => {});
  }

  onSubmit(form: NgForm) {
    this.authenticationService.login(form.value).subscribe((result: Response) => {
      if (result.response) {
        sessionStorage.setItem('director', JSON.stringify(result.response));
        this.goToHome();
        this.messageService.add({severity:'success', summary:'Login', detail:'Login effettuata con successo'});
      } else {
        this.messageService.add({severity:'error', summary:'Login', detail: result.message});
      }
    });
  }

  goToRegister() {
    this.router.navigateByUrl('/myInterviewApp/register');
  }

  goToHelp() {
    this.router.navigateByUrl('/myInterviewApp/help');
  }

  goToHome() {
    this.router.navigateByUrl('/myInterviewApp/home');
  }

}
