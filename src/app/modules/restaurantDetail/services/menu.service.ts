import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private myAppUrlMenu = environment.myAppUrl + '/menu';
  private insertProductToMenu = '/insertProductToMenu';
  private MenuByCode = '/getMenuByCodice';

  constructor(private http: HttpClient) {}

  addNewProductToMenu(product: Product): Observable<any> {
    return this.http.post(this.myAppUrlMenu + this.insertProductToMenu, product);
  }

  getMenuByCode(menuCode: string): Observable<any> {
    return this.http.get(this.myAppUrlMenu + this.MenuByCode + '/' + menuCode);
  }
}
