import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public categoriaService: CategoriaService) {
  }

  //esse evento chama as intruções dentro do método quando a página termina de ser carregada
  ionViewDidLoad() {
    //o subscribe deve ser usado junto de uma função assíncrona, como é o caso do http
    //esse método aguardar até que o retorno da chamada chegue
    this.categoriaService.findAll().subscribe(
      response => {
        this.items = response;
      }, 
      error => {
          console.log(error);
      }
    );

    console.log('ionViewDidLoad CategoriasPage');
  }

}
