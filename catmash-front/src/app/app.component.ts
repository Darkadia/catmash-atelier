import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from "@angular/material";
import {Overlay} from '@angular/cdk/overlay';
import { ConnexionDialogComponent } from './connexion-dialog/connexion-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Catmash';

  connexionDialogRef: MatDialogRef<ConnexionDialogComponent>;
  constructor(private dialog: MatDialog, private overlay: Overlay) {}
  
  openDialog() {
    this.dialog.open(ConnexionDialogComponent, {

      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    hasBackdrop: true;
  }
}
