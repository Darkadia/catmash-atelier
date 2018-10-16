import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteCatsComponent } from './vote-cats.component';

describe('VoteCatsComponent', () => {
  let component: VoteCatsComponent;
  let fixture: ComponentFixture<VoteCatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteCatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
