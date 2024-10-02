import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMotsCleComponent } from './list-mots-cle.component';

describe('ListMotsCleComponent', () => {
  let component: ListMotsCleComponent;
  let fixture: ComponentFixture<ListMotsCleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMotsCleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMotsCleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
