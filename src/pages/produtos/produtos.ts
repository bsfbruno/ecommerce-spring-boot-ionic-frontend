import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public produtoService: ProdutoService,
    public loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
     this.loadData();
  }

  loadData() {
    //pegar o valor que foi passado como parametro que veio de categorias.ts na hora que chama ProdutosPage
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id).subscribe(
      response => {
        this.items = response['content'];//pega só o conteúdo do content
        loader.dismiss();//fechar o loader    
        this.loadImageUrls();
      },
      error => {
        loader.dismiss();
      }
    );
  }

  loadImageUrls(){
    for (var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(
        response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {}
      );
    }
  }

  showDetail(produto_id: string){
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

  presentLoading() {
    let loader = this.loadCtrl.create({
      content: "Please Wait...",
    });
    loader.present();
    return loader;
  }

  doRefresh(event) {
    //insere o método que o load vai chamar depois de executar
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }
}
