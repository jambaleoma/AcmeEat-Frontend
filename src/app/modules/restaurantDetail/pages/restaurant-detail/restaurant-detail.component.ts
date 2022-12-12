import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../../../shared/models/Restaurant.model';
import { Menu } from 'src/app/shared/models/Menu.model';
import { MenuService } from '../../services/menu.service';


@Component({
  selector: 'app-Restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RistorantDetailComponent implements OnInit{

  public faUser = faUser;
  public faExit = faRightFromBracket;
  public listaRistoranti: Restaurant[] = [];
  public listaProdottiMenu: string[] = [];
  public currentMenu: Menu;

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private menuService: MenuService,
  ) {}
  
  ngOnInit() {
    this.getRestaurantAndMenuInfo();
  }

  getRestaurantAndMenuInfo() {
    const currentDirectorCode = JSON.parse(sessionStorage.getItem('director')).codiceDirettore;
    const currentRestaurantCode = sessionStorage.getItem('currentRestaurantCode');
    this.restaurantService.getAllRestaurantsByDirectorCode(currentDirectorCode).subscribe((restaurantResponse: Restaurant[]) => {
      const currentRestaurant = restaurantResponse.find(r => r.codiceRistorante === currentRestaurantCode);
      this.listaRistoranti.push(currentRestaurant);
      this.menuService.getMenuByCode(currentRestaurant.codiceMenu).subscribe((menuResponse: Menu) => {
        this.currentMenu = menuResponse;
        for (let prodottoMenu of menuResponse.codiciProdotti) {
          console.log(prodottoMenu);
        }
        this.listaProdottiMenu = menuResponse.codiciProdotti;
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


}
