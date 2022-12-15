import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HelpComponent } from './components/help/help.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [CommonModule, FormsModule, ButtonModule, ToastModule, CardModule],
  declarations: [LoginComponent, RegisterComponent, HelpComponent, WelcomeComponent],
  exports: [LoginComponent, RegisterComponent, HelpComponent, WelcomeComponent],
  providers: [MessageService]
})
export class AuthenticationModule { }
