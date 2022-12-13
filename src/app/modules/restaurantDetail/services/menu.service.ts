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
  private myAppUrlMenuAcme = environment.myAppUrl + '/portaleAcmeEat';
  private insertProductToMenu = '/insertProductToMenu';
  private menuByCode = '/getMenuByCodice';
  private completeMenu = '/terminaInserimento';
  private allProductByMenu = '/getAllProductsByMenu';
  private specialProduct = '/selectSpecialProductToMenu';

  constructor(private http: HttpClient) {}

  addNewProductToMenu(product: Product): Observable<any> {
    return this.http.post(this.myAppUrlMenu + this.insertProductToMenu, product);
  }

  getMenuByCode(menuCode: string): Observable<any> {
    return this.http.get(this.myAppUrlMenu + this.menuByCode + '/' + menuCode);
  }

  setCompleteMenu() {
    return this.http.get(this.myAppUrlMenuAcme + this.completeMenu);
  }

  getAllProductsByMenu(menuCode: string): Observable<any> {
    return this.http.get(this.myAppUrlMenu + this.allProductByMenu + '/' + menuCode);
  }

  setSpecialProductToMenu(menuCode: string, specialProductCode: string): Observable<any> {
    return this.http.put(this.myAppUrlMenuAcme + this.specialProduct + '/' + menuCode + '/' + specialProductCode, null);
  }
}
