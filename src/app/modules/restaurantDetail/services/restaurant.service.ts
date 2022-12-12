import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../../../shared/models/Restaurant.model';
import { Product } from '../../../shared/models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private myAppUrlRistorante = environment.myAppUrl + '/ristorante';
  private restaurantByDirectorCode = '/getRistorantiByCodiceDirettore';
  private insertRestaurant = '/insertRistorante';
  private deleteRestaurantByCodice = '/deleteRistoranteByCodice';

  constructor(private http: HttpClient) {}

  getAllRestaurantsByDirectorCode(directorCode: string): Observable<any> {
    return this.http.get(this.myAppUrlRistorante + this.restaurantByDirectorCode + '/' + directorCode);
  }

  insertRistorante(ristorante: Restaurant): Observable<any> {
    return this.http.post(this.myAppUrlRistorante + this.insertRestaurant, ristorante);
  }

  deleteRistorante(codiceRistorante: string): Observable<any> {
    return this.http.delete(this.myAppUrlRistorante + this.deleteRestaurantByCodice + '/' + codiceRistorante);
  }

}
