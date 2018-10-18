import { Component, OnInit } from '@angular/core';
import { Cat } from '../classes/cat';
import { CatsService } from '../services/cats/cats.service';

@Component({
  selector: 'app-view-cats',
  templateUrl: './view-cats.component.html',
  styleUrls: ['./view-cats.component.css']
})
export class ViewCatsComponent implements OnInit {

  cats: Cat[];

  constructor(private catService: CatsService) { }

  ngOnInit() {
    this.getCats();
  }

  getCats(): void {
    this.catService.getAllCats()
    .subscribe(cats => {
      this.cats = cats;
    });
  }
}
