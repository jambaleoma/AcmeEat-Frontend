import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { CittaService } from 'src/app/core/service/citta.service';
import { RestaurantService } from 'src/app/modules/restaurantDetail/services/restaurant.service';
import { City } from 'src/app/shared/models/City.model';
import { Restaurant } from 'src/app/shared/models/Restaurant.model';
import { Product } from '../../../../shared/models/Product.model';
import { MenuService } from '../../../restaurantDetail/services/menu.service';

@Component({
  selector: 'app-add-new-restaurant-products',
  templateUrl: './add-new-restaurant-products.component.html',
  styleUrls: ['./add-new-restaurant-products.component.scss']
})
export class AddNewRestaurantProductsComponent {


  public newRestaurantProduct: Product = {};
  public listacitta: City[];
  public isformNewRestaurantValid = false;
  public showRestaurantAddedModal = false;
  public faUser = faUser;
  public faExit = faRightFromBracket;
  
  @ViewChild('formNewRestaurantProduct', { static: true }) formNewRestaurantProduct: NgForm;

  constructor(
    private menuService: MenuService,
    private cittaService: CittaService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.cittaService.getAllcitta().subscribe((resp: City[]) => {
      this.listacitta = resp;
    });
  }

  addNewRestaurantProduct() {
    this.menuService.addNewProductToMenu(this.formNewRestaurantProduct.value).subscribe(resp => {
      if (resp) {
        this.showRestaurantAddedModal = true;
      }
    });
  }

  resetNewRestaurantForm() {
    this.formNewRestaurantProduct.reset();
  }

  checkValid() {
    return !this.formNewRestaurantProduct.valid;
  }

  goToLogOut() {
    sessionStorage.removeItem('director');
    this.router.navigateByUrl('/welcome');
  }

  goToDirectorDetails() {
    this.router.navigateByUrl('/myInterviewApp/home');
  }

  resetform() {
    this.formNewRestaurantProduct.reset();
    this.showRestaurantAddedModal=false;
  }


}
