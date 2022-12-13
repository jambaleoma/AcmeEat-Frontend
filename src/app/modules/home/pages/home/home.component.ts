import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Director } from 'src/app/shared/models/director.model';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  director: Director;
  faUser = faUser;
  faExit = faRightFromBracket;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.director = JSON.parse(sessionStorage.getItem('director'));
  }

  goToLogOut() {
    sessionStorage.removeItem('director');
    sessionStorage.removeItem('currentRestaurantCode');
    this.authenticationService.logout().subscribe(resp => {
      if (resp) {
        this.router.navigateByUrl('/welcome');  
      }
    });
  }

  goToDirectorDetails() {
    this.router.navigateByUrl('/myInterviewApp/home');
  }

}
