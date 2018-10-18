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
    this.updateCats()
  }

  updateCats(): void {
    this.catService.getCats()
    .subscribe(cats => {
      console.log(cats);
      this.cats = cats["foundCats"];
      this.selectedCat = this.cats[0];
    });
  }

  onSelect(vote: Boolean): void {
    this.catService.voteCat(this.selectedCat, vote)
    .subscribe(response => console.log(response));
    if (this.i == this.cats.length){
      this.updateCats();
    }
    else {
      this.i = this.i + 1;
      this.selectedCat = this.cats[this.i];
    }
  }
}