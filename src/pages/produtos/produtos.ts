import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    //pegar o valor que foi passado como parametro que veio de categorias.ts na hora que chama ProdutosPage
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id).subscribe(
      response => {
        this.items = response['content'];//pega só o conteúdo do content        
      },
      error => {}
    );  
  }
}
