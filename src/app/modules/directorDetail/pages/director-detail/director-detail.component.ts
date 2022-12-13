import { Component, Input, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/modules/restaurantDetail/services/restaurant.service';
import { Restaurant } from '../../../../shared/models/Restaurant.model';
import { Response } from '../../../../shared/models/Response.model';
import { Director } from 'src/app/shared/models/director.model';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrls: ['./director-detail.component.scss']
})
export class DirectorDetailComponent implements OnInit {

  @Input() director: Director;
  public listaRistoranti = [];
  public directors: Director[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.directors.push(this.director);
    this.fillRestaurants();
  }

  goToAddNewRestaurant() {
    this.router.navigateByUrl('myInterviewApp/addNewRestaurant');
  }

  goToAddCheckInfoRestaurant() {
    this.router.navigateByUrl('myInterviewApp/checkInfoRestaurant');
  }

  deleteRestaurant(restaurant: Restaurant) {
    this.confirmDeleteRestaurant(restaurant);
  }

  checkInfoRestaurant(restaurant: Restaurant) {
    sessionStorage.setItem('currentRestaurantCode', restaurant.codiceRistorante);
    this.goToAddCheckInfoRestaurant();
  }

  fillRestaurants() {
    this.restaurantService.getAllRestaurantsByDirectorCode(this.director.codiceDirettore).subscribe((resp: Response) => {
      if (resp.response) {
        this.listaRistoranti = resp.response;
      }
    });
  }

  confirmDeleteRestaurant(restaurant: Restaurant) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare questo Ristorante? Verranno eliminati anche i Menù e i relativi Prodotti associati!',
      header: 'Conferma Eliminazione del Ristorante: "' + restaurant.nome + '"',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.restaurantService.deleteRistorante(restaurant.codiceRistorante).subscribe(resp => {
          this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Eliminaizone Avvenuta con Successo' });
          this.fillRestaurants();
        });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'success', summary: 'Rifiutato', detail: 'Ristorante non Eliminato' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancellato', detail: 'Eliminazione Ristorante Cancellata' });
            break;
        }
      }
    });
  }

}
