import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildComponent } from './list-build.component';

describe('ListBuildComponent', () => {
  let component: ListBuildComponent;
  let fixture: ComponentFixture<ListBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
