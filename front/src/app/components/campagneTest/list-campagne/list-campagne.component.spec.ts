import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCampagneComponent } from './list-campagne.component';

describe('ListCampagneComponent', () => {
  let component: ListCampagneComponent;
  let fixture: ComponentFixture<ListCampagneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCampagneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCampagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
