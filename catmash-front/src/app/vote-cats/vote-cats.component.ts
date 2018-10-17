import { Component, OnInit } from '@angular/core';
import { Cat } from '../classes/cat';

import { CatsService } from '../services/cats/cats.service';
// import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-vote-cats',
  templateUrl: './vote-cats.component.html',
  styleUrls: ['./vote-cats.component.css']
})
export class VoteCatsComponent implements OnInit {

  selectedCat: Cat;
  cats: Cat[];
  i: number = 0;

  constructor(private catService:CatsService) { }

  ngOnInit() { 
    this.catService.getCats()
    .subscribe(cats => {
      this.cats = cats;
      this.selectedCat = cats[0];
    });
  }

  onSelect(cat: Cat, vote: Boolean): void {
    this.catService.voteCat(this.selectedCat)
    .subscribe(response => console.log(response));

    this.i = this.i + 1;
    this.selectedCat = this.cats[this.i];
  }

}
