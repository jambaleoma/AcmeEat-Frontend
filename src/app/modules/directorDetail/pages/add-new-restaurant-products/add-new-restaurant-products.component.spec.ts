import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRestaurantProductsComponent } from './add-new-restaurant-products.component';

describe('AddNewRestaurantProductsComponent', () => {
  let component: AddNewRestaurantProductsComponent;
  let fixture: ComponentFixture<AddNewRestaurantProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRestaurantProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewRestaurantProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
