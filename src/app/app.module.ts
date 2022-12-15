import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { ApplicationFrameComponent } from './application-frame/application-frame.component';
import { AuthenticationModule } from './core/authentication/authentication.module';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { DirectorDetailComponent } from './modules/directorDetail/pages/director-detail/director-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { RistorantDetailComponent } from './modules/restaurantDetail/pages/Restaurant-detail/Restaurant-detail.component';
import { RestaurantService } from './modules/restaurantDetail/services/restaurant.service';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CittaByCodicePipe } from './shared/pipes/citta-by-codice.pipe';
import { AddNewRestaurantComponent } from './modules/directorDetail/pages/add-new-restaurant/add-new-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewRestaurantProductsComponent } from './modules/directorDetail/pages/add-new-restaurant-products/add-new-restaurant-products.component';


@NgModule({
  declarations: [
    AppComponent,
    ApplicationFrameComponent,
    HomeComponent,
    DirectorDetailComponent,
    RistorantDetailComponent,
    CittaByCodicePipe,
    AddNewRestaurantComponent,
    AddNewRestaurantProductsComponent
  ],
  imports: [
    FormsModule, 
    BrowserModule,
    HttpClientModule,
    routing,
    AuthenticationModule,
    FontAwesomeModule,
    TableModule,
    BrowserAnimationsModule,
    RippleModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule
  ],
  providers: [RestaurantService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
