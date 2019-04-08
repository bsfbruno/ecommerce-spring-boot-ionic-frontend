import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';

//anotação utilizada para trabalhar com string e não precisar importar as classes
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login(){
    //empilhar a página
    //this.navCtrl.push('CategoriasPage');

    console.log(this.creds);
    //chama outra página e destói a primeira
    this.navCtrl.setRoot('CategoriasPage');
  }
}
