
import { Component, OnInit } from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { ConnexionDialogComponent } from '../connexion-dialog/connexion-dialog.component';

import { CatsService } from '../services/cats/cats.service';
import { Cat } from '../classes/cat';

@Component({
  selector: 'app-vote-cats',
  templateUrl: './vote-cats.component.html',
  styleUrls: ['./vote-cats.component.css']
})
export class VoteCatsComponent implements OnInit {

  selectedCat: Cat;
  cats: Cat[] = [];
  i = 0;
  token: string;

  connexionDialogRef: MatDialogRef<ConnexionDialogComponent>;
  constructor(private catService: CatsService, private dialog: MatDialog, private overlay: Overlay) { }

  ngOnInit() {
    this.token = localStorage.getItem('authToken');

    this.updateCats();
  }

  updateCats(): void {
    this.catService.getCats()
    .subscribe(cats => {
      this.cats = cats['foundCats'];
      this.selectedCat = this.cats[0];
    });
  }

  onSelect(vote: Boolean): void {
    this.catService.voteCat(this.selectedCat, vote)
    .subscribe(response => console.log(response));
    if (this.i === this.cats.length) {
      this.updateCats();
    } else {
      this.i = this.i + 1;
      this.selectedCat = this.cats[this.i];
    }
  }

  connexion() {
    if (!this.token) {
      this.dialog.open(ConnexionDialogComponent, {

        scrollStrategy: this.overlay.scrollStrategies.noop()
      });
    }
  }

  checkLenght() {
    if (this.token) {
      if (this.cats.length === 0) {
        return false;
      } else if (this.cats.length > 0) {
          return true;
      }
    }
  }
}
