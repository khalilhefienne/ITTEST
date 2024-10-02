import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCasTestComponent } from './list-cas-test.component';

describe('ListCasTestComponent', () => {
  let component: ListCasTestComponent;
  let fixture: ComponentFixture<ListCasTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCasTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCasTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
