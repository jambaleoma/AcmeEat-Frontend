import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Restaurant } from '../../../../shared/models/Restaurant.model';
import { CittaService } from '../../../../core/service/citta.service';
import { City } from '../../../../shared/models/City.model';
import { NgForm } from '@angular/forms';
import { RestaurantService } from '../../../restaurantDetail/services/restaurant.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { faL, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-new-restaurant',
  templateUrl: './add-new-restaurant.component.html',
  styleUrls: ['./add-new-restaurant.component.scss']
})
export class AddNewRestaurantComponent implements OnInit{
  
  public newRestaurant: Restaurant = {};
  public listacitta: City[];
  public isformNewRestaurantValid = false;
  public showRestaurantAddedModal = false;
  public faUser = faUser;
  public faExit = faRightFromBracket;
  
  @ViewChild('formNewRestaurant', { static: true }) formNewRestaurant: NgForm;

  constructor(
    private restaurantService: RestaurantService,
    private cittaService: CittaService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.cittaService.getAllcitta().subscribe((resp: City[]) => {
      this.listacitta = resp;
    });
  }

  addNewRestaurant() {
    console.log(this.formNewRestaurant.value);
    this.newRestaurant.nome = this.formNewRestaurant.value.nome;
    this.newRestaurant.descrizione = this.formNewRestaurant.value.descrizione;
    this.newRestaurant.codiceCitta = this.formNewRestaurant.value.citta.codiceCitta;
    this.restaurantService.insertRistorante(this.newRestaurant).subscribe(resp => {
      if (resp) {
        this.showRestaurantAddedModal = true;
      }
    });
  }

  resetNewRestaurantForm() {
    this.formNewRestaurant.reset();
  }

  checkValid() {
    return !this.formNewRestaurant.valid;
  }

  goToAddNewRestaurantProducts() {
    this.showRestaurantAddedModal = false;
    this.router.navigateByUrl('myInterviewApp/addNewRestaurantProduct');
  }

  goToLogOut() {
    sessionStorage.removeItem('director');
    this.router.navigateByUrl('/welcome');
  }

  goToDirectorDetails() {
    this.router.navigateByUrl('/myInterviewApp/home');
  }


}
