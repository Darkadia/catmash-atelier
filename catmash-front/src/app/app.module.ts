import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { VoteCatsComponent } from './vote-cats/vote-cats.component';
import { ViewCatsComponent } from './view-cats/view-cats.component';


const appRoutes: Routes = [
  { path: 'vote', component: VoteCatsComponent },
  { path: 'cats', component: ViewCatsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    VoteCatsComponent,
    ViewCatsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
