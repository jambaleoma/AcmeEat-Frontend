import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { ToastService } from 'src/app/core/service/toast.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {

  @ViewChild('toast') toast!: ElementRef;

  constructor(
    private toastService: ToastService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    this.authenticationService.resetPassword(form.value.codiceDirettore).subscribe(
      result => {},
      error => {
        if (error.status === 202) {
          this.showToast(error.statusText);
        }
      });
  }

  goToLogin() {
    this.router.navigateByUrl('myInterviewApp/login');
  }

  showToast(status: string) {
    if (status === 'Accepted') {
      this.toastService.showToast(this.toast.nativeElement, {
        title: 'SUCCESSO!',
        icon: 'e-warning toast-icons',
        content: 'RESET PASSWORD AVVENUTO CON SUCCESSO!',
        position: { X: 'Right', Y: 'Top' },
        timeOut: 1000000
      });
    }
  }

  hideToast() {
    this.toastService.hideToast();
  }

}
