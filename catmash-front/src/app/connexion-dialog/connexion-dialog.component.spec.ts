import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionDialogComponent } from './connexion-dialog.component';

describe('ConnexionDialogComponent', () => {
  let component: ConnexionDialogComponent;
  let fixture: ComponentFixture<ConnexionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnexionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
