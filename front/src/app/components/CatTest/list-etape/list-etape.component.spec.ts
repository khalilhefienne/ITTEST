import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtapeComponent } from './list-etape.component';

describe('ListEtapeComponent', () => {
  let component: ListEtapeComponent;
  let fixture: ComponentFixture<ListEtapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEtapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
