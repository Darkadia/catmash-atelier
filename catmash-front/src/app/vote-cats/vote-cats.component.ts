import { Component, OnInit } from '@angular/core';
import { Cat } from '../classes/cat';
import {MatDialog, MatDialogRef, MatDialogConfig} from "@angular/material";
import { ConnexionDialogComponent } from '../connexion-dialog/connexion-dialog.component';

import { CatsService } from '../services/cats/cats.service';

@Component({
  selector: 'app-vote-cats',
  templateUrl: './vote-cats.component.html',
  styleUrls: ['./vote-cats.component.css']
})
export class VoteCatsComponent implements OnInit {

  selectedCat: Cat;
  cats: Cat[];
  i: number = 0;

  connexionDialogRef: MatDialogRef<ConnexionDialogComponent>;
  constructor(private catService:CatsService, private dialog: MatDialog) { }

  ngOnInit() { 
    this.catService.getCats()
    .subscribe(cats => {
      this.cats = cats;
      this.selectedCat = cats[0];
    });
  }

  onSelect(vote: Boolean): void {
    this.catService.voteCat(this.selectedCat)
    .subscribe(response => console.log(response));

    this.i = this.i + 1;
    this.selectedCat = this.cats[this.i];
  }

}
