import { Portal } from './../../../../shared/models/Portal.model';
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
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Response } from 'src/app/shared/models/Response.model';

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
  public showCompleteMenuModal = false;
  public faUser = faUser;
  public faExit = faRightFromBracket;
  
  @ViewChild('formNewRestaurantProduct', { static: true }) formNewRestaurantProduct: NgForm;

  constructor(
    private menuService: MenuService,
    private cittaService: CittaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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

  menuComplete() {
    this.confirmMenuComplete();
  }

  confirmMenuComplete() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler terminare l\'inserimento?',
      header: 'Conferma Inserimento Menu',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.menuService.setCompleteMenu().subscribe((resp: Response) => {
          if (resp) {
            this.messageService.add({severity:'success', summary:'Inserimento terminato', detail:'Inserimento terminato con successo'});
            sessionStorage.setItem('currentRestaurantCode', resp.response.codiceRistoranteCorrente);
            setTimeout(() => {
              this.goToInfoRestaurant();
            }, 3000);
          }
        });
      },
      reject: (type) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'success', summary:'Non terminato', detail:'Inserimento non terminato'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancellato', detail:'Terminazione inserimento cancellato'});
              break;
          }
      }
  });
}

  goToLogOut() {
    sessionStorage.removeItem('director');
    this.router.navigateByUrl('/welcome');
  }

  goToDirectorDetails() {
    this.router.navigateByUrl('/myInterviewApp/home');
  }

  goToInfoRestaurant() {
    this.router.navigateByUrl('myInterviewApp/checkInfoRestaurant');
  }

  resetform() {
    this.formNewRestaurantProduct.reset();
    this.showRestaurantAddedModal=false;
  }


}
