import { Product } from './../../../../shared/models/Product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../../../shared/models/Restaurant.model';
import { Menu } from 'src/app/shared/models/Menu.model';
import { MenuService } from '../../services/menu.service';
import { Response } from 'src/app/shared/models/Response.model';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';


@Component({
  selector: 'app-Restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RistorantDetailComponent implements OnInit{

  public faUser = faUser;
  public faExit = faRightFromBracket;
  public listaRistoranti: Restaurant[] = [];
  public listaProdottiMenu: Product[] = [];
  public currentMenu: Menu = {};
  public currentRestaurant: Restaurant = {};
  public selectedSpecialty: Product;

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}
  
  ngOnInit() {
    this.getRestaurantAndMenuInfo();
  }

  getRestaurantAndMenuInfo() {
    const currentDirectorCode = JSON.parse(sessionStorage.getItem('director')).codiceDirettore;
    const currentRestaurantCode = sessionStorage.getItem('currentRestaurantCode');
    this.restaurantService.getAllRestaurantsByDirectorCode(currentDirectorCode).subscribe((restaurantResponse: Response) => {
      this.currentRestaurant = restaurantResponse.response.find(r => r.codiceRistorante === currentRestaurantCode);
      this.listaRistoranti.push(this.currentRestaurant);
      this.menuService.getMenuByCode(this.currentRestaurant.codiceMenu).subscribe((menuRespone: Menu) => {
        this.currentMenu = menuRespone;
        this.menuService.getAllProductsByMenu(this.currentMenu.codiceMenu).subscribe((allProductResp: Response) => {
          let allProduct: Product[] = allProductResp.response as Product[];
          for (let prodottoMenu of allProduct) {
            this.listaProdottiMenu.push(prodottoMenu);
          }
          if (this.currentMenu.specialita) {
            this.selectedSpecialty = this.listaProdottiMenu.find(p => p.codiceProdotto === this.currentMenu.specialita);
          }
        });
      });
    });
  }

  goToLogOut() {
    sessionStorage.removeItem('director');
    this.router.navigateByUrl('/welcome');
  }

  goToDirectorDetails() {
    this.router.navigateByUrl('/myInterviewApp/home');
  }

  setSpecialtyToMenu() {
    this.menuService.setSpecialProductToMenu(this.currentMenu.codiceMenu, this.selectedSpecialty?.codiceProdotto ? this.selectedSpecialty?.codiceProdotto : null).subscribe((resp: Menu) => {
      if (resp) {
        this.currentMenu = resp;
      }
    });
  }

  deactiveRestaurant() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler disattivare questo ristorante?',
      header: 'Conferma disattivazione ristorante: "' + this.currentRestaurant.nome + '"',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.restaurantService.setRestaurantOff(this.currentRestaurant.codiceRistorante).subscribe((resp: Response) => {
          this.messageService.add({severity:'success', summary:'Confermato', detail:'Disattivazione avvenuta con successo'});
          setTimeout(() => {
            this.goToDirectorDetails();
          }, 2000);
        });
      },
      reject: (type) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'success', summary:'Rifiutato', detail:'Ristorante non disattivato'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancellato', detail:'Disattivazione ristorante cancellata'});
              break;
          }
      }
  });
  }

  activeRestaurant() {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler attivare questo ristorante?',
      header: 'Conferma attivazione ristorante: "' + this.currentRestaurant.nome + '"',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.restaurantService.confirmRestaurantEntering(this.currentRestaurant.codiceRistorante).subscribe((resp: Response) => {
          this.messageService.add({severity:'success', summary:'Confermato', detail:'Attivazione avvenuta con successo'});
          setTimeout(() => {
            this.goToDirectorDetails();
          }, 2000);  
        });
      },
      reject: (type) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'success', summary:'Rifiutato', detail:'Ristorante non attivato'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancellato', detail:'Attivazione ristorante cancellata'});
              break;
          }
      }
  });
  }

}
