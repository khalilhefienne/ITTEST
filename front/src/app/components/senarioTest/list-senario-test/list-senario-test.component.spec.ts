import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSenarioTestComponent } from './list-senario-test.component';

describe('ListSenarioTestComponent', () => {
  let component: ListSenarioTestComponent;
  let fixture: ComponentFixture<ListSenarioTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSenarioTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSenarioTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
