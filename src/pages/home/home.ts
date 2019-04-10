import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {
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

    this.auth.authenticate(this.creds).subscribe(
      response => {
        //testa se está retornando o header
        this.auth.successfulLogin(response.headers.get('Authorization'));
        //chama outra página e destói a primeira
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});    
  }
}
