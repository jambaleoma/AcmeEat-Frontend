import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RistorantDetailComponent } from './Restaurant-detail.component';

describe('RistorantDetailComponent', () => {
  let component: RistorantDetailComponent;
  let fixture: ComponentFixture<RistorantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RistorantDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RistorantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
