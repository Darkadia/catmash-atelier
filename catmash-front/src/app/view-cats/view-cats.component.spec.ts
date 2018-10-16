import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCatsComponent } from './view-cats.component';

describe('ViewCatsComponent', () => {
  let component: ViewCatsComponent;
  let fixture: ComponentFixture<ViewCatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
