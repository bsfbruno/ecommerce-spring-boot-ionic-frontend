import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

//anotação utilizada para trabalhar com string e não precisar importar as classes
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
