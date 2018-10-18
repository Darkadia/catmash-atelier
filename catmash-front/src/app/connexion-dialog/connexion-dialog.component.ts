import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConnexionService } from '../services/connexion/connexion.service';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';


@Component({
  selector: 'app-connexion-dialog',
  templateUrl: './connexion-dialog.component.html',
  styleUrls: ['./connexion-dialog.component.css']
})
export class ConnexionDialogComponent implements OnInit {

  connexionForm: FormGroup;
  registerForm: FormGroup;
  token : string;
  username : string =  localStorage.getItem('username');
  email: string = localStorage.getItem('email');

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ConnexionDialogComponent>,
    private connexionService: ConnexionService)
  {}

  ngOnInit() {
    this.connexionForm = this.formBuilder.group({
      username: '',
      password: ''
    })
    this.registerForm = this.formBuilder.group({
      username: '',
      password: '',
      email: ''
    })
    this.token = localStorage.getItem("authToken");
    if (this.token) {
      this.username =  localStorage.getItem('username');
      console.log(this.username);
      this.email = localStorage.getItem('email');
    }
  }

 getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  
  connexionSubmit(form) {
    console.log(form.value);
    this.connexionService.login(form.value)
    .subscribe(response => {
      console.log(response);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('username', response.user.username);
      localStorage.setItem('email', response.user.email);
    });
    console.log("Token jwt " , localStorage.getItem("authToken"));
    this.dialogRef.close(`${form.value.username}`);
  }

  registerSubmit(form) {
    this.connexionService.register(form.value)
    .subscribe(response => localStorage.setItem('authToken', response.token));
    console.log("Token jwt " , localStorage.getItem("authToken"));
    this.dialogRef.close(`${form.value.username}`);
  }

  disconnect() {
    localStorage.clear();
  }
}
