import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { VoteCatsComponent } from './vote-cats/vote-cats.component';
import { ViewCatsComponent } from './view-cats/view-cats.component';
import { ConnexionDialogComponent } from './connexion-dialog/connexion-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  { path: 'vote', component: VoteCatsComponent },
  { path: 'cats', component: ViewCatsComponent },
  {path : 'test', component: ConnexionDialogComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    VoteCatsComponent,
    ViewCatsComponent,
    ConnexionDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule
  ],
  providers: [],
  entryComponents: [
    ConnexionDialogComponent,
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
