import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSequenceTestComponent } from './list-sequence-test.component';

describe('ListSequenceTestComponent', () => {
  let component: ListSequenceTestComponent;
  let fixture: ComponentFixture<ListSequenceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSequenceTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSequenceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
